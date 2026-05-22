function StatsCards({ stats }) {

  const cards = [

    {
      title: "Applied",
      value: stats.applied,
      color: "#3b82f6"
    },

    {
      title: "In Review",
      value: stats.inReview,
      color: "#f59e0b"
    },

    {
      title: "Interviews",
      value: stats.interviews,
      color: "#10b981"
    },

    {
      title: "Selected",
      value: stats.selected,
      color: "#8b5cf6"
    }

  ];

  return (

    <div className="row g-3">

      {cards.map((card, index) => (

        <div
          className="col-md-3"
          key={index}
        >

          <div
            className="
              card
              border-0
              shadow-sm
              p-4
              h-100
            "
            style={{
              borderRadius: "20px"
            }}
          >

            <div className="
              d-flex
              justify-content-between
              align-items-center
            ">

              <div>

                <small className="text-muted">

                  {card.title}

                </small>

                <h3 className="fw-bold mt-2">

                  {card.value}

                </h3>

              </div>

              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: card.color
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