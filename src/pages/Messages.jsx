import { useMemo, useState } from "react";
import { THREADS } from "../data/threads";
import { getPersonById } from "../utils/people";

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function Messages() {
  const [selectedId, setSelectedId] = useState(THREADS[0]?.id ?? null);

  const selectedThread = useMemo(
    () => THREADS.find((t) => t.id === selectedId) ?? null,
    [selectedId]
  );

  const selectedPerson = selectedThread
    ? getPersonById(selectedThread.participantId)
    : null;

  return (
    <div className="container py-5">
      <div className="d-flex align-items-end justify-content-between mb-3">
        <div>
          <h1 className="section-title mb-1">Messages</h1>
          <p className="text-muted mb-0">
            Reach out to coaches and athletes on the platform.
          </p>
        </div>
        <button className="btn btn-outline-primary">New Message</button>
      </div>

      <div className="row g-3">
        {/* Left: Inbox Preview */}
        <div className="col-12 col-lg-4">
          <div className="card cl-card">
            <div className="p-3 border-bottom">
              <input className="form-control" placeholder="Search messages..." />
            </div>

            <div className="list-group list-group-flush">
              {THREADS.map((t) => {
                const person = getPersonById(t.participantId);
                if (!person) return null;

                const active = t.id === selectedId;

                return (
                  <button
                    key={t.id}
                    className={`list-group-item list-group-item-action d-flex justify-content-between align-items-start ${
                      active ? "active" : ""
                    }`}
                    onClick={() => setSelectedId(t.id)}
                    style={{ textAlign: "left" }}
                  >
                    <div className="d-flex gap-2">
                      {/* Avatar */}
                      <div
                        className="rounded-circle overflow-hidden d-flex align-items-center justify-content-center"
                        style={{
                          width: 42,
                          height: 42,
                          background: active ? "rgba(255,255,255,0.15)" : "#111",
                          color: "#fff",
                          fontWeight: 800,
                          flex: "0 0 auto",
                        }}
                      >
                        {person.avatarUrl ? (
                          <img
                            src={person.avatarUrl}
                            alt={person.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <span>{getInitials(person.name)}</span>
                        )}
                      </div>

                      <div className="me-2">
                        <div className="fw-bold">{person.name}</div>
                        <div className={active ? "text-white-50" : "text-muted"}>
                          {person.role} • {t.last}
                        </div>
                      </div>
                    </div>

                    <div className="text-end">
                      <div className={active ? "text-white-50" : "text-muted"}>
                        {t.time}
                      </div>
                      {t.unread > 0 && (
                        <span className="badge text-bg-secondary mt-1">
                          {t.unread}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Thread Concept */}
        <div className="col-12 col-lg-8">
          <div className="card cl-card d-flex flex-column" style={{ minHeight: 520 }}>
            {!selectedThread || !selectedPerson ? (
              <div className="p-4 text-muted">
                Select a conversation to view messages.
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-bold">{selectedPerson.name}</div>
                    <div className="d-flex gap-2 align-items-center">
                      <span className="badge cl-badge">{selectedPerson.role}</span>
                      {selectedPerson.location && (
                        <span className="text-muted small">{selectedPerson.location}</span>
                      )}
                    </div>
                  </div>

                  {/* mock button */}
                  <button className="btn btn-sm btn-outline-primary">
                    View Profile
                  </button>
                </div>

                {/* Thread body (mock) */}
                <div className="p-4 flex-grow-1">
                  {/* “Most recent message” shown as a bubble */}
                  <div className="d-flex justify-content-start mb-3">
                    <div className="bg-light rounded-3 p-3" style={{ maxWidth: "75%" }}>
                      <div>{selectedThread.last}</div>
                      <div className="small text-muted mt-1">{selectedThread.time}</div>
                    </div>
                  </div>

                  {/* Optional: show one “you” bubble for concept */}
                  <div className="d-flex justify-content-end">
                    <div
                      className="rounded-3 p-3 text-bg-dark"
                      style={{ maxWidth: "75%" }}
                    >
                      <div>Sounds good — thanks!</div>
                      <div className="small text-white-50 mt-1">Just now</div>
                    </div>
                  </div>
                </div>

                {/* Composer (mock) */}
                <div className="p-3 border-top">
                  <div className="d-flex gap-2">
                    <input
                      className="form-control"
                      placeholder="Type a message..."
                      // disabled // <- enable or disable based on what you want to showcase
                    />
                    <button className="btn btn-primary" disabled>
                      Send
                    </button>
                  </div>
                  <div className="small text-muted mt-2">
                    Concept UI — messaging not yet enabled.
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}