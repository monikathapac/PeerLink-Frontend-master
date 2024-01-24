import Image from "next/image";
import React from "react";

interface AssetCardProps {
  title: string;
  originalPrice: string;
  discountedPrice: string;
  subscriptionInfo: string;
  logoUrl?: string;
  backgroundColor?: string; // Add a backgroundColor property
}

const getRandomColor = () => {
  const colors = [
    "linear-gradient(135deg, #C31432 0%, #240B36 100%)",
    "linear-gradient(135deg, #0072FF 0%, #00C6FF 100%)",
    "linear-gradient(135deg, #FAB2A6 0%, #FF5E62 100%)",
    "linear-gradient(135deg, #0083B0 0%, #00B4DB 100%)",
    "linear-gradient(135deg, #16BFFD 0%, #CB3066 100%)",
    "linear-gradient(135deg, #FFD662 0%, #3D7EAA 100%)",
    "linear-gradient(195deg, #FFD662 0%, #3D7EAA 100%)",
    "linear-gradient(295deg, #FFB632 0%, #3D7E32 100%)",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const AssetCard: React.FC<AssetCardProps> = ({
  title,
  originalPrice,
  discountedPrice,
  subscriptionInfo,
  logoUrl,
  backgroundColor = getRandomColor(), // Default background color is randomly selected
}) => {
  return (
    <div
      style={{ background: `${backgroundColor}` }}
      className={`max-w-sm md:w-[200px]  bg-white md:h-[200px] w-[170px] h-[170px] mx-auto  shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105`}
    >
      <div className={`p-4 flex items-center justify-between`}>
        {logoUrl && (
          <Image
            src={logoUrl}
            alt={`${title} Logo`}
            height={20}
            width={20}
            className="h-8 w-8 object-cover rounded-full"
          />
        )}
        <div className="text-right">
          <p className="text-gray-300 line-through text-sm">
            &#x20B9;{originalPrice}
          </p>
          <p className="text-white text-lg">&#x20B9;{discountedPrice}</p>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600">{subscriptionInfo}</p>
      </div>
    </div>
  );
};

export default AssetCard;
