// src/data/players.js
import profilePic from "../assets/ProfilePic.png";
import JWhitmore from "../assets/Jalen_Whitmore.png"
import NBennett from "../assets/Noah_Bennett.png";

export const PLAYERS = [
    {
        id: "1",
        name: "DeAndre Vaughn",
        role: "Player",
        school: "St. Rita of Cascia High School",
        positions: "Point Guard / Shooting Guard",
        location: "Chicago, IL",
        avatarUrl: profilePic,
        strengths: ["Ball Handling", "Quickness"],
        goals: ["Improve Shooting", "Gain more exposure"],
        stats: {
            activeEvents: 18,
            totalGames: 222,
            connections: 127,
        },
        highlights: [
            { value: "23.1", label: "Points / Game", tone: "light" },
            { value: "6.8", label: "Assists / Game", tone: "light" },
            { value: "3.2", label: "Steals / Game", tone: "red" },
            { value: "62%", label: "Field Goal %", tone: "light" },
            { value: "5.6", label: "Rebounds / Game", tone: "red" },
        ],
        recentActivity: [
            { date: "APRIL 20", title: "Winning the Freeway Championship" },
            { date: "MARCH 15", title: "Attended Nike Elite Camp" },
        ],
        coachesNotes: [
            {
            coach: "Coach Bradley Donovan",
            date: "APRIL 22",
            note:
                "Great job leading the team. Keep pushing your pace and decision-making—your next level is consistency.",
            },
        ],
    },

    {
        id: "2",
        name: "Malik Carter",
        role: "Player",
        school: "TC Williams High School",
        positions: "Small Forward",
        location: "Alexandria, VA",
        avatarUrl: null,
        strengths: ["Perimeter Defense", "Rebounding", "Transition Finishing"],
        goals: ["Increase 3PT %", "Improve ball control"],
        stats: {
            activeEvents: 12,
            totalGames: 148,
            connections: 64,
        },
        highlights: [
            { value: "14.2", label: "Points / Game", tone: "light" },
            { value: "8.1", label: "Rebounds / Game", tone: "red" },
            { value: "41%", label: "3PT %", tone: "light" },
        ],
        recentActivity: [
            { date: "MAY 02", title: "AAU Regional Showcase" },
            { date: "APRIL 11", title: "School Playoff Game" },
        ],
        coachesNotes: [
            {
            coach: "Coach Danielle Price",
            date: "MAY 04",
            note: "High motor player. Continue improving your off-ball movement.",
            },
        ],
    },

    {
        id: "3",
        name: "Avery Brooks",
        role: "Player",
        school: "Arlington High School",
        positions: "Center",
        location: "Arlington, VA",
        avatarUrl: null,
        strengths: ["Shot Blocking", "Post Moves", "Screen Setting"],
        goals: ["Improve free throws", "Increase vertical leap"],
        stats: {
            activeEvents: 9,
            totalGames: 93,
            connections: 45,
        },
        highlights: [
            { value: "11.5", label: "Points / Game", tone: "light" },
            { value: "9.8", label: "Rebounds / Game", tone: "red" },
            { value: "2.7", label: "Blocks / Game", tone: "red" },
        ],
        recentActivity: [
            { date: "APRIL 28", title: "Defensive MVP Award" },
        ],
        coachesNotes: [
            {
            coach: "Coach Marcus Hill",
            date: "APRIL 29",
            note: "Anchor of the defense. Focus on conditioning for late-game endurance.",
            },
        ],
    },

    {
        id: "4",
        name: "Jalen Whitmore",
        role: "Player",
        school: "Westfield High School",
        positions: "Shooting Guard",
        location: "Fairfax, VA",
        avatarUrl: JWhitmore,
        strengths: ["Catch & Shoot", "Off-Ball Movement"],
        goals: ["Expand playmaking", "Increase assist numbers"],
        stats: {
            activeEvents: 15,
            totalGames: 171,
            connections: 89,
        },
        highlights: [
            { value: "18.7", label: "Points / Game", tone: "light" },
            { value: "44%", label: "3PT %", tone: "red" },
        ],
        recentActivity: [
            { date: "MARCH 30", title: "District Championship Win" },
        ],
        coachesNotes: [
            {
            coach: "Coach Bradley Donovan",
            date: "APRIL 01",
            note: "Elite shooter. Keep developing secondary ball handling.",
            },
        ],
    },

    {
        id: "5",
        name: "Tyrese Holloway",
        role: "Player",
        school: "DeMatha Catholic High School",
        positions: "Point Guard",
        location: "Hyattsville, MD",
        avatarUrl: null,
        strengths: ["Court Vision", "Pace Control", "On-Ball Defense"],
        goals: ["Improve midrange consistency"],
        stats: {
            activeEvents: 22,
            totalGames: 240,
            connections: 142,
        },
        highlights: [
            { value: "7.4", label: "Assists / Game", tone: "red" },
            { value: "2.1", label: "Steals / Game", tone: "light" },
        ],
        recentActivity: [
            { date: "APRIL 18", title: "Nike Elite Camp Invite" },
        ],
        coachesNotes: [
            {
            coach: "Coach James Allen",
            date: "APRIL 20",
            note: "Natural leader. Continue improving decision-making under pressure.",
            },
        ],
    },

    {
        id: "6",
        name: "Kameron Fields",
        role: "Player",
        school: "Bishop O'Connell High School",
        positions: "Power Forward",
        location: "Arlington, VA",
        avatarUrl: null,
        strengths: ["Physicality", "Putbacks", "Interior Defense"],
        goals: ["Develop outside shot"],
        stats: {
            activeEvents: 10,
            totalGames: 120,
            connections: 52,
        },
        highlights: [
            { value: "13.3", label: "Points / Game", tone: "light" },
            { value: "10.2", label: "Rebounds / Game", tone: "red" },
        ],
        recentActivity: [
            { date: "MARCH 22", title: "All-Conference Selection" },
        ],
        coachesNotes: [
            {
            coach: "Coach Michael Trent",
            date: "MARCH 23",
            note: "Strong inside presence. Expand range to stretch the floor.",
            },
        ],
    },

    {
        id: "7",
        name: "Isaiah Monroe",
        role: "Player",
        school: "Gonzaga College High School",
        positions: "Combo Guard",
        location: "Washington, DC",
        avatarUrl: null,
        strengths: ["Quick First Step", "Pull-Up Jumper"],
        goals: ["Improve defensive awareness"],
        stats: {
            activeEvents: 14,
            totalGames: 167,
            connections: 78,
        },
        highlights: [
            { value: "19.4", label: "Points / Game", tone: "light" },
            { value: "4.3", label: "Assists / Game", tone: "light" },
        ],
        recentActivity: [
            { date: "APRIL 09", title: "DC Invitational Tournament" },
        ],
        coachesNotes: [
            {
            coach: "Coach Daniel Reed",
            date: "APRIL 10",
            note: "Explosive scorer. Focus on defensive rotations.",
            },
        ],
    },

    {
        id: "8",
        name: "Noah Bennett",
        role: "Player",
        school: "Oakton High School",
        positions: "Small Forward / Power Forward",
        location: "Vienna, VA",
        avatarUrl: NBennett,
        strengths: ["Versatility", "High IQ", "Team Defense"],
        goals: ["Increase scoring output"],
        stats: {
            activeEvents: 8,
            totalGames: 84,
            connections: 33,
        },
        highlights: [
            { value: "22.3", label: "Points / Game", tone: "light" },
            { value: "2.4", label: "Assists / Game", tone: "light" },
            { value: "6.4", label: "Steals / Game", tone: "red" },
            { value: "67%", label: "Field Goal %", tone: "light" },
            { value: "9.4", label: "Rebounds / Game", tone: "red" },
        ],
        recentActivity: [
            { date: "MARCH 12", title: "Regional Finals Appearance" },
        ],
        coachesNotes: [
            {
            coach: "Coach Lauren Mitchell",
            date: "MARCH 14",
            note: "Glue player. Continue building confidence offensively.",
            },
        ],
    },

    {
        id: "9",
        name: "Ethan Delgado",
        role: "Player",
        school: "Lincoln Park High School",
        positions: "Shooting Guard",
        location: "Chicago, IL",
        avatarUrl: null,
        strengths: ["Three-Point Shooting", "Conditioning"],
        goals: ["Improve off-ball defense"],
        stats: {
            activeEvents: 17,
            totalGames: 190,
            connections: 95,
        },
        highlights: [
            { value: "20.2", label: "Points / Game", tone: "red" },
            { value: "46%", label: "3PT %", tone: "red" },
        ],
        recentActivity: [
            { date: "APRIL 25", title: "All-City Selection" },
        ],
        coachesNotes: [
            {
            coach: "Coach Bradley Donovan",
            date: "APRIL 26",
            note: "Elite perimeter shooter. Continue improving shot creation.",
            },
        ],
    },
];