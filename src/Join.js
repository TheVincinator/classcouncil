import { useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Set to true to show the application form button when recruitment opens
const APPLICATIONS_OPEN = false;
const APPLICATION_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf5hcyG_QNWzP3NrrOJaRrNtYZUtepvaMjanL5qtkITaO2fXg/viewform";

const timelineItems = [
  { date: "Tues, January 20th", text: "Application Opens\n8am" },
  { date: "Mon, January 26th", text: "Info Session #1\n6pm @ WSH Art Gallery" },
  { date: "Sat, January 31st", text: "Application Deadline\n6pm" },
  { date: "Mon, February 2nd", text: "Interviews\n4pm-7pm" },
];

function Join() {
  useEffect(() => {
    document.title = "Apply | Cornell Class Councils";
  }, []);

  return (
    <div>
      <Navbar />
      <div className="w-screen">

        {/* Hero with wave at bottom */}
        <div
          className="relative h-[90vh] overflow-hidden flex justify-center items-center bg-cover bg-no-repeat"
          style={{ backgroundImage: "url('/gradient.png')" }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Content */}
          <div className="absolute bottom-[22vh] left-[5vw] md:left-[10vh] text-white z-10 px-4 md:px-0">
            <h1 className="text-5xl font-bold m-0">Join Us</h1>
            <h4 className="text-2xl mt-2">
              {APPLICATIONS_OPEN ? "Applications are now open!" : "SP26 Applications are now closed!"}
            </h4>
            <p className="text-[1.1rem] pt-[10px] max-w-lg">
              {APPLICATIONS_OPEN
                ? "Apply now to be part of Cornell Class Councils!"
                : "If you are interested in joining Class Councils in the future, please look out for updates on our Instagram page about recruitment information!"}
            </p>
          </div>

          {/* Wave SVG */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
            <svg
              viewBox="0 0 1440 120"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              className="w-full h-[80px] md:h-[120px]"
            >
              <path
                d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        {/* White content section */}
        <div className="bg-white flex justify-center items-center text-black pt-[60px] pb-[80px] overflow-hidden">
          <div className="flex flex-col justify-center items-center text-center w-full px-4">

            {/* Timeline card */}
            <div className="w-full sm:w-10/12 shadow-lg my-[25px] mb-[60px] rounded-[15px]">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-red-600 mb-8">Spring 2026 Recruitment Timeline</h2>

                {/* Mobile timeline (vertical) */}
                <ol className="lg:hidden flex flex-col gap-0 relative pl-8 border-l-2 border-gray-200 text-left">
                  {timelineItems.map((item, index) => (
                    <li key={index} className="relative mb-8 last:mb-0">
                      <span className="absolute -left-[25px] top-1 w-3 h-3 bg-red-600 rounded-full" />
                      <time className="block font-bold text-base text-red-700 mb-1">{item.date}</time>
                      {item.text.split("\n").map((line, i) => (
                        <span key={i} className="block text-gray-700">{line}</span>
                      ))}
                    </li>
                  ))}
                </ol>

                {/* Desktop timeline (horizontal) */}
                <section className="hidden lg:block timeline lg:text-center lg:relative lg:pt-5 lg:px-2.5">
                  <ol className="lg:flex lg:justify-center lg:max-w-screen lg:mx-auto lg:py-[125px] lg:px-10 relative">
                    {/* Timeline line */}
                    <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-[3px] bg-black transform -translate-y-1/2" />

                    {timelineItems.map((item, index) => (
                      <li key={index} className="lg:inline-block relative list-none w-[240px] h-[3px]">
                        <span className="absolute top-1/2 left-1/2 w-3 h-3 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                        <div
                          className={`absolute left-1/2 -translate-x-1/2 w-[280px] py-3 text-black text-base text-center whitespace-normal
                            ${index % 2 === 0 ? "lg:-translate-y-full lg:top-[-16px]" : "lg:top-full lg:mt-4"}`}
                        >
                          <time className="block font-bold text-lg mb-2">{item.date}</time>
                          {item.text.split("\n").map((line, i) => (
                            <span key={i} className="block">{line}</span>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              </div>
            </div>

            {/* Application button */}
            {APPLICATIONS_OPEN ? (
              <a
                href={APPLICATION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto mb-10 bg-red-600 text-white px-8 py-4 rounded-full font-medium text-2xl shadow-[0_10px_25px_rgba(0,0,0,0.18)] hover:bg-red-700 transition"
              >
                Application Form →
              </a>
            ) : (
              <div className="flex flex-col items-center gap-3 mb-10">
                <button
                  disabled
                  className="mx-auto bg-gray-300 text-gray-500 px-8 py-4 rounded-full font-medium text-2xl shadow-inner cursor-not-allowed"
                >
                  Application Form →
                </button>
                <p className="text-gray-400 text-sm">Applications are currently closed. Check back soon!</p>
              </div>
            )}

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Join;
