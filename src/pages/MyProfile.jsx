import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaFacebook,
  FaTiktok,
  FaGlobe,
  FaXTwitter,
} from "react-icons/fa6";

function joinComma(arr) {
  return (arr || []).join(", ");
}

function splitComma(text) {
  return (text || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function isValidYouTubeUrl(url) {
  if (!url) return false;

  try {
    const parsed = new URL(url);
    return (
      parsed.hostname.includes("youtube.com") ||
      parsed.hostname.includes("youtu.be")
    );
  } catch {
    return false;
  }
}

function isValidUrl(url) {
  if (!url) return false;

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

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

const POSITION_OPTIONS = [
  "Point Guard",
  "Shooting Guard",
  "Small Forward",
  "Power Forward",
  "Center",
];

const EXPERIENCE_OPTIONS = Array.from({ length: 21 }, (_, i) => String(i));

const AGE_OPTIONS = Array.from({ length: 43 }, (_, i) => String(i + 13));

const HEIGHT_OPTIONS = [
  `4'8"`,
  `4'9"`,
  `4'10"`,
  `4'11"`,
  `5'0"`,
  `5'1"`,
  `5'2"`,
  `5'3"`,
  `5'4"`,
  `5'5"`,
  `5'6"`,
  `5'7"`,
  `5'8"`,
  `5'9"`,
  `5'10"`,
  `5'11"`,
  `6'0"`,
  `6'1"`,
  `6'2"`,
  `6'3"`,
  `6'4"`,
  `6'5"`,
  `6'6"`,
  `6'7"`,
  `6'8"`,
  `6'9"`,
  `6'10"`,
  `6'11"`,
  `7'0"`,
  `7'1"`,
  `7'2"`,
];

export default function MyProfile() {
  const nav = useNavigate();
  const { currentProfile, updateMyProfile, signOut, deleteMyAccount } = useAuth();

  const [draft, setDraft] = useState(null);
  const [videoInput, setVideoInput] = useState("");
  const [socialInput, setSocialInput] = useState("");
  const [socialPlatform, setSocialPlatform] = useState("instagram");

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteText, setDeleteText] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (!currentProfile) return;

    setDraft({
      ...currentProfile,
      age: currentProfile.age || "",
      height: currentProfile.height || "",
      location: currentProfile.location || "",
      resume: currentProfile.resume || "",
      yearsExperience: currentProfile.yearsExperience || "",
      positions: currentProfile.positions || "",
      awardsText: joinComma(currentProfile.awards),
      socialLinks: normalizeSocialLinks(currentProfile.socialLinks),
      ageConfirmed: !!currentProfile.ageConfirmed,
      videoHighlights: currentProfile.videoHighlights || [],
      followersCount: currentProfile.followersCount || 0,
      likesCount: currentProfile.likesCount || 0,
    });
  }, [currentProfile]);

  const isReady = !!currentProfile;

  function onPickAvatar(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () =>
      setDraft((prev) => ({
        ...prev,
        avatarUrl: reader.result,
      }));
    reader.readAsDataURL(file);
  }

  function addVideo() {
    const trimmed = videoInput.trim();
    if (!trimmed) return;

    if (!isValidYouTubeUrl(trimmed)) {
      alert("Please enter a valid YouTube link.");
      return;
    }

    const alreadyExists = (draft.videoHighlights || []).some(
      (video) => video.url === trimmed
    );

    if (alreadyExists) {
      alert("That video link has already been added.");
      return;
    }

    setDraft((prev) => ({
      ...prev,
      videoHighlights: [...(prev.videoHighlights || []), { url: trimmed }],
    }));

    setVideoInput("");
  }

  function removeVideo(indexToRemove) {
    setDraft((prev) => ({
      ...prev,
      videoHighlights: (prev.videoHighlights || []).filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  }

  function addSocialLink() {
    const trimmed = socialInput.trim();
    if (!trimmed) return;

    if (!isValidUrl(trimmed)) {
      alert("Please enter a valid URL.");
      return;
    }

    const alreadyExists = (draft.socialLinks || []).some(
      (link) => link.url === trimmed
    );

    if (alreadyExists) {
      alert("That social link has already been added.");
      return;
    }

    setDraft((prev) => ({
      ...prev,
      socialLinks: [
        ...(prev.socialLinks || []),
        { platform: socialPlatform, url: trimmed },
      ],
    }));

    setSocialInput("");
    setSocialPlatform("instagram");
  }

  function removeSocialLink(indexToRemove) {
    setDraft((prev) => ({
      ...prev,
      socialLinks: (prev.socialLinks || []).filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  }

  async function save() {
    try {
      await updateMyProfile({
        name: draft.name || "",
        role: draft.role || "Player",
        avatarUrl: draft.avatarUrl || null,
        age: draft.age || "",
        height: draft.height || "",
        location: draft.location || "",
        resume: draft.resume || "",
        yearsExperience: draft.yearsExperience || "",
        awards: splitComma(draft.awardsText || ""),
        socialLinks: draft.socialLinks || [],
        ageConfirmed: !!draft.ageConfirmed,
        videoHighlights: draft.videoHighlights || [],
        followersCount: draft.followersCount || 0,
        likesCount: draft.likesCount || 0,

        school: draft.role === "Player" ? draft.school || "" : "",
        positions: draft.role === "Player" ? draft.positions || "" : "",
        program: draft.role === "Coach" ? draft.program || "" : "",
      });

      nav(`/people/${currentProfile.id}`);
    } catch (error) {
      alert(error.message || "Failed to save profile.");
    }
  }

  async function handleDeleteAccount() {
    const trimmedPassword = deletePassword.trim();

    if (deleteText !== "DELETE") {
      alert('Please type DELETE to confirm.');
      return;
    }

    if (!trimmedPassword) {
      alert("Please enter your password to confirm account deletion.");
      return;
    }

    const confirmed = window.confirm(
      "Are you absolutely sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      setDeleteLoading(true);
      await deleteMyAccount(trimmedPassword);
      alert("Your account has been deleted.");
      nav("/");
    } catch (error) {
      alert(error.message || "Failed to delete account.");
    } finally {
      setDeleteLoading(false);
    }
  }

  if (!isReady) {
    return (
      <div className="container py-5">
        <h1 className="section-title">My Profile</h1>
        <div className="cl-card p-4">
          <p className="text-muted mb-3">You’re not signed in.</p>
          <Link className="btn btn-primary" to="/auth">
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (!draft) return null;

  return (
    <div className="bg-cl-page">
      <div className="container py-5" style={{ maxWidth: 860 }}>
        <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap mb-3">
          <h1 className="section-title mb-0">My Profile</h1>

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                signOut();
                nav("/");
              }}
            >
              Sign Out
            </button>

            <Link className="btn btn-outline-primary" to={`/people/${currentProfile.id}`}>
              View Public Profile
            </Link>
          </div>
        </div>

        <div className="cl-card p-4">
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label fw-bold">Profile photo</label>
              <input
                className="form-control"
                type="file"
                accept="image/*"
                onChange={(e) => onPickAvatar(e.target.files?.[0])}
              />
              {draft.avatarUrl && (
                <div className="mt-3">
                  <img
                    src={draft.avatarUrl}
                    alt="preview"
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: 999,
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </div>

            <div className="col-12">
              <label className="form-label fw-bold">Name</label>
              <input
                className="form-control form-control-lg"
                value={draft.name || ""}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold">Role</label>
              <select
                className="form-select form-select-lg"
                value={draft.role || "Player"}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, role: e.target.value }))
                }
              >
                <option value="Player">Player</option>
                <option value="Coach">Coach</option>
              </select>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold">Age</label>
              <select
                className="form-select form-select-lg"
                value={draft.age || ""}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, age: e.target.value }))
                }
              >
                <option value="">Select age</option>
                {AGE_OPTIONS.map((age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold">Height</label>
              <select
                className="form-select form-select-lg"
                value={draft.height || ""}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, height: e.target.value }))
                }
              >
                <option value="">Select height</option>
                {HEIGHT_OPTIONS.map((height) => (
                  <option key={height} value={height}>
                    {height}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold">Years of experience</label>
              <select
                className="form-select form-select-lg"
                value={draft.yearsExperience || ""}
                onChange={(e) =>
                  setDraft((prev) => ({
                    ...prev,
                    yearsExperience: e.target.value,
                  }))
                }
              >
                <option value="">Select years</option>
                {EXPERIENCE_OPTIONS.map((years) => (
                  <option key={years} value={years}>
                    {years}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold">Location (city/state)</label>
              <input
                className="form-control form-control-lg"
                placeholder="e.g. Fairfax, VA"
                value={draft.location || ""}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, location: e.target.value }))
                }
              />
            </div>

            {draft.role === "Player" ? (
              <>
                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">School</label>
                  <input
                    className="form-control form-control-lg"
                    value={draft.school || ""}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, school: e.target.value }))
                    }
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-bold">Position</label>
                  <select
                    className="form-select form-select-lg"
                    value={draft.positions || ""}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, positions: e.target.value }))
                    }
                  >
                    <option value="">Select position</option>
                    {POSITION_OPTIONS.map((position) => (
                      <option key={position} value={position}>
                        {position}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <div className="col-12">
                <label className="form-label fw-bold">Program</label>
                <input
                  className="form-control form-control-lg"
                  value={draft.program || ""}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, program: e.target.value }))
                  }
                />
              </div>
            )}

            <div className="col-12">
              <label className="form-label fw-bold">Resume / Bio</label>
              <textarea
                className="form-control"
                rows="5"
                value={draft.resume || ""}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, resume: e.target.value }))
                }
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-bold">
                Awards / accolades (comma-separated)
              </label>
              <input
                className="form-control form-control-lg"
                placeholder="All-Conference, MVP, State Champion"
                value={draft.awardsText || ""}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, awardsText: e.target.value }))
                }
              />
            </div>

            <div className="col-12 mt-3">
              <label className="form-label fw-bold">Social links</label>
              <div className="d-flex gap-2 flex-column flex-md-row">
                <select
                  className="form-select form-select-lg"
                  style={{ maxWidth: 220 }}
                  value={socialPlatform}
                  onChange={(e) => setSocialPlatform(e.target.value)}
                >
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="youtube">YouTube</option>
                  <option value="x">X / Twitter</option>
                  <option value="facebook">Facebook</option>
                  <option value="tiktok">TikTok</option>
                  <option value="website">Website</option>
                </select>

                <input
                  className="form-control form-control-lg"
                  placeholder="Paste social/profile link"
                  value={socialInput}
                  onChange={(e) => setSocialInput(e.target.value)}
                />

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={addSocialLink}
                >
                  Add Link
                </button>
              </div>
            </div>

            <div className="col-12">
              {(draft.socialLinks || []).length === 0 ? (
                <div className="text-muted">No social links added yet.</div>
              ) : (
                <div className="d-flex flex-column gap-2">
                  {draft.socialLinks.map((link, index) => (
                    <div
                      key={`${link.platform}-${link.url}-${index}`}
                      className="d-flex justify-content-between align-items-center gap-2 border rounded p-3"
                    >
                      <div
                        className="d-flex align-items-center gap-3"
                        style={{ minWidth: 0, flex: 1 }}
                      >
                        <div style={{ fontSize: 20 }}>
                          {getSocialIcon(link.platform)}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div className="fw-semibold">
                            {getSocialLabel(link.platform)}
                          </div>
                          <div
                            className="text-muted text-truncate"
                            style={{ maxWidth: "100%" }}
                            title={link.url}
                          >
                            {link.url}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeSocialLink(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="col-12 mt-3">
              <label className="form-label fw-bold">YouTube highlight links</label>
              <div className="d-flex gap-2 flex-column flex-md-row">
                <input
                  className="form-control form-control-lg"
                  placeholder="Paste YouTube link"
                  value={videoInput}
                  onChange={(e) => setVideoInput(e.target.value)}
                />
                <button type="button" className="btn btn-primary" onClick={addVideo}>
                  Add Video
                </button>
              </div>
              <div className="small text-muted mt-2">
                Supports youtube.com, youtu.be, and YouTube Shorts links.
              </div>
            </div>

            <div className="col-12">
              {(draft.videoHighlights || []).length === 0 ? (
                <div className="text-muted">No videos added yet.</div>
              ) : (
                <div className="d-flex flex-column gap-2">
                  {draft.videoHighlights.map((video, index) => (
                    <div
                      key={`${video.url}-${index}`}
                      className="d-flex justify-content-between align-items-center gap-2 border rounded p-3"
                    >
                      <div
                        className="text-truncate"
                        style={{ minWidth: 0, flex: 1 }}
                        title={video.url}
                      >
                        {video.url}
                      </div>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeVideo(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/*
            <div className="col-12">
              <div className="form-check">
                <input
                  id="ageConfirmed"
                  className="form-check-input"
                  type="checkbox"
                  checked={!!draft.ageConfirmed}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      ageConfirmed: e.target.checked,
                    }))
                  }
                />
                <label className="form-check-label fw-semibold" htmlFor="ageConfirmed">
                  I confirm I am 13 or older
                </label>
              </div>
            </div>
            */}
            <div className="col-12">
              <div className="small text-muted">
                Followers: {draft.followersCount || 0} • Likes: {draft.likesCount || 0}
              </div>
            </div>

            <div className="col-12 d-flex gap-2 mt-2">
              <button className="btn btn-primary btn-lg" onClick={save}>
                Save Changes
              </button>

              <Link className="btn btn-outline-primary btn-lg" to="/discover">
                Back to Discover
              </Link>
            </div>

            <div className="col-12 mt-4">
              <div className="border rounded p-4 bg-light">
                <h3 className="h5 text-danger mb-2">Danger Zone</h3>
                <p className="text-muted mb-3">
                  Deleting your account will permanently remove your profile and
                  sign-in access. This action cannot be undone.
                </p>

                {!showDeleteConfirm ? (
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Delete My Account
                  </button>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    <div>
                      <label className="form-label fw-bold text-danger">
                        Type DELETE to confirm
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={deleteText}
                        onChange={(e) => setDeleteText(e.target.value)}
                        placeholder="Type DELETE"
                      />
                    </div>

                    <div>
                      <label className="form-label fw-bold text-danger">
                        Enter your password to confirm
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        placeholder="Enter password"
                      />
                    </div>

                    <div className="d-flex gap-2 flex-wrap">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleDeleteAccount}
                        disabled={deleteLoading}
                      >
                        {deleteLoading ? "Deleting..." : "Permanently Delete Account"}
                      </button>

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => {
                          setShowDeleteConfirm(false);
                          setDeletePassword("");
                          setDeleteText("");
                        }}
                        disabled={deleteLoading}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}