import React, { useState } from "react";
import BlurCircle from "./BlurCircle";
import { ChevronLeft, ChevronRightIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime, id }) => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const onBookHandler = () => {
    if (!selected) {
      return toast.error("Please Select A Date");
    }
    navigate(`/movies/${id}/${selected}`);
    scrollTo(0, 0);
  };

  return (
    <div id="dateSelect" className="pt-20 md:pt-30">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 relative p-4 md:p-8 bg-primary/10 border border-primary/20 rounded-lg">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="0px" />
        <div className="w-full md:w-auto">
          <p className="text-lg font-semibold text-center md:text-left">
            Choose Date
          </p>
          <div className="flex items-center gap-4 md:gap-6 text-sm mt-4 md:mt-5 overflow-x-auto no-scrollbar pb-2">
            <ChevronLeft width={24} className="hidden md:block" />
            <div className="flex md:flex-wrap md:max-w-lg gap-3 md:gap-4 mx-auto md:mx-0">
              {Object.keys(dateTime).map((date) => (
                <button
                  onClick={() => setSelected(date)}
                  key={date}
                  className={`flex-shrink-0 flex flex-col items-center justify-center h-12 w-12 md:h-14 md:w-14 rounded cursor-pointer ${
                    selected === date
                      ? "bg-primary text-white"
                      : "border border-primary/70"
                  }`}
                >
                  <span className="text-xs md:text-sm">
                    {new Date(date).getDate()}
                  </span>
                  <span className="text-xs md:text-sm">
                    {new Date(date).toLocaleString("en-US", { month: "short" })}
                  </span>
                </button>
              ))}
            </div>
            <ChevronRightIcon width={24} className="hidden md:block" />
          </div>
        </div>
        <button
          onClick={onBookHandler}
          className="w-full md:w-auto bg-primary text-white px-8 py-2.5 rounded hover:bg-primary/90 transition-all cursor-pointer text-sm md:text-base"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
