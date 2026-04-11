const launchHighlights = [
  "Curated events and showcase opportunities",
  "Smarter player and coach discovery",
  "A cleaner way to connect, message, and grow your network",
];

export default function Home() {
  return (
    <main>
      <style>
        {`
          nav.navbar,
          footer {
            display: none !important;
          }
        `}
      </style>

      <section className="hero position-relative text-white">
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ background: "rgba(0,0,0,0.45)" }}
          aria-hidden="true"
        />

        <div className="container hero-content position-relative py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <span
                className="badge rounded-pill px-3 py-2 mb-3"
                style={{
                  background: "rgba(225, 6, 0, 0.18)",
                  color: "#fff",
                  letterSpacing: "0.08em",
                }}
              >
                COMING SOON
              </span>
              <h1 className="hero-title">COACHES LOUNGE</h1>
              <p className="hero-subtitle mb-4">
                We&apos;re building a better home for players and coaches to connect through
                development, competition, and real opportunity.
              </p>
              <p
                className="mx-auto mb-4"
                style={{
                  maxWidth: "42rem",
                  color: "rgba(255,255,255,0.82)",
                  fontSize: "1rem",
                }}
              >
                The full experience is on the way. For now, this page is intentionally paused
                while we finish shaping the lounge behind the scenes.
              </p>

              <div
                className="mx-auto mt-4 rounded-pill px-4 py-3"
                style={{
                  maxWidth: "34rem",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  color: "rgba(255,255,255,0.92)",
                  fontWeight: 600,
                }}
              >
                Official launch coming soon.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-white" id="launch-preview">
        <div className="container">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-7">
              <div
                className="h-100 p-4 p-md-5 rounded-4"
                style={{
                  background: "linear-gradient(135deg, #111111 0%, #2a2a2a 55%, #7f0000 100%)",
                  color: "#fff",
                  boxShadow: "0 20px 45px rgba(17,17,17,0.12)",
                }}
              >
                <h2 className="section-title mb-3">The Lounge Is Almost Ready</h2>
                <p className="mb-4" style={{ color: "rgba(255,255,255,0.84)", maxWidth: "38rem" }}>
                  Coaches Lounge is being refined to make every first impression feel intentional.
                  We&apos;re holding the public homepage until the platform is ready to launch the
                  right way.
                </p>
                <div className="row g-3">
                  {launchHighlights.map((item) => (
                    <div className="col-md-6" key={item}>
                      <div
                        className="h-100 rounded-4 p-3"
                        style={{
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        <span className="badge cl-badge mb-2">Launch Focus</span>
                        <p className="mb-0 fw-semibold">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div
                className="card h-100 border-0 shadow-sm rounded-4"
                style={{ overflow: "hidden" }}
              >
                <div className="card-body p-4 p-md-5">
                  <span className="badge cl-badge mb-3">Status Update</span>
                  <h2 className="section-title mb-3">Why the Pause?</h2>
                  <p className="text-muted mb-4">
                    We don&apos;t want visitors landing on a page that feels half launched. This
                    temporary screen gives Coaches Lounge a stronger first impression while the
                    full product comes together.
                  </p>
                  <div className="d-grid gap-3">
                    <div className="p-3 rounded-4 bg-light">
                      <div className="fw-bold">Brand-first launch</div>
                      <div className="text-muted small">
                        A cleaner entrance that matches the experience we&apos;re building.
                      </div>
                    </div>
                    <div className="p-3 rounded-4 bg-light">
                      <div className="fw-bold">More polished rollout</div>
                      <div className="text-muted small">
                        Features and content will go live together instead of in fragments.
                      </div>
                    </div>
                    <div className="p-3 rounded-4 bg-light">
                      <div className="fw-bold">Clearer next step</div>
                      <div className="text-muted small">
                        Visitors immediately understand that Coaches Lounge is launching soon.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
