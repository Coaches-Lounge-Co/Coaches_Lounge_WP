export default function Home() {
  return (
    <div>
      <section className="hero">
        <div className="container hero-content text-center">
          <h1 className="hero-title">COACHES LOUNGE</h1>
          <p className="hero-subtitle">
            Connecting players and coaches through competition, development, and opportunity.
          </p>

          <div className="d-flex gap-3 justify-content-center flex-wrap mt-4">
            <a className="btn btn-primary btn-lg px-4" href="#enter">
              ENTER THE LOUNGE
            </a>
            <a className="btn btn-outline-light btn-lg px-4" href="#events">
              EXPLORE EVENTS
            </a>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light" id="events">
        <div className="container">
          <h2 className="section-title mb-4">Featured Events</h2>
          <p className="text-muted">Next: we’ll add event cards here from JSON.</p>
        </div>
      </section>
    </div>
  );
}