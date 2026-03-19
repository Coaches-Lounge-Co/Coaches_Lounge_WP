import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, onSnapshot, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { PEOPLE } from "../utils/people";
import { getInitials, stringToColor } from "../utils/profileUtils";
import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaFacebook,
  FaTiktok,
  FaGlobe,
  FaXTwitter,
} from "react-icons/fa6";

function normalizeSocialLinks(links) {
  return (links || []).map((link) =>
    typeof link === "string" ? { platform: "website", url: link } : link
  );
}

function getSocialIcon(platform) {
  switch ((platform || "").toLowerCase()) {
    case "instagram":
      return <FaInstagram />;
    case "linkedin":
      return <FaLinkedin />;
    case "youtube":
      return <FaYoutube />;
    case "x":
    case "twitter":
      return <FaXTwitter />;
    case "facebook":
      return <FaFacebook />;
    case "tiktok":
      return <FaTiktok />;
    default:
      return <FaGlobe />;
  }
}

function getSocialLabel(platform) {
  switch ((platform || "").toLowerCase()) {
    case "instagram":
      return "Instagram";
    case "linkedin":
      return "LinkedIn";
    case "youtube":
      return "YouTube";
    case "x":
    case "twitter":
      return "X";
    case "facebook":
      return "Facebook";
    case "tiktok":
      return "TikTok";
    default:
      return "Website";
  }
}

function getYouTubeEmbedUrl(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      const videoId = parsed.pathname.slice(1);
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname === "/watch") {
        const videoId = parsed.searchParams.get("v");
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }

      if (parsed.pathname.startsWith("/shorts/")) {
        const videoId = parsed.pathname.split("/shorts/")[1];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
      }

      if (parsed.pathname.startsWith("/embed/")) {
        return url;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export default function PeopleProfile() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liking, setLiking] = useState(false);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const demoPerson = PEOPLE.find((p) => p.id === id);

    if (demoPerson) {
      setPerson({
        ...demoPerson,
        socialLinks: normalizeSocialLinks(demoPerson.socialLinks),
      });
      setLoading(false);
      return;
    }

    const profileRef = doc(db, "profiles", id);

    const unsub = onSnapshot(
      profileRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const loaded = {
            id: docSnap.id,
            ...docSnap.data(),
          };

          setPerson({
            ...loaded,
            socialLinks: normalizeSocialLinks(loaded.socialLinks),
          });
        } else {
          setPerson(null);
        }

        setLoading(false);
      },
      (error) => {
        console.error("Error loading profile:", error);
        setPerson(null);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [id]);

  async function handleLike() {
    if (!person?.id) return;

    try {
      setLiking(true);
      await updateDoc(doc(db, "profiles", person.id), {
        likesCount: increment(1),
      });
    } catch (error) {
      console.error("Failed to like profile:", error);
    } finally {
      setLiking(false);
    }
  }

  async function handleFollow() {
    if (!person?.id) return;

    try {
      setFollowing(true);
      await updateDoc(doc(db, "profiles", person.id), {
        followersCount: increment(1),
      });
    } catch (error) {
      console.error("Failed to follow profile:", error);
    } finally {
      setFollowing(false);
    }
  }

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

  const awards = person.awards ?? [];
  const socialLinks = person.socialLinks ?? [];
  const videos = person.videoHighlights ?? [];

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

                <p className="cl-profile-sub mt-2 mb-1 text-white-50">
                  {person.role === "Player"
                    ? `${person.positions ?? ""}${person.school ? ` • ${person.school}` : ""}`
                    : `${person.program ?? ""}`}
                </p>

                <p className="mb-1 text-white-50">{person.location || "Location not added"}</p>

                <div className="d-flex gap-3 flex-wrap text-white-50 small mt-2">
                  <span>Age: {person.age || "N/A"}</span>
                  <span>Height: {person.height || "N/A"}</span>
                  <span>Experience: {person.yearsExperience || 0} years</span>
                  <span>Followers: {person.followersCount || 0}</span>
                  <span>Likes: {person.likesCount || 0}</span>
                </div>

                {socialLinks.length > 0 && (
                  <div className="d-flex gap-3 flex-wrap mt-3">
                    {socialLinks.map((link, index) => (
                      <a
                        key={`${link.platform}-${link.url}-${index}`}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white text-decoration-none"
                        title={getSocialLabel(link.platform)}
                        aria-label={getSocialLabel(link.platform)}
                        style={{ fontSize: 22 }}
                      >
                        {getSocialIcon(link.platform)}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="col-12 col-md-auto d-flex justify-content-center gap-2 flex-wrap">
              <button
                className="btn btn-outline-light"
                onClick={handleFollow}
                disabled={following}
              >
                {following ? "Following..." : "Follow"}
              </button>

              <button
                className="btn btn-primary cl-btn-connect"
                onClick={handleLike}
                disabled={liking}
              >
                {liking ? "Liking..." : "Like Profile"}
              </button>
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

                <div className="mb-4">
                  <div className="cl-label">Resume / Bio</div>
                  <p className="mt-2 mb-0 text-muted">
                    {person.resume || "No resume or bio added yet."}
                  </p>
                </div>

                <div className="mb-4">
                  <div className="cl-label">Awards / Accolades</div>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {awards.length > 0 ? (
                      awards.map((award) => (
                        <span
                          key={award}
                          className="badge rounded-pill bg-light text-dark px-3 py-2"
                        >
                          {award}
                        </span>
                      ))
                    ) : (
                      <div className="text-muted">No awards added yet.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card cl-card h-100">
              <div className="card-body p-4">
                <h2 className="cl-card-title mb-4">PROFILE INFO</h2>
                
                <div className="d-flex flex-column gap-3">
                  {/* <div>
                    <div className="cl-label">Age Requirement</div>
                    <div className="text-muted mt-1">
                      {person.ageConfirmed ? "13+ confirmed" : "Not confirmed"}
                    </div>
                  </div>*/}
                  <div>
                    <div className="cl-label">Age</div>
                    <div className="text-muted mt-1">{person.age || "N/A"}</div>
                  </div>

                  <div>
                    <div className="cl-label">Role</div>
                    <div className="text-muted mt-1">{person.role || "N/A"}</div>
                  </div>

                  <div>
                    <div className="cl-label">Height</div>
                    <div className="text-muted mt-1">{person.height || "N/A"}</div>
                  </div>

                  <div>
                    <div className="cl-label">Years of Experience</div>
                    <div className="text-muted mt-1">
                      {person.yearsExperience || 0} years
                    </div>
                  </div>

                  {person.role === "Player" ? (
                    <>
                      <div>
                        <div className="cl-label">School</div>
                        <div className="text-muted mt-1">{person.school || "N/A"}</div>
                      </div>

                      <div>
                        <div className="cl-label">Position</div>
                        <div className="text-muted mt-1">{person.positions || "N/A"}</div>
                      </div>
                    </>
                  ) : (
                    <div>
                      <div className="cl-label">Program</div>
                      <div className="text-muted mt-1">{person.program || "N/A"}</div>
                    </div>
                  )}

                  <div>
                    <div className="cl-label">Socials</div>
                    {socialLinks.length > 0 ? (
                      <div className="d-flex flex-wrap gap-3 mt-2">
                        {socialLinks.map((link, index) => (
                          <a
                            key={`${link.platform}-${link.url}-${index}`}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="d-inline-flex align-items-center justify-content-center rounded-circle border text-decoration-none"
                            title={getSocialLabel(link.platform)}
                            aria-label={getSocialLabel(link.platform)}
                            style={{
                              width: 44,
                              height: 44,
                              fontSize: 20,
                            }}
                          >
                            {getSocialIcon(link.platform)}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="text-muted mt-1">No social links added yet.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="card cl-card h-100">
              <div className="card-body p-4">
                <h2 className="cl-card-title mb-4">YOUTUBE HIGHLIGHTS</h2>

                {videos.length === 0 ? (
                  <div className="text-muted">No highlight videos added yet.</div>
                ) : (
                  <div className="row g-4">
                    {videos.map((video, index) => {
                      const embedUrl = getYouTubeEmbedUrl(video.url);
                      if (!embedUrl) return null;

                      return (
                        <div key={`${video.url}-${index}`} className="col-12 col-md-6">
                          <div className="ratio ratio-16x9 rounded overflow-hidden">
                            <iframe
                              src={embedUrl}
                              title={`Highlight video ${index + 1}`}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}