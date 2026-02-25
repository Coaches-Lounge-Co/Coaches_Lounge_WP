// src/data/coaches.js
import Coach_BDonovan from "../assets/coach_BDonovan.png";

export const COACHES = [
  {
    id: "c1",
    name: "Coach Bradley Donovan",
    role: "Coach",
    program: "Chicago Elite Basketball",
    location: "Chicago, IL",
    avatarUrl: Coach_BDonovan,
    strengths: ["Player Development", "Shot Mechanics", "Leadership"],
    goals: ["Help athletes earn scholarships", "Run more showcases"],
    stats: {
      activeEvents: 9,
      totalGames: 135,
      connections: 212,
    },
    highlights: [
      { value: "12", label: "Athletes Placed", tone: "red" },
      { value: "6", label: "Showcases / Year", tone: "light" },
      { value: "10+", label: "Years Coaching", tone: "light" },
    ],
    recentActivity: [
      { date: "MAY 10", title: "Hosted Spring Combine" },
      { date: "APRIL 27", title: "Skills Clinic: Shooting" },
    ],
    coachesNotes: [
      {
        coach: "Staff Note",
        date: "MAY 11",
        note: "Focuses on fundamentals and accountability. Known for strong communication.",
      },
    ],
  },

  {
    id: "c2",
    name: "Coach Danielle Price",
    role: "Coach",
    program: "Nova Hoops Academy",
    location: "Alexandria, VA",
    avatarUrl: null,
    strengths: ["Team Defense", "Conditioning", "Guard Development"],
    goals: ["Build a girls program", "Increase recruiting visibility"],
    stats: {
      activeEvents: 6,
      totalGames: 0,
      connections: 145,
    },
    highlights: [
      { value: "8", label: "Camps Hosted", tone: "light" },
      { value: "4", label: "Teams Coached", tone: "red" },
    ],
    recentActivity: [
      { date: "APRIL 18", title: "AAU Tryouts" },
      { date: "MARCH 29", title: "Film Session Workshop" },
    ],
    coachesNotes: [
      {
        coach: "Staff Note",
        date: "APRIL 19",
        note: "High-energy coach with strong defensive identity and player buy-in.",
      },
    ],
  },

  {
    id: "c3",
    name: "Coach Marcus Hill",
    role: "Coach",
    program: "Arlington Bigs Training",
    location: "Arlington, VA",
    avatarUrl: null,
    strengths: ["Post Play", "Rim Protection", "Footwork"],
    goals: ["Develop bigs for next level", "Expand training sessions"],
    stats: {
      activeEvents: 5,
      totalGames: 0,
      connections: 98,
    },
    highlights: [
      { value: "3", label: "Clinics / Month", tone: "red" },
      { value: "20+", label: "Bigs Trained", tone: "light" },
    ],
    recentActivity: [
      { date: "APRIL 30", title: "Footwork Clinic" },
    ],
    coachesNotes: [
      {
        coach: "Staff Note",
        date: "MAY 01",
        note: "Detail-oriented coach who emphasizes footwork and positioning.",
      },
    ],
  },

  {
    id: "c4",
    name: "Coach James Allen",
    role: "Coach",
    program: "DMV Guard Lab",
    location: "Hyattsville, MD",
    avatarUrl: null,
    strengths: ["Decision-Making", "Pick & Roll", "Game IQ"],
    goals: ["Launch summer league", "Build college coach network"],
    stats: {
      activeEvents: 7,
      totalGames: 0,
      connections: 176,
    },
    highlights: [
      { value: "5", label: "Summer Events", tone: "light" },
      { value: "15+", label: "Years Playing", tone: "red" },
    ],
    recentActivity: [
      { date: "MAY 03", title: "Guard Skills Session" },
      { date: "APRIL 12", title: "College Prep Workshop" },
    ],
    coachesNotes: [
      {
        coach: "Staff Note",
        date: "MAY 04",
        note: "Strong communicator. Emphasizes reads and pace control.",
      },
    ],
  },
];