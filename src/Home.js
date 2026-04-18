import { useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";

function Home() {
  useEffect(() => {
    document.title = "Cornell Class Councils";
  }, []);

  return (
    <div className="">
      <Navbar />

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="classphoto.png"
            alt="Cornell Class Council members gathered on campus"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        </div>
        <motion.div
          initial={{ x: "-100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 70, delay: 0.3 }}
          className="absolute inset-0 flex items-center justify-center px-4 text-center"
        >
          <div className="bg-black/50 px-8 py-6 rounded-2xl shadow-xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Cornell{" "}
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                Class Councils
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Fostering class unity, tradition, and leadership
            </p>
            <Link
              to="/About"
              className="mt-6 inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Who We Are Section */}
      <section className="text-center mt-24 px-4">
        <h2 className="text-4xl font-bold relative inline-block text-red-700">
          Who We Are
          <span className="block h-1 w-16 bg-red-600 mx-auto mt-2"></span>
        </h2>
        <div className="max-w-4xl mx-auto mt-8 text-gray-700 text-lg leading-relaxed">
          <p>
            The Cornell University Class Councils will serve as a community-building organization focused on fostering a sense of unity and pride among the four University's undergraduate classes and varied student communities. We aim to prioritize our relationship with other student organizations and use our resources to plan class events, collaborate with other student groups, and establish and execute traditions. The Class Councils shall also strengthen student ties to the University by providing services to Cornell students before and after graduation.
          </p>
        </div>
      </section>

      {/* CTA Buttons */}
      <div className="flex justify-center gap-6 mt-16 mb-20">
        <Link
          to="/Events"
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition shadow"
        >
          See Our Events
        </Link>
        <Link
          to="/Team"
          className="bg-gray-100 text-red-700 border border-red-600 px-6 py-3 rounded-lg hover:bg-gray-200 transition shadow"
        >
          Meet the Leadership Team
        </Link>
      </div>

      {/* Stay Connected Section */}
      <section className="bg-red-50 py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-red-700 mb-4">Stay Connected</h2>
        <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
          Follow us on Instagram for the latest event announcements, recruitment updates, and campus highlights.
        </p>
        <a
          href="https://www.instagram.com/cuclasscouncils"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition shadow text-lg font-medium"
        >
          <FaInstagram size={22} />
          @cuclasscouncils
        </a>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
