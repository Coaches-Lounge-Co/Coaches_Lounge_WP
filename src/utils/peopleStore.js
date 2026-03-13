// src/utils/peopleStore.js
import { PEOPLE } from "./people";

const LS_PROFILES = "cl_profiles";

function readProfiles() {
  try {
    const raw = localStorage.getItem(LS_PROFILES);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// Convert stored profiles to the same shape your Discover/Profile pages expect
function mapProfileToPerson(p) {
  // Ensure it matches what PeopleProfile expects:
  // { id, name, role, location, positions OR program, avatarUrl, strengths, goals, stats, highlights, ... }
  return {
    id: p.id,
    name: p.name,
    role: p.role, // "Player" or "Coach"
    school: p.role === "Player" ? p.school : undefined,
    program: p.role === "Coach" ? p.program : undefined,
    positions: p.role === "Player" ? p.positions : undefined,
    location: p.location,
    avatarUrl: p.avatarUrl || null,

    strengths: p.strengths || [],
    goals: p.goals || [],
    stats: p.stats || { activeEvents: 0, totalGames: 0, connections: 0 },
    videoHighlights: [
      { url: "https://youtube.com/watch?v=xxxxx" }
    ],
    recentActivity: p.recentActivity || [],
    coachesNotes: p.coachesNotes || [],
  };
}

export function getAllPeople() {
  const stored = readProfiles();
  const localPeople = Object.values(stored).map(mapProfileToPerson);

  // Option: prevent duplicate IDs if you ever collide (unlikely)
  return [...PEOPLE, ...localPeople];
}

export function getPersonByIdMerged(id) {
  const all = getAllPeople();
  return all.find((p) => p.id === id);
}