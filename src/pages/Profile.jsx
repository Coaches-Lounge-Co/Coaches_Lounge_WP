import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PLAYERS } from "../data/players";
import { getInitials, stringToColor } from "../utils/profileUtils";

export default function Profile() {
  const { id } = useParams(); // works for /players/:id
  const navigate = useNavigate();
  const [connected, setConnected] = useState(true);

  const profile = useMemo(() => {
    // For /profile (no id), show first mock as default
    if (!id) return PLAYERS[0];
    return PLAYERS.find((p) => p.id === id);
  }, [id]);

  if (!profile) {
    return (
      <div className="container py-5">
        <h1 className="section-title">Profile not found</h1>
        <p className="text-muted">No player found for ID: {id}</p>
        <button className="btn btn-primary" onClick={() => navigate("/discover")}>
          Back to Discover
        </button>
      </div>
    );
  }

  const user = {
    name: profile.name,
    avatarUrl: profile.avatarUrl || null,
  };

  return (
    <div className="bg-cl-page">
      <header className="cl-profile-hero">
        <div className="cl-profile-hero__overlay" />
        <div className="container position-relative">
          <div className="row align-items-end g-4">
            <div className="col-12 col-lg-8 d-flex align-items-end gap-4">
              <div className="cl-avatar">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="cl-avatar-img" />
                ) : (
                  <div
                    className="cl-avatar__inner"
                    style={{ backgroundColor: stringToColor(user.name) }}
                  >
                    {getInitials(user.name)}
                  </div>
                )}
              </div>

              <div className="text-white pb-2">
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  <h1 className="m-0 cl-profile-name">{profile.name}</h1>

                  <span className="badge rounded-pill bg-success px-3 py-2">
                    {connected ? "CONNECTED" : "NOT CONNECTED"}
                  </span>
                </div>

                <div className="mt-2 cl-profile-sub">
                  <div className="fw-semibold">{profile.school}</div>
                  <div className="opacity-75">{profile.positions}</div>
                  <div className="opacity-75">{profile.location}</div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4 d-flex justify-content-lg-end gap-2">
              <button className="btn btn-lg btn-outline-light" onClick={() => navigate("/discover")}>
                Back
              </button>

              <button
                className={`btn btn-lg cl-btn-connect ${connected ? "btn-outline-light" : "btn-danger"}`}
                onClick={() => setConnected((v) => !v)}
              >
                {connected ? "DISCONNECT" : "CONNECT"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container py-5">
        <div className="row g-4">
          {/* About */}
          <div className="col-12 col-lg-8">
            <div className="card cl-card h-100">
              <div className="card-body p-4">
                <h2 className="cl-card-title mb-4">ABOUT {profile.name.toUpperCase()}</h2>

                <div className="mb-3">
                  <div className="cl-label">Strengths:</div>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {profile.strengths.map((s) => (
                      <span key={s} className="badge rounded-pill bg-light text-dark px-3 py-2">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="cl-label">Goals:</div>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {profile.goals.map((g) => (
                      <span key={g} className="badge rounded-pill bg-light text-dark px-3 py-2">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="col-12 col-lg-4">
            <div className="card cl-card h-100">
              <div className="card-body p-4">
                <h2 className="cl-card-title mb-4">STATS</h2>

                <div className="row g-3 text-center">
                  <StatBlock value={profile.stats.activeEvents} label="ACTIVE EVENTS" />
                  <StatBlock value={profile.stats.totalGames} label="TOTAL GAMES" emphasize />
                  <StatBlock value={profile.stats.connections} label="CONNECTIONS" />
                </div>
              </div>
            </div>
          </div>

          {/* Performance Highlights */}
          <div className="col-12 col-lg-8">
            <div className="card cl-card h-100">
              <div className="card-body p-4">
                <h2 className="cl-card-title mb-4">PERFORMANCE HIGHLIGHTS</h2>

                <div className="row g-3">
                  {profile.highlights.map((h) => (
                    <div key={h.label} className="col-12 col-md-6">
                      <HighlightCard {...h} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity + Coach Notes */}
          <div className="col-12 col-lg-4">
            <div className="d-flex flex-column gap-4">
              <div className="card cl-card">
                <div className="card-body p-4">
                  <h2 className="cl-card-title mb-4">RECENT ACTIVITY</h2>

                  <div className="d-flex flex-column gap-3">
                    {profile.recentActivity.map((a) => (
                      <div key={a.title} className="cl-activity">
                        <div className="cl-activity-date">{a.date}</div>
                        <div className="cl-activity-title">{a.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card cl-card">
                <div className="card-body p-4">
                  <h2 className="cl-card-title mb-4">COACH'S NOTES</h2>

                  {profile.coachesNotes.map((n) => (
                    <div key={n.date} className="cl-note">
                      <div className="d-flex align-items-center gap-3 mb-2">
                        <div className="cl-note-avatar">BD</div>
                        <div>
                          <div className="fw-semibold">{n.coach}</div>
                          <div className="text-muted small">{n.date}</div>
                        </div>
                      </div>
                      <div className="text-muted">{n.note}</div>
                    </div>
                  ))}
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