import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function About() {
  useEffect(() => {
    document.title = "About Us | Cornell Class Councils";
  }, []);

  return (
    <>
      <Navbar />

      {/* Page Title */}
      <div className="flex items-center justify-center py-12">
        <h1 className="text-5xl font-extrabold text-red-700 drop-shadow-lg">
          About Us
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">

        {/* Mission Section */}
        <section className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-red-800 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Class Councils is a student government organization that fosters a sense of unity and pride within each of Cornell University's undergraduate classes. We work to uphold the values of pride and community and implement them in our events, both at the class level and events targeted to all class years. We strive to work with other organizations at Cornell through collaborations, promotions, and highlighting organizations to bring more awareness to Cornell and Cornellians.
          </p>
        </section>

        {/* What We Do Section */}
        <section className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-red-800 mb-6">What We Do</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-xl text-red-700 mb-2">Campus Events</h3>
              <p className="text-gray-700">
                We host engaging events like formals, movie nights, and social gatherings to bring students together.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-xl text-red-700 mb-2">Community Impact</h3>
              <p className="text-gray-700">
                We support student-led causes, promote inclusion, and fund service projects that matter.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-xl text-red-700 mb-2">Class Advocacy</h3>
              <p className="text-gray-700">
                We serve as liaisons between students and administrators, making sure your voice is heard.
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <h3 className="font-semibold text-xl text-red-700 mb-2">Spirit & Tradition</h3>
              <p className="text-gray-700">
                From orientation to graduation, we help build a sense of belonging and pride in every class.
              </p>
            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-red-800 mb-4">Meet the Team</h2>
          <p className="text-gray-700 text-lg mb-6 max-w-2xl mx-auto">
            Our team includes dedicated students from all four class years, representing diverse backgrounds and majors. Together, we lead with passion and purpose.
          </p>
          <Link
            to="/Team"
            className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
          >
            See Our Team
          </Link>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default About;
