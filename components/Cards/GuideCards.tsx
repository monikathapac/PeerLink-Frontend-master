import Image from "next/image";

interface GuideCardProps {
  image: string;
  content: string;
}

const GuideCards: React.FC<GuideCardProps> = ({ image, content }) => {
  return (
    <div className="bg-white flex flex-col justify-center items-center w-[250px]  p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <Image
          src={image}
          alt="Guide"
          height={100}
          width={100}
          className="rounded-full"
        />
      </div>
      <div className="text-center text-base">{content}</div>
    </div>
  );
};

export default GuideCards;
