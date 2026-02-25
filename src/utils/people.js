// src/utils/people.js
import { PLAYERS } from "../data/players";
import { COACHES } from "../data/coaches";

// One combined list for messaging, discovery, etc.
export const PEOPLE = [...PLAYERS, ...COACHES];

export function getPersonById(id) {
  return PEOPLE.find((p) => p.id === id) || null;
}

// If you want filtering later:
export function getPeopleByRole(role) {
  return PEOPLE.filter((p) => p.role === role);
}