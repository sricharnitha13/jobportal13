import {
  useState,
  useEffect
} from "react";

import {
  useNavigate
} from "react-router-dom";

function Profile() {
   const token =
    localStorage.getItem("token");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");   
  const [skills, setSkills] = useState([
    "React",
    "Java",
    "TypeScript"
  ]);

  const [skillInput, setSkillInput] = useState("");

  const [selectedInterests, setSelectedInterests] = useState([
    "Frontend",
    "Open Source"
  ]);

  const interests = [
    "Frontend",
    "Open Source",
    "Machine Learning",
    "DevOps",
    "Product Design",
    "Mobile Apps",
    "Startups",
    "Cloud",
    "Web3",
    "Fintech"
  ];
  const [resume, setResume] =
  useState(null);
     // 🔥 LOAD USER

  useEffect(() => {

    if (token) {

      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      setUsername(payload.sub);

      setEmail(
        payload.sub + "@gmail.com"
      );
    }
        // 🔥 LOAD SAVED SKILLS

    const savedSkills =
      localStorage.getItem("skills");

    if (savedSkills) {

      setSkills(
        JSON.parse(savedSkills)
      );
    }

  }, [token]);
    // 🔥 PROFILE COMPLETION

  useEffect(() => {

    let completed = 0;

    if (username) completed += 20;

    if (skills.length > 0)
      completed += 20;

    if (
      selectedInterests.length > 0
    )
      completed += 20;

    completed += 20;

    completed += 20;

    setProfileCompletion(
      completed
    );

  }, [

    username,
    skills,
    selectedInterests

  ]);
  // 🔥 ADD SKILL

  const addSkill = (e) => {

    if (
      e.key === "Enter" ||
      e.key === ","
    ) {

      e.preventDefault();

      if (
        skillInput.trim() !== ""
      ) {

        setSkills([
          ...skills,
          skillInput.trim()
        ]);

        setSkillInput("");
      }
    }
  };

  // ❌ REMOVE SKILL

  const removeSkill = (skill) => {

    setSkills(
      skills.filter(
        s => s !== skill
      )
    );
  };

  // 🔥 TOGGLE INTEREST

  const toggleInterest = (interest) => {

    if (
      selectedInterests.includes(
        interest
      )
    ) {

      setSelectedInterests(
        selectedInterests.filter(
          i => i !== interest
        )
      );

    } else {

      setSelectedInterests([
        ...selectedInterests,
        interest
      ]);
    }
  };
  
  const [profileCompletion, setProfileCompletion] =
  useState(0);
  const navigate = useNavigate();
  
 const saveProfile = async () => {

  try {

    const token =
      localStorage.getItem("token");

    const formData =
      new FormData();

    // 🔥 PROFILE DATA

    formData.append(
      "bio",
      "Passionate developer"
    );

    formData.append(
      "skills",
      skills.join(", ")
    );

    formData.append(
      "interests",
      selectedInterests.join(", ")
    );

    formData.append(
      "preferredRole",
      "Full Stack Developer"
    );

    formData.append(
      "preferredLocation",
      "Hyderabad"
    );

    formData.append(
      "experience",
      "Fresher"
    );

    // 🔥 RESUME

    if (resume) {

      formData.append(
        "resume",
        resume
      );
    }

    // 🔥 API CALL

    const res = await fetch(

      "http://localhost:9090/profile",

      {
        method: "POST",

        headers: {
          Authorization:
            "Bearer " + token
        },

        body: formData
      }
    );

    const data =
      await res.text();

    alert(data);

    navigate("/dashboard");

  } catch (err) {

    console.log(err);

    alert(
      "Failed to save profile"
    );
  }
};
 // alert("Profile saved successfully");


  return (

    <div
      style={{
        background: "#121212",
        minHeight: "100vh",
        padding: "clamp(16px, 4vw, 40px)",
        color: "white"
      }}
    >

      {/* 🔥 HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">
          My profile
        </h2>

        <span className="text-primary">
         {profileCompletion}% complete
        </span>

      </div>

      {/* 🔥 PROFILE CARD */}

      <div
        className="border p-4 mb-4"
        style={{

  borderRadius: "28px",

  background: "#161b22",

  border:
    "1px solid rgba(255,255,255,0.08)"

}}
      >

        <div className="d-flex flex-column flex-md-row align-items-center gap-4">

          {/* AVATAR */}

          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background: "#e9e5ff",
              color: "#6d5dfc",
              fontSize: "36px",
              fontWeight: "bold"
            }}
          >
            {username.charAt(0).toUpperCase()}
          </div>

          {/* INFO */}

          <div className="flex-grow-1">

            <h2 className="fw-bold mb-1">
              {username}
            </h2>

            <p className="text-secondary mb-4">
               {email}
            </p>

            <div className="d-flex justify-content-between mb-2">

              <small>
                Profile strength
              </small>

              <small>
                65%
              </small>

            </div>

            <div
              style={{
                height: "8px",
                borderRadius: "20px",
                background: "#2d2d2d",
                overflow: "hidden"
              }}
            >

              <div
                style={{
                  width: "65%",
                  height: "100%",
                  background: "#6d5dfc"
                }}
              />

            </div>

          </div>

        </div>

      </div>

      {/* 🔥 ABOUT */}

      <div
        className=" p-4 mb-4"
        style={{
          borderRadius: "28px",
          borderColor: "#161b22",
          background: "1px solid rgba(255,255,255,0.08)"
        }}
      >

        <h5 className="fw-semibold text-uppercase mb-4">
          About
        </h5>

        <label className="mb-2">
          Bio
        </label>

        <textarea

  className="
    form-control
    bg-transparent
    text-white
    border-0
    shadow-none
  "

  rows="3"

  placeholder="
    Write a short bio about yourself...
  "

  style={{

    background: "#111827",

    borderRadius: "18px",

    padding: "18px",

    color: "white",

    resize: "none",

    border:
      "1px solid rgba(255,255,255,0.08)"

  }}
/>

      </div>

      {/* 🔥 SKILLS */}

      <div
        className="border p-4 mb-4"
        style={{
          borderRadius: "24px",
          borderColor: "#2a2a2a",
          background: "#1b1b1b"
        }}
      >

        <h5 className="fw-semibold text-uppercase mb-4">
          Skills
        </h5>

        <p className="text-secondary">
          Add your skills — press Enter or comma to add
        </p>

        <div
          className="d-flex flex-wrap gap-2 align-items-center border border-secondary p-3"
          style={{
            borderRadius: "16px"
          }}
        >

          {skills.map((skill, index) => (

            <div
              key={index}
              className="px-3 py-2"
              style={{
                borderRadius: "999px",
                background: "#e9e5ff",
                color: "#6d5dfc",
                fontWeight: "500"
              }}
            >

              {skill}

              <span
                style={{
                  marginLeft: "8px",
                  cursor: "pointer"
                }}
                onClick={() =>
                  removeSkill(skill)
                }
              >
                ×
              </span>

            </div>
          ))}

          <input
            type="text"
            value={skillInput}
            onChange={(e) =>
              setSkillInput(e.target.value)
            }
            onKeyDown={addSkill}
            className="bg-transparent border-0 text-white flex-grow-1"
            placeholder="e.g. Node.js, Python..."
            style={{
              outline: "none"
            }}
          />

        </div>

      </div>

      {/* 🔥 PREFERENCES */}

      <div
        className="border p-4 mb-4"
        style={{
          borderRadius: "24px",
          borderColor: "#2a2a2a",
          background: "#1b1b1b"
        }}
      >

        <h5 className=" fw-semibold text-uppercase mb-4">
          Preferences
        </h5>

        <div className="row">

          <div className="col-md-6 mb-4">

            <label className="mb-2">
              Preferred role
            </label>

            <select
              className="form-select bg-dark text-white border-secondary"
              style={{
                borderRadius: "14px"
              }}
            >
              <option>Select a role</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Full Stack Developer</option>
            </select>

          </div>

          <div className="col-md-6 mb-4">

            <label className="mb-2">
              Preferred location
            </label>

            <select
              className="form-select bg-dark text-white border-secondary"
              style={{
                borderRadius: "14px"
              }}
            >
              <option>Select a location</option>
              <option>Hyderabad</option>
              <option>Bangalore</option>
              <option>Pune</option>
            </select>

          </div>

          <div className="col-md-6 mb-4">

            <label className="mb-2">
              Years of experience
            </label>

            <select
              className="form-select bg-dark text-white border-secondary"
              style={{
                borderRadius: "14px"
              }}
            >
              <option>Select experience</option>
              <option>Fresher</option>
              <option>1-2 Years</option>
              <option>3-5 Years</option>
            </select>

          </div>

          <div className="col-md-6 mb-4">

            <label className="mb-2">
              Employment type
            </label>

            <select
              className="form-select bg-dark text-white border-secondary"
              style={{
                borderRadius: "14px"
              }}
            >
              <option>Select type</option>
              <option>Full Time</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>

          </div>

        </div>

      </div>

      {/* 🔥 INTERESTS */}

    <div
  className="p-4 mb-4"
  style={{

    borderRadius: "28px",

    background: "#161b22",

    border:
      "1px solid rgba(255,255,255,0.08)"

  }}
>

  <h5 className="fw-semibold text-uppercase mb-4">
    Interests
  </h5>

  <div className="d-flex flex-wrap gap-3">

    {interests.map(
      (interest, index) => (

        <button

          key={index}

          onClick={() =>
            toggleInterest(
              interest
            )
          }

          className="btn"

          style={{

            borderRadius: "999px",

            padding: "8px 18px",

            border:

              selectedInterests.includes(
                interest
              )

                ? "none"

                : "1px solid rgba(255,255,255,0.15)",

            background:

              selectedInterests.includes(
                interest
              )

                ? "#e9e5ff"

                : "transparent",

            color:

              selectedInterests.includes(
                interest
              )

                ? "#6d5dfc"

                : "white",

            width: "auto",

            fontSize: "14px",

            fontWeight: "500"

          }}
        >

          {interest}

        </button>
      )
    )}

  </div>

</div>

      {/* 🔥 RESUME */}

      <div
        className="border p-4 mb-4"
        style={{
          borderRadius: "24px",
          borderColor: "#2a2a2a",
          background: "#1b1b1b"
        }}
      >

        <h5 className="fw-semibold text-uppercase mb-4">
          Resume
        </h5>

        <div
          className="d-flex flex-column justify-content-center align-items-center border border-secondary"
          style={{
            height: "250px",
            borderRadius: "20px",
            borderStyle: "dashed",
            
          }}
          onClick={() =>
  document
    .getElementById("resumeUpload")
    .click()
}
        >

          <div
            style={{
              fontSize: "40px"
            }}
          >
            ⬆
          </div>

          <h4 className="mt-3">
            Drag your resume here
          </h4>

          <p className="text-secondary">
            or click to upload • PDF only • max 5 MB
            {resume && (

  <p className="text-success mt-2">

    {resume.name}

  </p>
)}
          </p>

         <input
  type="file"
  accept=".pdf"
  id="resumeUpload"
  hidden
  onChange={(e) =>
    setResume(e.target.files[0])
  }
/>

        </div>

      </div>

      {/* 🔥 ACTIONS */}

      <div className="d-flex justify-content-end gap-3">

        <button className="btn btn-outline-light px-4 py-2">
          Discard changes
        </button>

        <button className="btn btn-light px-4 py-2 fw-bold"
           onClick={saveProfile}
>        Save profile
        </button>

      </div>

    </div>
  );
}

export default Profile;
