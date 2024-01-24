import Image from "next/image";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { Tab } from "utils/HowItWorks";

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="flex flex-col md:flex-row lg:flex-row">
      {/* Left side with tabs */}
      <div className="lg:w-1/2 md:w-1/2 w-full">
        <ul className="flex flex-col p-4">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`cursor-pointer py-2 rounded-lg px-4 mb-2 ${
                activeTab === tab.id
                  ? "bg-white-200 transform translate-y-4 text-black shadow-lg"
                  : "bg-white mt-4"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="flex flex-col justify-center">
                <div className="mr-2"></div>
                <div className="text-xl font-bold flex gap-3">
                  <p>{React.createElement(tab.icon, { size: 32 })}</p>{" "}
                  <p> {tab.title}</p>
                </div>
                <p className="font-normal text-base mt-2">{tab.subtitle}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side with content */}
      <div className="w-1/2 p-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${
              activeTab === tab.id ? "block" : "hidden"
            } border rounded-md p-4 bg-white`}
          >
            {tab.content}
            <Image
              src={"/../../../assets/asset1.jpeg"}
              height={300}
              width={300}
              alt="hello"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
