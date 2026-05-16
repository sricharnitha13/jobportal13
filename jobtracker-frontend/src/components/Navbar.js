function Navbar() {

  return (

    <div
      className="bg-white shadow-sm rounded p-3 mb-4 d-flex justify-content-between align-items-center"
    >

      {/* SEARCH */}

      <input
        className="form-control"
        placeholder="Search jobs..."
        style={{
          width: "350px"
        }}
      />

      {/* RIGHT */}

      <div className="d-flex align-items-center gap-4">

        <div
          style={{
            fontSize: "22px",
            cursor: "pointer"
          }}
        >
          🔔
        </div>

        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%"
          }}
        />

      </div>

    </div>
  );
}

export default Navbar;