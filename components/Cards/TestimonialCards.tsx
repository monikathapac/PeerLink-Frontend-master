import Image from "next/image";
import React from "react";
import { TestimonialCardProps } from "utils/TestimonialData";

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  rating,
  quote,
  authorName,
  authorRole,
  authorImage,
}) => {
  return (
    <div className="mx-auto max-w-xl md:w-full rounded-md shadow-lg">
      <div className="flex flex-col rounded-md bg-white">
        <div className="flex flex-1 flex-col justify-between p-4 md:p-8">
          <div className="mb-4 md:mb-8 flex space-x-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`h-6 w-6 ${
                    i < rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            ))}
          </div>
          <div className="flex-1 pt-2">
            <blockquote>
              <p className="text-base md:text-lg text-gray-800">{quote}</p>
            </blockquote>
          </div>

          <div className="mt-4 md:mt-8 border-t border-gray-300 pt-4 dark:border-gray-800">
            <div className="flex items-center">
              <Image
                className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0 rounded-full object-cover"
                src={authorImage}
                width={10}
                height={10}
                alt={authorName}
              />
              <div className="ml-3 min-w-0">
                <p className="truncate text-base md:text-lg font-semibold text-gray-800">
                  {authorName}
                </p>
                <p className="truncate text-xs md:text-base text-gray-500">
                  {authorRole}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
