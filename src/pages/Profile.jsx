import { useMemo, useState } from "react";
import profilePic from "../../src/assets/ProfilePic.png";

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function stringToColor(str) {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;

  return `hsl(${hue}, 70%, 40%)`;
}

export default function Profile() {
  const [connected, setConnected] = useState(true);

  const profile = useMemo(
    () => ({
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
    }),
    []
  );

    const user = {
        name: profile.name,
        avatarUrl: profile.avatarUrl || null
    };


  return (
    <div className="bg-cl-page">
      {/* Header */}
      <header className="cl-profile-hero">
        <div className="cl-profile-hero__overlay" />
        <div className="container position-relative">
          <div className="row align-items-end g-4">
            <div className="col-12 col-lg-8 d-flex align-items-end gap-4">
              <div className="cl-avatar">
                {/* <div className="cl-avatar__inner">{profile.avatarInitials}</div> */}
                <div className="cl-avatar">
                    {user.avatarUrl ? (
                        <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="cl-avatar-img"
                        />
                    ) : (
                        <div
                        className="cl-avatar__inner"
                        style={{
                            backgroundColor: stringToColor(user.name),
                        }}
                        >
                        {getInitials(user.name)}
                        </div>
                    )}
                </div>
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

            <div className="col-12 col-lg-4 d-flex justify-content-lg-end">
              <button
                className={`btn btn-lg cl-btn-connect ${
                  connected ? "btn-outline-light" : "btn-danger"
                }`}
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