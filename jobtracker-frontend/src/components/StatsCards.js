function StatsCards() {

  const stats = [

    {
      title: "Applied",
      value: 12,
      color: "#3b82f6"
    },

    {
      title: "In Review",
      value: 5,
      color: "#f59e0b"
    },

    {
      title: "Interviews",
      value: 2,
      color: "#10b981"
    },

    {
      title: "Saved",
      value: 8,
      color: "#8b5cf6"
    }

  ];

  return (

    <div className="row g-3">

      {stats.map((stat, index) => (

        <div
          className="col-md-3"
          key={index}
        >

          <div
            className="card border-0 shadow-sm p-4"
            style={{
              borderRadius: "20px"
            }}
          >

            <div className="d-flex justify-content-between align-items-center">

              <div>

                <small className="text-muted">
                  {stat.title}
                </small>

                <h3 className="fw-bold mt-2">
                  {stat.value}
                </h3>

              </div>

              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: stat.color
                }}
              />

            </div>

          </div>

        </div>
      ))}

    </div>
  );
}

export default StatsCards;