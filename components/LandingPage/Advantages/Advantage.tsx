import { AdvantagesData } from "utils/AdvantagesData";
import AdvantageCard from "../../Cards/AdvantageCard";

const Advantage = () => {
  return (
    <div className="px-4 lg:px-12">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800 text-center mt-12">
        Enjoy Exclusive Advantages
      </h1>
      <div className="flex rows-{2} lg:flex-row justify-around mt-8">
        {AdvantagesData.map((data, index) => (
          <AdvantageCard
            key={index}
            title={data.title}
            description={data.description}
            icon={data.icon}
            iconSize={data.iconSize}
            iconColor={data.iconColor}
          />
        ))}
      </div>
    </div>
  );
};

export default Advantage;
