import { Inngest } from "inngest";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import sendEmail from "../configs/nodeMailer.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickticks" });

//Inngest Function to save user data to database
const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-creation",
  },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };
    await User.create(userData);
  }
);
//Inngest Function to delete user from database
const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-with-clerk",
  },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
  }
);

//Inngest Function to update user  in database
//Inngest Function to delete user from database
const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
  },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };
    await User.findByIdAndUpdate(id, userData);
  }
);

// Send booking confirmations email
const sendBookingConfirmationEmail = inngest.createFunction(
  { id: "send-booking-confirmation-email" },
  {
    event: "app/show.booked",
  },
  async ({ event, step }) => {
    const { bookingId } = event.data;
    const booking = await Booking.findById(bookingId)
      .populate({
        path: "show",
        populate: { path: "movie", model: "Movie" },
      })
      .populate("user");
    console.log("booking", booking);
    await sendEmail({
      to: booking.user.email,
      subject: `Payment confirmation: ${booking.show.movie.title} booked!`,
      body: `
      <h1>Hi ${booking.user.name}, </h1>
      <h2>Payment confirmation: ${booking.show.movie.title} booked!</h2>
      <p>Thank you for booking ${booking.show.movie.title} at ${booking.show.showTime}.</p>
      <p>Your booking reference is ${booking._id}.</p>
      <p>Enjoy the show!🍿</p>
      `,
    });
  }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
  sendBookingConfirmationEmail,
];
