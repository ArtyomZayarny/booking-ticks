import axios from "axios";
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";

export const getNowPlayingMovies = async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
      }
    );
    const movies = data.results;
    res.json({ success: true, movies });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//Add show endpoint
export const addShow = async (req, res) => {
  try {
    const { movieId, showsInput, showPrice } = req.body;

    // Validate required fields
    if (!movieId || !showsInput || !showPrice) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: movieId, showsInput, showPrice",
      });
    }

    let movie = await Movie.findById(movieId);

    // If movie doesn't exist, fetch and create it
    if (!movie) {
      try {
        const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
            headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
          }),
        ]);

        const movieApiData = movieDetailsResponse.data;
        const movieCreditsData = movieCreditsResponse.data;

        const movieDetails = {
          _id: movieId,
          title: movieApiData.title,
          overview: movieApiData.overview,
          poster_path: movieApiData.poster_path,
          backdrop_path: movieApiData.backdrop_path,
          genres: movieApiData.genres,
          casts: movieCreditsData.cast,
          release_date: movieApiData.release_date,
          original_language: movieApiData.original_language,
          tagline: movieApiData.tagline || "",
          vote_average: movieApiData.vote_average,
          runtime: movieApiData.runtime,
        };

        // Add movie to DB
        movie = await Movie.create(movieDetails);
      } catch (movieError) {
        console.error("Error creating movie:", movieError);
        return res.status(500).json({
          success: false,
          message: "Failed to fetch movie details from TMDB",
        });
      }
    }

    // Create shows for the movie (whether it's new or existing)
    const showsToCreate = [];

    // Handle the showsInput structure from frontend
    showsInput.forEach((show) => {
      const showDate = show.date;
      const showTime = show.time; // This should be a single time string

      if (showDate && showTime) {
        const dateTimeString = `${showDate}T${showTime}`;
        showsToCreate.push({
          movie: movieId,
          showDateTime: new Date(dateTimeString),
          showPrice: Number(showPrice),
          occupiedSeats: {},
        });
      }
    });

    if (showsToCreate.length > 0) {
      await Show.insertMany(showsToCreate);
      res.json({ success: true, message: "Shows added successfully" });
    } else {
      res.status(400).json({
        success: false,
        message: "No valid shows to create",
      });
    }
  } catch (error) {
    console.error("Add show error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

//Get all shows endpoint
export const getShows = async (req, res) => {
  try {
    const shows = await Show.find({ showDateTime: { $gte: new Date() } })
      .populate("movie")
      .sort({ showDateTime: 1 });
    const uniqueShows = new Set(shows.map((show) => show.movie));

    res.json({ success: true, shows: Array.from(uniqueShows) });
  } catch (error) {
    console.error("Error fetching shows:", error.message);
    res.json({ success: false, message: error.message });
  }
};

//Get signle show endpoint
export const getShow = async (req, res) => {
  try {
    const { movieId } = req.params;
    const shows = await Show.find({
      movie: movieId,
      showDateTime: { $gte: new Date() },
    });
    const movie = await Movie.findById(movieId);

    const dateTime = {};
    shows.forEach((show) => {
      const date = show.showDateTime.toISOString().split("T")[0];
      if (!dateTime[date]) {
        dateTime[date] = [];
      }
      dateTime[date].push({ time: show.shoDateTime, showId: show._id });
    });
    res.json({ success: true, show: { movie, dateTime } });
  } catch (error) {
    console.error("Error fetching show:", error.message);
    res.json({ success: false, message: error.message });
  }
};
