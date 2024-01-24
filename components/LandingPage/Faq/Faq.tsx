import React, { useState } from "react";
import { faqData } from "utils/FaqData";
import { QuestionAnswer } from "./QuestionAnswer";

const FaqSection = () => {
  return (
    <div className="pt-12 " id="faq">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">
          Frequently Asked Questions
        </h2>

        <div className="text-left space-y-4 px-4 ">
          {faqData.map((faq, index) => (
            <QuestionAnswer key={index} {...faq} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
