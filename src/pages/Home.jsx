const featuredEvents = [
  {
    id: 1,
    title: "Boys Varsity IHSA Playoffs",
    date: "Fri, Feb 27",
    location: "Chicago, IL",
    level: "St. Rita of Cascia High School",
  },
  {
    id: 2,
    title: "Northern VA Skills Clinic",
    date: "Sun, Apr 20",
    location: "Alexandria, VA",
    level: "Open Gym",
  },
  {
    id: 3,
    title: "Capitol City League Tryouts",
    date: "Fri, May 2",
    location: "Washington, DC",
    level: "High School",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero position-relative text-white">
        {/* overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ background: "rgba(0,0,0,0.45)" }}
          aria-hidden="true"
        />

        <div className="container hero-content text-center position-relative py-5">
          <h1 className="hero-title">COACHES LOUNGE</h1>
          <p className="hero-subtitle mb-4">
            Connecting players and coaches through competition, development, and opportunity.
          </p>

          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <a className="btn btn-primary btn-lg px-4" href="#enter">
              ENTER THE LOUNGE
            </a>
            <a className="btn btn-outline-light btn-lg px-4" href="#events">
              EXPLORE EVENTS
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-5 bg-white" id="enter">
        <div className="container">
          <h2 className="section-title mb-4">How it works</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 border rounded-3 h-100">
                <h5 className="mb-2">1) Create a profile</h5>
                <p className="text-muted mb-0">Players and coaches set up a quick profile to connect faster.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded-3 h-100">
                <h5 className="mb-2">2) Discover events</h5>
                <p className="text-muted mb-0">Browse showcases, leagues, clinics, and tryouts in one place.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded-3 h-100">
                <h5 className="mb-2">3) Message & connect</h5>
                <p className="text-muted mb-0">Reach out directly and build relationships that lead to opportunities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-5 bg-light" id="events">
        <div className="container">
          <div className="d-flex align-items-end justify-content-between flex-wrap gap-2 mb-4">
            <h2 className="section-title mb-0">Featured Events</h2>
            <a className="view-all-link" href="#events">View all →</a>
          </div>

          <div className="row g-4">
            {featuredEvents.map((e) => (
              <div className="col-md-4" key={e.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{e.title}</h5>
                    <p className="card-text text-muted mb-2">
                      {e.date} • {e.location}
                    </p>
                    <span className={"badge cl-badge"}>{e.level}</span>
                  </div>
                  <div className="card-footer bg-white border-0 pt-0">
                    <a className="btn btn-outline-primary w-100" href="#enter">
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

         {/*<p className="text-muted mt-4 mb-0">
            Next: swap <code>featuredEvents</code> to JSON/API and link cards to event detail pages.
          </p>*/}  
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-white border-top">
        <div className="container d-flex justify-content-between flex-wrap gap-2">
          <div className="text-muted">© {new Date().getFullYear()} Coaches Lounge</div>
          <div className="d-flex gap-3">
            <a href="#enter" className="text-decoration-none text-muted">About</a>
            <a href="#events" className="text-decoration-none text-muted">Events</a>
            <a href="#enter" className="text-decoration-none text-muted">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}