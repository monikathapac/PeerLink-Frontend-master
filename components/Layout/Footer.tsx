import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-white border-t-2 text-black py-10">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-around">
        <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
          <Image
            src={require("../../assets/peerlink.svg")}
            alt="PeerLink Logo"
            width={230}
            height={80}
            style={{ marginRight: 5 }}
          />
        </div>
        <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
          <h5 className="text-xl font-semibold mb-4">Company</h5>
          <Link href="#" className="block mb-2 text-sm hover:text-gray-400">
            About Us
          </Link>
          <Link href="https://wa.link/4jgrrm" className="block mb-2 text-sm hover:text-gray-400">
            Contact Us
          </Link>
          {/* Add more links as needed */}
        </div>
        <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
          <h5 className="text-xl font-semibold mb-4">Product</h5>
          {/* Add product links here */}
          <Link href="" className="block mb-2 text-sm hover:text-gray-400">
            Features
          </Link>
          <Link href="https://wa.link/4jgrrm" className="block mb-2 text-sm hover:text-gray-400">
            Help Desk
          </Link>
          <Link href="https://wa.link/4jgrrm" className="block text-sm hover:text-gray-400">
            Support
          </Link>
        </div>
        <div className="w-full lg:w-1/4">
          <h5 className="text-xl font-semibold mb-4">
            Follow Us On Social Media!
          </h5>
          {/* Add newsletter content here */}
          <div className="flex space-x-4 mt-4">
<a rel="noopener" href="https://www.facebook.com/peerlink.network"  target="_blank"><FaFacebook className="text-2xl cursor-pointer hover:text-blue-500" /></a>           
<a rel="noopener" href="https://www.twitter.com" target="_blank"><FaTwitter className="text-2xl cursor-pointer hover:text-blue-400" /></a>
<a rel="noopener" href="https://www.instagram.com/peerlink.network" target="_blank"><FaInstagram className="text-2xl cursor-pointer hover:text-pink-500" /></a>
<a rel="noopener" href="https://www.linkedin.com/company/peer-link/about" target="_blank"><FaLinkedin className="text-2xl cursor-pointer hover:text-blue-600" /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
