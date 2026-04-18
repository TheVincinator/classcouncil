import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import EventCard from "./EventCard";

const ImageDescription = ({ imageSrc, title, description, reverse }) => (
  <div className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} items-center my-12 gap-8`}>
    <div className="w-full md:w-1/2 group">
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        <img
          src={imageSrc}
          alt={title}
          loading="lazy"
          className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
      </div>
    </div>
    <div className="w-full md:w-1/2 px-4 mt-4 md:mt-0 text-center md:text-left">
      <h2 className="text-2xl font-bold text-red-600 mb-4">{title}</h2>
      <p className="text-lg text-gray-700">{description}</p>
    </div>
  </div>
);

const EventsSection = ({ title, items, isPast, loading, error }) => (
  <>
    <h2 className="text-3xl font-bold mt-20 mb-8">{title}</h2>
    {loading ? (
      <p className="text-gray-500">Loading events...</p>
    ) : error ? (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-6 py-4">
        Unable to load events right now. Check our{" "}
        <a
          href="https://www.instagram.com/cuclasscouncils"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-medium"
        >
          Instagram
        </a>{" "}
        for the latest updates.
      </div>
    ) : items.length > 0 ? (
      <div className="grid gap-8">
        {items.map((event) => (
          <EventCard key={event.url || event.title} event={event} isPast={isPast} />
        ))}
      </div>
    ) : (
      <p className="text-gray-500">No {title.toLowerCase()} at this time.</p>
    )}
  </>
);

export default function Events() {
  const [events, setEvents] = useState({ upcoming: [], past: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    document.title = "Events | Cornell Class Councils";
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/events/`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load events:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const featuredItems = [
    {
      title: "Fall Fest",
      imageSrc: "fallfest.jpeg",
      description:
        "Fall Fest at Cornell is an annual celebration featuring food, games, music, and community fun. Hosted on the Arts Quad, it's a great way to kick off the semester with friends and festivities.",
    },
    {
      title: "MOTAQ: Movie on the Arts Quad",
      imageSrc: "motaq.jpg",
      description:
        "A Cornell tradition! Enjoy free outdoor movies on the Arts Quad. Bring blankets, hoodies, and friends. Films start at sunset and are co-hosted by Class Councils, CU Tonight, and Cornell Cinema.",
    },
    {
      title: "Carnelian Gala: A Night in Paris",
      imageSrc: "carneliangala.JPG",
      description:
        "An elegant evening of Parisian-themed entertainment, food, and music. Held at Willard Straight Hall with photo booths, caricature artists, card games, and a sweatshirt giveaway. RSVP on CampusGroups!",
    },
    {
      title: "Willard Straight Hall 100th Anniversary",
      imageSrc: "WSH100.jpeg",
      description:
        "As we celebrate 100 years, we honor how Willard Straight Hall has become more than its physical space. It is a reflection of who we are and who we become — built on the timeless values of Community, Unity, and Connection.",
    },
  ];


  return (
    <div>
      <Navbar />

      {/* Page Header */}
      <div className="flex items-center justify-center py-12">
        <h1 className="text-4xl font-extrabold text-red-700 drop-shadow-lg">Events</h1>
      </div>

      {/* Intro paragraph */}
      <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-8 px-4">
        Discover some of the most exciting student-led events happening throughout the year at Cornell. From festive gatherings to elegant galas, there's something for everyone!
      </p>

      {/* Featured Events */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Featured Events</h2>
          {featuredItems.map((item, index) => (
            <ImageDescription
              key={item.title}
              imageSrc={item.imageSrc}
              title={item.title}
              description={item.description}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>

      {/* Dynamic Calendar Events */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <EventsSection title="Upcoming Events" items={events.upcoming} isPast={false} loading={loading} error={error} />
        <EventsSection title="Past Events" items={events.past} isPast={true} loading={loading} error={error} />
      </div>

      <Footer />
    </div>
  );
}
