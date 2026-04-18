import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Team() {
  useEffect(() => {
    document.title = "Leadership Team | Cornell Class Councils";
  }, []);

  // Add a `photo` field (relative to /public) to show a headshot.
  // Leave it empty ("") to show the default placeholder.
  const team = [
    { name: "Vincent Nguyen", role: "", photo: "" },
    { name: "Catherine Mao", role: "", photo: "" },
    { name: "Zara Khan", role: "2026 VP of External Affairs", photo: "" },
    { name: "Nila Ganesh", role: "", photo: "" },
    { name: "Ridwanah Haque", role: "", photo: "" },
    { name: "Mackenzie Wedeen", role: "", photo: "" },
    { name: "Heidi Tam", role: "Class of 2028 Internal Affairs Chair", photo: "" },
    { name: "Evelyn Calle", role: "Class of 2028 External Affairs Chair", photo: "" },
    { name: "Sophia Chuang", role: "Class of 2028 Finance Chair", photo: "" },
    { name: "Nafisa Haque", role: "VP of Finance", photo: "" },
    { name: "Jackie Wang", role: "2027 External Affairs Chair", photo: "" },
    { name: "Owen Walter", role: "2027 Finance Chair", photo: "" },
    { name: "Regan Chen", role: "2026 Finance Chair", photo: "" },
    { name: "Reem Nasrallah", role: "Class 2028 President", photo: "" },
    { name: "Jobe Zulu", role: "Advisor", photo: "" },
    { name: "Marissa Duterte", role: "2026 Executive Vice President", photo: "" },
    { name: "Benjamin Babayev", role: "2026 VP of Public Affairs", photo: "" },
    { name: "Viviene Lin", role: "Class of 2027 VP of Internal Affairs", photo: "" },
    { name: "Taylor-Jade Hall", role: "2026 VP of External Affairs", photo: "" },
    { name: "Ying Lin Zhao", role: "2026 President", photo: "" },
    { name: "Senior Days Committee", role: "", photo: "" },
  ];

  return (
    <div>
      <Navbar />
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-center py-12">
          <h1 className="text-4xl font-extrabold text-red-700 drop-shadow-lg">
            Leadership Team
          </h1>
        </div>

        <div className="min-h-screen bg-gray-50 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 text-center">
              {team.map((member) => (
                <div key={member.name} className="flex flex-col items-center">

                  {/* Profile photo or placeholder */}
                  <div className="w-40 h-40 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        className="w-20 h-20 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
                      </svg>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="mt-6 text-lg font-medium text-gray-800">
                    {member.name}
                  </h3>

                  {/* Role */}
                  {member.role && (
                    <p className="mt-2 text-gray-500">{member.role}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Team;
