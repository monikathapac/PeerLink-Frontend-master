import React from "react";
import { IconType } from "react-icons";

interface AdvantageCardProps {
  title: string;
  description: string;
  icon: IconType;
  iconSize: number;
  iconColor: string;
}

const AdvantageCard: React.FC<AdvantageCardProps> = ({
  title,
  description,
  icon,
  iconSize,
  iconColor,
}) => {
  return (
    <div className="lg flex flex-col gap-3">
      <p>
        {React.createElement(icon, {
          size: `${iconSize}`,
          color: `${iconColor}`,
        })}
      </p>{" "}
      <h3 className="text-2xl font-bold ">{title} </h3>
      <div className="">
        {" "}
        <p className="text-sm w-[200px] ">{description}</p>
        
      </div>
    </div>
  );
};

export default AdvantageCard;
