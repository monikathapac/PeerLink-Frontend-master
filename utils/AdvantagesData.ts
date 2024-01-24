import { IconType } from "react-icons";
import {  FaUserLock } from "react-icons/fa";
import { TbCurrencyDollarOff } from "react-icons/tb";
import { MdWorkspacePremium } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";



interface AdvantageData {
  icon: IconType;
  iconSize: number;
  iconColor: string;
  title: string;
  description: string;
  
}

export const AdvantagesData: AdvantageData[] = [
  {
    icon: FaUserLock,
    iconSize: 70,
    iconColor: "blue",
    title: "Data Security",
    description:
      "we ask for minimum details and it doesn't include your login-password.",
  },
  {
    icon: IoEyeSharp,
    iconSize: 70,
    iconColor: "blue",
    title: "Control",
    description:
      "Control on asset visibility and sharability.",
  },
  {
    icon: TbCurrencyDollarOff,
    iconSize: 70,
    iconColor: "blue",
    title: "Zero Commission",
    description:
      "We don't charge you for clubbing.",
  },
  {
    icon: MdWorkspacePremium,
    iconSize: 70,
    iconColor: "blue",
    title: "Premium service",
    description:
      "Instant clubbing facility with our premium service",
  },
];
