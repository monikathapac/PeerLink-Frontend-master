import React, { useState } from "react";
import { HowItWorksShare, HowItWorksSubscribe } from "utils/HowItWorks";
import Tabs from "./Tabs";

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState("Share");

  const handleButtonClick = (tabType: string) => {
    setActiveTab(tabType);
  };

  return (
    <div>
      <p className="text-base text-center">4 simple steps</p>
      <h1 className="text-3xl text-center font-semibold mb-8 text-gray-800">
        How does it work?
      </h1>
      <div className="flex mb-4 justify-center">
        <button
          className={`mr-2 px-6 py-3 rounded-tl-xl rounded-bl-xl text-lg focus:outline-none ${
            activeTab === "Share"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-600"
          } transition-all duration-300`}
          onClick={() => handleButtonClick("Share")}
        >
          Share
        </button>
        <button
          className={`px-6 py-3 rounded-tr-xl rounded-br-xl text-lg focus:outline-none ${
            activeTab === "Subscribe"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-600"
          } transition-all duration-300`}
          onClick={() => handleButtonClick("Subscribe")}
        >
          Subscribe
        </button>
      </div>
      {activeTab === "Share" && <Tabs tabs={HowItWorksShare} />}
      {activeTab === "Subscribe" && <Tabs tabs={HowItWorksSubscribe} />}
    </div>
  );
};

export default HowItWorks;
