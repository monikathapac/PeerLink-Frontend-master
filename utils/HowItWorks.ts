export interface Tab {
  id: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
  icon: IconType;
}
import { IconType } from "react-icons";
import { IoAddCircle } from "react-icons/io5";
import { FaShareAlt } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
export const HowItWorksShare: Tab[] = [
  {
    id: "tab1",
    title: "Add assets you want to share in your Asset List",
    subtitle: "Populate your Asset List with the assets you wish/intend to share.",
    content: "Share it online or with your friends",
    icon: IoAddCircle,
  },
  {
    id: "tab2",
    title: " Recieve notifications about people interested in your listing.",
    subtitle:
      "Stay informed with notifications about individuals interested in your listing.",
    content: "interface Tab ",
    icon: FaShareAlt,
  },
  {
    id: "tab3",
    title: "Choose user for collaboration as your own terms ",
    subtitle:
      "Select a collaborator on your own terms and conditions.",
    content: "Receive your money",
    icon: FaWallet,
  },
  {
    id: "tab4",
    title: "Smile and save money",
    subtitle:
      "Enjoy the satisfaction of a smile while saving money.",
    content: "interface Tab ",
    icon: FaRupeeSign,
  },
];
export const HowItWorksSubscribe: Tab[] = [
  {
    id: "tab1",
    title: "Search for asset you want access to, discover friends/friends of friend or strangers with the access",
    subtitle:
      "Explore assets you seek access to by discovering friends, friends of friends, or even strangers with the desired access.",
    content: "Share it online or with your friends",
    icon: IoAddCircle,
  },
  {
    id: "tab2",
    title: " Populate your wishlist with the assets you wish to subscribe to",
    subtitle:
      "Fill your wishlist with the assets you want to subscribe to.",
    content: "interface Tab ",
    icon: FaShareAlt,
  },
  {
    id: "tab3",
    title: "We run our algos and notify peers having same assets",
    subtitle:
      "Our algorithms analyze and notify peers who share similar assets.",
    content: "Receive your money",
    icon: FaWallet,
  },
  {
    id: "tab4",
    title: "Wait for them to accept the collaboration request or get guaranteed subscription in an hour with our premium service",
    subtitle:
      "Sit back as they either accept your collaboration request or enjoy a guaranteed subscription within an hour with our premium service.",
    content: "interface Tab ",
    icon: FaRupeeSign,
  },
];
