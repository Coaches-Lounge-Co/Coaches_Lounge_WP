import { Link, useParams } from "react-router-dom";
import { getPersonById } from "../utils/people";
import { getInitials } from "../utils/profileUtils"; // if you already have this

export default function PeopleProfile() {
  const { id } = useParams();
  const person = getPersonById(id);

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

  return (
    <div className="bg-cl-page">
      <div className="cl-profile-hero">
        <div className="cl-profile-hero__overlay" />
        <div className="container position-relative py-4">
          <div className="row align-items-center g-4">
            <div className="col-12 col-md-auto d-flex justify-content-center">
              <div className="cl-avatar">
                {person.avatarUrl ? (
                  <img className="cl-avatar-img" src={person.avatarUrl} alt={person.name} />
                ) : (
                  <div className="cl-avatar__inner">{getInitials(person.name)}</div>
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
                    ? `${person.positions} • ${person.school}`
                    : `${person.program} • ${person.location}`}
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
      </div>

      <div className="container py-5">
        <div className="cl-card p-4">
          <h2 className="cl-card-title mb-3">About</h2>

          {person.role === "Player" ? (
            <>
              <div className="mb-2"><span className="cl-label">Strengths:</span> {person.strengths?.join(", ")}</div>
              <div className="mb-2"><span className="cl-label">Goals:</span> {person.goals?.join(", ")}</div>
            </>
          ) : (
            <>
              <div className="mb-2"><span className="cl-label">Program:</span> {person.program}</div>
              <div className="mb-2"><span className="cl-label">Strengths:</span> {person.strengths?.join(", ")}</div>
              <div className="mb-2"><span className="cl-label">Goals:</span> {person.goals?.join(", ")}</div>
            </>
          )}

          <div className="mt-4">
            <Link className="btn btn-outline-primary" to="/discover">
              Back to Discover
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}