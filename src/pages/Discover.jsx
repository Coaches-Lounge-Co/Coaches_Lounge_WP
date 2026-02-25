import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PEOPLE } from "../utils/people";

export default function Discover() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Any");
  const [position, setPosition] = useState("Any");
  const [role, setRole] = useState("Any"); // ✅ NEW

  // Unique locations from everyone
  const locations = useMemo(() => {
    const set = new Set();
    PEOPLE.forEach((p) => {
      if (p.location) set.add(p.location);
    });
    return ["Any", ...Array.from(set).sort()];
  }, []);

  // Roles from data (Player / Coach)
  const roles = useMemo(() => {
    const set = new Set();
    PEOPLE.forEach((p) => {
      if (p.role) set.add(p.role);
    });
    return ["Any", ...Array.from(set).sort()];
  }, []);

  // Positions: only meaningful for players. We'll keep it but not apply to coaches.
  const positions = ["Any", "PG", "SG", "SF", "PF", "C"];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return PEOPLE.filter((p) => {
      const haystack = `${p.name} ${p.school ?? ""} ${p.program ?? ""} ${p.positions ?? ""} ${p.location ?? ""}`.toLowerCase();
      const matchesQuery = !q || haystack.includes(q);

      const matchesLocation =
        location === "Any" || (p.location && p.location === location);

      const matchesRole = role === "Any" || p.role === role;

      // Only apply position filter to players (coaches don’t have positions)
      const posText = (p.positions || "").toLowerCase();
      const matchesPosition =
        position === "Any" ||
        (p.role !== "Player") || // ✅ Coaches bypass position filter
        (position === "PG" && posText.includes("point guard")) ||
        (position === "SG" && posText.includes("shooting guard")) ||
        (position === "SF" && posText.includes("small forward")) ||
        (position === "PF" && posText.includes("power forward")) ||
        (position === "C" && (posText.includes("center") || posText.includes("centre")));

      return matchesQuery && matchesLocation && matchesRole && matchesPosition;
    });
  }, [query, location, position, role]);

  return (
    <div className="bg-cl-page">
      <div className="container py-5">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h1 className="section-title mb-1">Discover</h1>
            <p className="text-muted mb-0">Players + coaches directory concept page.</p>
          </div>

          <button
            className="btn btn-outline-primary"
            onClick={() => {
              setQuery("");
              setLocation("Any");
              setPosition("Any");
              setRole("Any");
            }}
          >
            Clear filters
          </button>
        </div>

        {/* Filters */}
        <div className="cl-card p-4 mb-4">
          <div className="row g-3 align-items-end">
            <div className="col-12 col-lg-5">
              <label className="form-label fw-bold">Search</label>
              <input
                className="form-control form-control-lg"
                placeholder="Name, school, program, city…"
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

            <div className="col-6 col-lg-2">
              <label className="form-label fw-bold">Role</label>
              <select
                className="form-select form-select-lg"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-lg-2">
              <div className="small text-muted mt-1">Players only</div>
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
          Showing {filtered.length} result{filtered.length === 1 ? "" : "s"}
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

                  {/* Player vs Coach info */}
                  {p.role === "Player" ? (
                    <>
                      <div className="text-muted small">{p.positions}</div>
                      <div className="text-muted small">{p.school}</div>
                    </>
                  ) : (
                    <>
                      <div className="text-muted small">{p.program}</div>
                      <div className="text-muted small">Coach</div>
                    </>
                  )}

                  <div className="text-muted small mb-3">{p.location}</div>

                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {p.role && <span className="badge cl-badge">{p.role}</span>}
                    <span className="badge cl-badge">Profile</span>
                  </div>

                  {/* Routing note: if you only have /players/:id today, keep coaches going there for now
                      OR create /people/:id later. */}
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