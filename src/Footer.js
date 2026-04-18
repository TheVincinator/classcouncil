// components/Footer.jsx
import { FaInstagram, FaTiktok, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-red-200 bg-opacity-90 backdrop-blur-lg shadow-md z-50 py-8">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="flex space-x-6 text-2xl text-gray-700">
          <a href="https://www.instagram.com/cuclasscouncils" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.tiktok.com/@cuclasscouncils" target="_blank" rel="noopener noreferrer">
            <FaTiktok />
          </a>
          <a href="https://www.linkedin.com/company/cuclasscouncils" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
