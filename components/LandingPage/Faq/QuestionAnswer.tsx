import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface QuestionAnswerProps {
  question: string;
  answer: string;
}

export const QuestionAnswer: React.FC<QuestionAnswerProps> = ({
  question,
  answer,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-300 pb-4">
      <h3
        className={`cursor-pointer text-xl font-semibold mb-2 flex justify-between ${
          isOpen ? "text-blue-600" : "text-gray-800"
        }`}
        onClick={toggleAnswer}
      >
        {question} {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </h3>
      <div
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};
