"use client";

import { useState } from "react";
import { Calendar, MapPin, Video, Clock, ExternalLink } from "lucide-react";

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: "in-person" | "online";
  category: string;
  registered: boolean;
};

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Annual Legal Tech Conference 2024",
    description: "Join leading legal professionals and tech innovators for discussions on the future of legal technology, AI in law, and digital transformation.",
    date: "2024-03-15",
    time: "9:00 AM - 5:00 PM",
    location: "San Francisco Convention Center",
    type: "in-person",
    category: "Conference",
    registered: false,
  },
  {
    id: "2",
    title: "Webinar: Recent Changes in Employment Law",
    description: "An in-depth look at the latest employment law regulations and their impact on businesses and legal practices.",
    date: "2024-02-20",
    time: "2:00 PM - 3:30 PM",
    location: "Online",
    type: "online",
    category: "Webinar",
    registered: true,
  },
  {
    id: "3",
    title: "IP Law Seminar: Patent Strategies",
    description: "Learn about effective patent strategies, recent case law, and best practices for intellectual property protection.",
    date: "2024-02-28",
    time: "10:00 AM - 12:00 PM",
    location: "New York Bar Association",
    type: "in-person",
    category: "Seminar",
    registered: false,
  },
  {
    id: "4",
    title: "Tax Law Update: International Tax Planning",
    description: "Expert panel discussion on international tax planning strategies and compliance requirements for multinational corporations.",
    date: "2024-03-05",
    time: "1:00 PM - 4:00 PM",
    location: "Online",
    type: "online",
    category: "Workshop",
    registered: false,
  },
  {
    id: "5",
    title: "Legal Ethics and Professional Responsibility",
    description: "Continuing education course covering ethical considerations in modern legal practice and professional responsibility standards.",
    date: "2024-03-10",
    time: "9:00 AM - 1:00 PM",
    location: "Chicago Legal Institute",
    type: "in-person",
    category: "Training",
    registered: false,
  },
  {
    id: "6",
    title: "Virtual Networking: Corporate Law Professionals",
    description: "Connect with other corporate law professionals in this virtual networking event. Share insights and build your network.",
    date: "2024-02-25",
    time: "6:00 PM - 7:30 PM",
    location: "Online",
    type: "online",
    category: "Networking",
    registered: false,
  },
];

export default function EventsSection() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [filter, setFilter] = useState<"all" | "in-person" | "online">("all");

  const handleRegister = (eventId: string) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, registered: !event.registered } : event
      )
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filteredEvents = events.filter(
    (event) => filter === "all" || event.type === filter
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Events</h1>
        <p className="text-muted">Discover legal conferences, seminars, webinars, and networking events</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            filter === "all"
              ? "bg-accent text-white"
              : "bg-surface border border-border text-muted hover:text-foreground"
          }`}
        >
          All Events
        </button>
        <button
          onClick={() => setFilter("in-person")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            filter === "in-person"
              ? "bg-accent text-white"
              : "bg-surface border border-border text-muted hover:text-foreground"
          }`}
        >
          In-Person
        </button>
        <button
          onClick={() => setFilter("online")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            filter === "online"
              ? "bg-accent text-white"
              : "bg-surface border border-border text-muted hover:text-foreground"
          }`}
        >
          Online
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="rounded-2xl border border-border/70 bg-surface/95 p-6 shadow-soft"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent mb-2">
                  {event.category}
                </span>
                <h2 className="text-xl font-semibold mb-2 text-foreground">{event.title}</h2>
              </div>
              {event.type === "online" ? (
                <Video size={20} className="text-muted" />
              ) : (
                <MapPin size={20} className="text-muted" />
              )}
            </div>

            <p className="text-sm text-muted mb-4 line-clamp-3">{event.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Calendar size={16} />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <Clock size={16} />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                {event.type === "online" ? (
                  <Video size={16} />
                ) : (
                  <MapPin size={16} />
                )}
                <span>{event.location}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-border">
              <button
                onClick={() => handleRegister(event.id)}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  event.registered
                    ? "bg-accent-soft text-accent border border-accent"
                    : "bg-accent text-white hover:bg-[#8b5a3c]"
                }`}
              >
                {event.registered ? "Registered" : "Register"}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background text-sm text-muted hover:text-foreground transition">
                <ExternalLink size={16} />
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
