import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { PEOPLE } from "../utils/people";
import { getInitials, stringToColor } from "../utils/profileUtils";

export default function PeopleProfile() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPerson() {
      try {
        // 1. Check demo/local bundled data first
        const demoPerson = PEOPLE.find((p) => p.id === id);
        if (demoPerson) {
          setPerson(demoPerson);
          setLoading(false);
          return;
        }

        // 2. Check Firestore for real created profiles
        const docRef = doc(db, "profiles", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPerson({
            id: docSnap.id,
            ...docSnap.data(),
          });
        } else {
          setPerson(null);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        setPerson(null);
      } finally {
        setLoading(false);
      }
    }

    loadPerson();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5">
        <h1 className="section-title">Profile</h1>
        <div className="cl-card p-4">
          <p className="text-muted mb-0">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="container py-5">
        <h1 className="section-title">Profile</h1>
        <div className="cl-card p-4">
          <p className="text-muted mb-3">Profile not found.</p>
          <Link className="btn btn-outline-primary" to="/discover">
            Back to Discover
          </Link>
        </div>
      </div>
    );
  }

  const stats = person.stats ?? { activeEvents: 0, totalGames: 0, connections: 0 };
  const highlights = person.highlights ?? [];
  const recentActivity = person.recentActivity ?? [];
  const coachesNotes = person.coachesNotes ?? [];

  return (
    <div className="bg-cl-page">
      <header className="cl-profile-hero">
        <div className="cl-profile-hero__overlay" />
        <div className="container position-relative py-4">
          <div className="row align-items-center g-4">
            <div className="col-12 col-md-auto d-flex justify-content-center">
              <div className="cl-avatar">
                {person.avatarUrl ? (
                  <img className="cl-avatar-img" src={person.avatarUrl} alt={person.name} />
                ) : (
                  <div
                    className="cl-avatar__inner"
                    style={{ backgroundColor: stringToColor(person.name || "Profile") }}
                  >
                    {getInitials(person.name || "Profile")}
                  </div>
                )}
              </div>
            </div>

            <div className="col-12 col-md">
              <div className="text-white">
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <h1 className="cl-profile-name mb-0">{person.name}</h1>
                  <span className="badge cl-badge">{person.role}</span>
                </div>

                <p className="cl-profile-sub mt-2 mb-0 text-white-50">
                  {person.role === "Player"
                    ? `${person.positions ?? ""}${person.school ? ` • ${person.school}` : ""}`
                    : `${person.program ?? ""}${person.location ? ` • ${person.location}` : ""}`}
                </p>

                {person.role === "Player" && (
                  <p className="mt-2 mb-0 text-white-50">{person.location}</p>
                )}
              </div>
            </div>

            <div className="col-12 col-md-auto d-flex justify-content-center">
              <button className="btn btn-primary cl-btn-connect">Message</button>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-5">
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="card cl-card h-100">
              <div className="card-body p-4">
                <h2 className="cl-card-title mb-4">ABOUT</h2>

                <div className="mb-3">
                  <div className="cl-label">Strengths:</div>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {(person.strengths ?? []).length > 0 ? (
                      person.strengths.map((s) => (
                        <span key={s} className="badge rounded-pill bg-light text-dark px-3 py-2">
                          {s}
                        </span>
                      ))
                    ) : (
                      <div className="text-muted">No strengths added yet.</div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="cl-label">Goals:</div>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {(person.goals ?? []).length > 0 ? (
                      person.goals.map((g) => (
                        <span key={g} className="badge rounded-pill bg-light text-dark px-3 py-2">
                          {g}
                        </span>
                      ))
                    ) : (
                      <div className="text-muted">No goals added yet.</div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <Link className="btn btn-outline-primary" to="/discover">
                    Back to Discover
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card cl-card h-100">
              <div className="card-body p-4">
                <h2 className="cl-card-title mb-4">STATS</h2>

                <div className="row g-3 text-center">
                  <StatBlock value={stats.activeEvents} label="ACTIVE EVENTS" />
                  <StatBlock value={stats.totalGames} label="TOTAL GAMES" emphasize />
                  <StatBlock value={stats.connections} label="CONNECTIONS" />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-8">
            <div className="card cl-card h-100">
              <div className="card-body p-4">
                <h2 className="cl-card-title mb-4">PERFORMANCE HIGHLIGHTS</h2>

                {highlights.length === 0 ? (
                  <div className="text-muted">No highlights added yet.</div>
                ) : (
                  <div className="row g-3">
                    {highlights.map((h) => (
                      <div key={h.label} className="col-12 col-md-6">
                        <HighlightCard {...h} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="d-flex flex-column gap-4">
              <div className="card cl-card">
                <div className="card-body p-4">
                  <h2 className="cl-card-title mb-4">RECENT ACTIVITY</h2>

                  {recentActivity.length === 0 ? (
                    <div className="text-muted">No activity yet.</div>
                  ) : (
                    <div className="d-flex flex-column gap-3">
                      {recentActivity.map((a) => (
                        <div key={`${a.date}-${a.title}`} className="cl-activity">
                          <div className="cl-activity-date">{a.date}</div>
                          <div className="cl-activity-title">{a.title}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="card cl-card">
                <div className="card-body p-4">
                  <h2 className="cl-card-title mb-4">COACH&apos;S NOTES</h2>

                  {coachesNotes.length === 0 ? (
                    <div className="text-muted">No notes yet.</div>
                  ) : (
                    coachesNotes.map((n) => (
                      <div key={`${n.date}-${n.coach}`} className="cl-note">
                        <div className="d-flex align-items-center gap-3 mb-2">
                          <div className="cl-note-avatar">{getInitials(n.coach)}</div>
                          <div>
                            <div className="fw-semibold">{n.coach}</div>
                            <div className="text-muted small">{n.date}</div>
                          </div>
                        </div>
                        <div className="text-muted">{n.note}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatBlock({ value, label, emphasize = false }) {
  return (
    <div className="col-4">
      <div className={`cl-stat ${emphasize ? "cl-stat--emph" : ""}`}>{value}</div>
      <div className="cl-stat-label">{label}</div>
    </div>
  );
}

function HighlightCard({ value, label, tone = "light" }) {
  const className =
    tone === "red" ? "cl-highlight cl-highlight--red" : "cl-highlight cl-highlight--light";

  return (
    <div className={className}>
      <div className="cl-highlight-value">{value}</div>
      <div className="cl-highlight-label">{label}</div>
    </div>
  );
}