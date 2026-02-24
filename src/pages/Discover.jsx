import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PLAYERS } from "../data/players"; // ✅ shared mock data

export default function Discover() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Any");
  const [position, setPosition] = useState("Any");

  // Build unique filter values from the data (so you don’t hardcode cities)
  const locations = useMemo(() => {
    const set = new Set();
    PLAYERS.forEach((p) => {
      if (p.location) set.add(p.location);
    });
    return ["Any", ...Array.from(set).sort()];
  }, []);

  // Positions are inside the "positions" string in your data.
  // For mockup simplicity, we’ll offer common positions. You can refine later.
  const positions = ["Any", "PG", "SG", "SF", "PF", "C"];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return PLAYERS.filter((p) => {
      const haystack = `${p.name} ${p.school} ${p.positions} ${p.location}`.toLowerCase();

      const matchesQuery = !q || haystack.includes(q);

      const matchesLocation =
        location === "Any" || (p.location && p.location === location);

      // Since "positions" is a string like "Point Guard / Shooting Guard",
      // we do a simple includes check for PG/SG/etc.
      const posText = (p.positions || "").toLowerCase();
      const matchesPosition =
        position === "Any" ||
        (position === "PG" && posText.includes("point guard")) ||
        (position === "SG" && posText.includes("shooting guard")) ||
        (position === "SF" && posText.includes("small forward")) ||
        (position === "PF" && posText.includes("power forward")) ||
        (position === "C" && (posText.includes("center") || posText.includes("centre")));

      return matchesQuery && matchesLocation && matchesPosition;
    });
  }, [query, location, position]);

  return (
    <div className="bg-cl-page">
      <div className="container py-5">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h1 className="section-title mb-1">Discover</h1>
            <p className="text-muted mb-0">Players directory concept page.</p>
          </div>

          <button
            className="btn btn-outline-primary"
            onClick={() => {
              setQuery("");
              setLocation("Any");
              setPosition("Any");
            }}
          >
            Clear filters
          </button>
        </div>

        {/* Filters */}
        <div className="cl-card p-4 mb-4">
          <div className="row g-3 align-items-end">
            <div className="col-12 col-lg-6">
              <label className="form-label fw-bold">Search</label>
              <input
                className="form-control form-control-lg"
                placeholder="Name, school, city…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="col-6 col-lg-3">
              <label className="form-label fw-bold">Location</label>
              <select
                className="form-select form-select-lg"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-6 col-lg-3">
              <label className="form-label fw-bold">Position</label>
              <select
                className="form-select form-select-lg"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              >
                {positions.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="text-muted fw-semibold mb-3">
          Showing {filtered.length} player{filtered.length === 1 ? "" : "s"}
        </div>

        {filtered.length === 0 ? (
          <div className="cl-card p-4">
            <h3 className="cl-card-title mb-2">No results found</h3>
            <p className="text-muted mb-0">Try a different search or clear filters.</p>
          </div>
        ) : (
          <div className="row g-4">
            {filtered.map((p) => (
              <div key={p.id} className="col-12 col-md-6 col-lg-4">
                <div className="cl-card p-4 h-100 d-flex flex-column">
                  <div className="fw-bold fs-5">{p.name}</div>
                  <div className="text-muted small">{p.positions}</div>
                  <div className="text-muted small">{p.school}</div>
                  <div className="text-muted small mb-3">{p.location}</div>

                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {p.role && <span className="badge cl-badge">{p.role}</span>}
                    {/* optional badges for mockup */}
                    <span className="badge cl-badge">Profile</span>
                  </div>

                  {/* ✅ Links to your dynamic route */}
                  <Link to={`/players/${p.id}`} className="btn btn-primary mt-auto">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}