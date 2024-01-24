import React from "react";

interface ShareAndJoinCardProps {
  heading: string;
  content: string;
  buttonText: string;
  bgColor: string; // New prop for background color
}

const ShareAndJoinCard: React.FC<ShareAndJoinCardProps> = ({
  heading,
  content,
  buttonText,
  bgColor,
}) => {
  return (
    <div
      className={`max-w-md lg:w-[300px] md:w-[300px] w-full h-auto lg:h-[390px] md:h-[390px] flex  flex-col justify-between mx-auto border rounded-lg overflow-hidden shadow-lg p-6 my-4`}
      style={{ backgroundColor: bgColor }}
    >
      <h2 className="text-xl text-white font-semibold mb-4">{heading}</h2>
      <p className="text-white text-lg mb-4">{content}</p>
      <button className="bg-brand  text-white text-lg font-bold px-4 py-2 rounded-full">
        {buttonText}
      </button>
    </div>
  );
};

export default ShareAndJoinCard;
