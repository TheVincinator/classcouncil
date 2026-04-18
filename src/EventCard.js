import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";


export default function EventCard({ event }) {
	const startDate = new Date(event.start);
	const endDate = new Date(event.end);

	const isSameDay =
		startDate.getFullYear() === endDate.getFullYear() &&
		startDate.getMonth() === endDate.getMonth() &&
		startDate.getDate() === endDate.getDate();

	const startString = startDate.toLocaleString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});

	const endOptions = isSameDay
		? {
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		}
		: {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		};

	const endString = endDate.toLocaleString("en-US", endOptions);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
    >
      {/* Image */}
<div className="md:w-2/5 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
  <img
    src={event.image || "/default.jpg"}
    alt={event.title}
    className="w-full h-auto"
    onError={(e) => {
      e.target.src = "/default.jpg";
    }}
  />
</div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {event.title}
          </h3>

          <div className="flex items-center text-gray-500 mb-2">
            <Calendar size={16} className="mr-2" />
            {startString} – {endString}
          </div>
		
		{event.location && (
            <div className="flex items-center text-gray-500 mb-4">
              <MapPin size={16} className="mr-2" />
              {event.location}
            </div>
          )}

          {event.description && (
            <p className="text-gray-600 mb-4 line-clamp-3">
              {event.description}
            </p>
          )}

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Button */}
        {event.url && (
          <div className="mt-6">
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 transition"
            >
              Register
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}