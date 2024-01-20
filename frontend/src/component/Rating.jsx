import React from "react";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { BiSolidStarHalf } from "react-icons/bi";

const Rating = ({ value, text }) => {
  return (
    <div className="rating">
      <span>
        {value >= 1 ? (
          <AiFillStar />
        ) : value >= 0.5 ? (
          <BiSolidStarHalf />
        ) : (
          <AiOutlineStar />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <AiFillStar />
        ) : value >= 1.5 ? (
          <BiSolidStarHalf />
        ) : (
          <AiOutlineStar />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <AiFillStar />
        ) : value >= 2.5 ? (
          <BiSolidStarHalf />
        ) : (
          <AiOutlineStar />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <AiFillStar />
        ) : value >= 3.5 ? (
          <BiSolidStarHalf />
        ) : (
          <AiOutlineStar />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <AiFillStar />
        ) : value >= 4.5 ? (
          <BiSolidStarHalf />
        ) : (
          <AiOutlineStar />
        )}
      </span>

      <span>{text}</span>
    </div>
  );
};

export default Rating;
