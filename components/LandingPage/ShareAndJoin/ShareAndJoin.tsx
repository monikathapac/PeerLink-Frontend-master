import React from "react";
import { FaUsers, FaDollarSign, FaCog } from "react-icons/fa";
import ShareAndJoinCard from "./ShareAndJoinCard";

const ShareAndJoin = () => {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-4">
        Transforming Subscriptions
      </h1>
      <h2 className="text-2xl text-center text-gray-600 mb-8">
        With PeerLink Collaborative Solution
      </h2>
      <div className="flex flex-col lg:flex-row lg:gap-12">
        <div className="flex flex-col lg:flex-row lg:gap-10">
          <ShareAndJoinCard
            heading="Share"
            content="Offer available slots of your subscription to save money."
            buttonText="Share"
            bgColor="#7071E8"
          />
          <ShareAndJoinCard
            heading="Subscribe"
            content="Join a cost-sharing group and subscribe at a fraction of the price."
            buttonText="Join"
            bgColor="#3468C0"
          />
        </div>
        <div className="lg:self-center lg:ml-[150px] w-full lg:w-[350px] mt-6 lg:mt-0 px-8">
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-4">
            <li className="flex items-start">
              <FaUsers size={50} className="mr-4 mt-1 text-blue-500" />
              <span>
                Discover users with the same subscriptions (friends/public).
              </span>
            </li>
            <li className="flex items-start">
              <FaDollarSign size={30} className="mr-4 mt-1 text-green-500" />
              <span>Club with them and save subscription money.</span>
            </li>
            <li className="flex items-start">
              <FaCog size={30} className="mr-4 mt-1 text-purple-500" />
              <span>Auto-manage recurring expenses on Peer Link.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShareAndJoin;
