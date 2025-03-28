import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../../backend/src/shared/types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

type Props = {
  hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [showingAllFacilities, setShowingAllFacilities] = useState(false);

  const nextPicture = () => {
    if (currentImage + 1 === hotel.imageUrls.length) {
      setCurrentImage(0);
    } else {
      setCurrentImage(currentImage + 1);
    }
  };

  const previousPicture = () => {
    if (currentImage === 0) {
      setCurrentImage(hotel.imageUrls.length - 1);
    } else {
      setCurrentImage(currentImage - 1);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-6 gap-6 f">
      <div className="w-full h-[300px] relative">
        {hotel.imageUrls.length > 1 && (
          <>
            <button
              onClick={previousPicture}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70"
            >
              <BsChevronLeft size={20} />
            </button>
            <button
              onClick={nextPicture}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10 hover:bg-black/70"
            >
              <BsChevronRight size={20} />
            </button>
          </>
        )}
        <img
          src={hotel.imageUrls[currentImage]}
          className="w-full h-full object-cover object-center rounded-lg"
          alt={`Hotel ${hotel.name} - Image ${currentImage + 1}`}
        />
      </div>
      <div className="grid grid-rows-[2fr_4fr_3fr]">
        <div>
          <Link to={`/detail/${hotel._id}`}>
            <h2 className="text-bold text-2xl">{hotel.name}</h2>
          </Link>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                <AiFillStar key={index} className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
        </div>
        <div>
          <div className="line-clamp-6">{hotel.description}</div>
        </div>
        <div className="grid grid-cols-[4fr_1fr] items-end whitespace-nowrap">
          <div className="flex gap-1 items-center flex-wrap">
            {!showingAllFacilities
              ? hotel.facilities.slice(0, 3).map((facility, index) => (
                  <span
                    key={index}
                    className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap"
                  >
                    {facility}
                  </span>
                ))
              : hotel.facilities.map((facility, index) => (
                  <span
                    key={index}
                    className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap"
                  >
                    {facility}
                  </span>
                ))}
            {hotel.facilities.length > 3 && !showingAllFacilities && (
              <button
                className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap cursor-pointer"
                onClick={() => setShowingAllFacilities(true)}
              >
                {`+${hotel.facilities.length - 3} more`}
              </button>
            )}
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">
              £{hotel.pricePerNight} per night
            </span>
            <Link
              to={`/detail/${hotel._id}`}
              className="bg-blue-600 text-white h-full p-2 font-bold text-xl max-w-fit hover:bg-blue-500 rounded-lg"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
