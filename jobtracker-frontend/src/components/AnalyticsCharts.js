// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// // ✅ Props received from Dashboard:
// //   stats                 → { APPLIED, IN_REVIEW, INTERVIEW, SELECTED, REJECTED }
// //   applicationsByCompany → [{ company, count }, ...]
// //   totalJobs             → number
// //   totalApplications     → number
// //   totalCompanies        → number

// const STATUS_COLORS = {
//   APPLIED: "#4361ee",
//   IN_REVIEW: "#f8961e",
//   INTERVIEW: "#4cc9f0",
//   SELECTED: "#2dc653",
//   REJECTED: "#e63946",
// };

// function AnalyticsCharts({
//   stats = {},
//   applicationsByCompany = [],
//   totalJobs = 0,
//   totalApplications = 0,
//   totalCompanies = 0,
// }) {
//   // Build pie chart data from status counts
//   const pieData = Object.entries(stats)
//     .filter(([, value]) => value > 0) // hide zero-count statuses
//     .map(([name, value]) => ({ name, value }));

//   // Bar chart data — top 8 companies by application count
//   const barData = [...applicationsByCompany]
//     .sort((a, b) => b.count - a.count)
//     .slice(0, 8);

//   const hasData = totalApplications > 0;

//   return (
//     <div className="mb-4">
//       <div className="row">

//         {/* ── PIE CHART: Application Status Breakdown ── */}
//         <div className="col-lg-5 mb-4">
//           <div
//             className="bg-white shadow-sm p-4 h-100"
//             style={{ borderRadius: "24px" }}
//           >
//             <h5 className="fw-bold mb-1">Application Status</h5>
//             <p className="text-muted small mb-3">Breakdown by current status</p>

//             {!hasData ? (
//               <div className="d-flex align-items-center justify-content-center" style={{ height: 260 }}>
//                 <p className="text-muted">No application data yet</p>
//               </div>
//             ) : (
//               <ResponsiveContainer width="100%" height={260}>
//                 <PieChart>
//                   <Pie
//                     data={pieData}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={60}
//                     outerRadius={100}
//                     paddingAngle={3}
//                     dataKey="value"
//                     label={({ name, percent }) =>
//                       `${name} ${(percent * 100).toFixed(0)}%`
//                     }
//                     labelLine={false}
//                   >
//                     {pieData.map((entry) => (
//                       <Cell
//                         key={entry.name}
//                         fill={STATUS_COLORS[entry.name] || "#adb5bd"}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     formatter={(value, name) => [value, name]}
//                     contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
//                   />
//                   <Legend
//                     iconType="circle"
//                     iconSize={10}
//                     formatter={(value) => (
//                       <span style={{ fontSize: "12px", color: "#495057" }}>{value}</span>
//                     )}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             )}
//           </div>
//         </div>

//         {/* ── BAR CHART: Applications by Company ── */}
//         <div className="col-lg-7 mb-4">
//           <div
//             className="bg-white shadow-sm p-4 h-100"
//             style={{ borderRadius: "24px" }}
//           >
//             <h5 className="fw-bold mb-1">Applications by Company</h5>
//             <p className="text-muted small mb-3">Top companies by application count</p>

//             {barData.length === 0 ? (
//               <div className="d-flex align-items-center justify-content-center" style={{ height: 260 }}>
//                 <p className="text-muted">No application data yet</p>
//               </div>
//             ) : (
//               <ResponsiveContainer width="100%" height={260}>
//                 <BarChart
//                   data={barData}
//                   margin={{ top: 5, right: 10, left: -10, bottom: 40 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                   <XAxis
//                     dataKey="company"
//                     tick={{ fontSize: 11, fill: "#6c757d" }}
//                     angle={-35}
//                     textAnchor="end"
//                     interval={0}
//                   />
//                   <YAxis
//                     tick={{ fontSize: 11, fill: "#6c757d" }}
//                     allowDecimals={false}
//                   />
//                   <Tooltip
//                     formatter={(value) => [value, "Applications"]}
//                     contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
//                   />
//                   <Bar dataKey="count" fill="#4361ee" radius={[6, 6, 0, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             )}
//           </div>
//         </div>

//       </div>

//       {/* ── SUMMARY STRIP ── */}
//       <div className="row mb-2">
//         {[
//           { label: "Total Jobs", value: totalJobs, icon: "💼" },
//           { label: "Total Applications", value: totalApplications, icon: "📄" },
//           { label: "Selected", value: stats.SELECTED || 0, icon: "✅" },
//           { label: "Interviews Scheduled", value: stats.INTERVIEW || 0, icon: "📅" },
//         ].map((item) => (
//           <div key={item.label} className="col-6 col-md-3 mb-3">
//             <div
//               className="bg-white shadow-sm p-3 text-center"
//               style={{ borderRadius: "20px" }}
//             >
//               <div style={{ fontSize: "28px" }}>{item.icon}</div>
//               <h4 className="fw-bold mb-0 mt-1">{item.value}</h4>
//               <p className="text-muted small mb-0">{item.label}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default AnalyticsCharts;
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const STATUS_COLORS = {
  APPLIED: "#4361ee",
  IN_REVIEW: "#f8961e",
  INTERVIEW: "#4cc9f0",
  SELECTED: "#2dc653",
  REJECTED: "#e63946",
};

// Custom label rendered OUTSIDE the donut — avoids overlap
const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, percent, name }) => {
  if (percent < 0.05) return null; // skip tiny slices
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 28;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill={STATUS_COLORS[name] || "#6c757d"}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={11}
      fontWeight="600"
    >
      {`${name.replace("_", " ")} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function AnalyticsCharts({
  stats = {},
  applicationsByCompany = [],
  totalJobs = 0,
  totalApplications = 0,
  totalCompanies = 0,
}) {
  // Pie data from status counts
  const pieData = Object.entries(stats)
    .filter(([, value]) => value > 0)
    .map(([name, value]) => ({ name, value }));

  // ✅ FIX: filter out "Unknown" and sort top 8
  const barData = [...applicationsByCompany]
    .filter((item) => item.company && item.company !== "Unknown")
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const hasData = totalApplications > 0;

  return (
    <div className="mb-4">
      <div className="row">

        {/* PIE CHART */}
        <div className="col-lg-5 mb-4">
          <div className="bg-white shadow-sm p-4 h-100" style={{ borderRadius: "24px" }}>
            <h5 className="fw-bold mb-1">Application Status</h5>
            <p className="text-muted small mb-3">Breakdown by current status</p>

            {!hasData ? (
              <div className="d-flex align-items-center justify-content-center" style={{ height: 300 }}>
                <p className="text-muted">No application data yet</p>
              </div>
            ) : (
              // ✅ FIX: increased height so labels don't get clipped
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}   // ✅ smaller outerRadius = more room for labels
                    paddingAngle={3}
                    dataKey="value"
                    labelLine={true}
                    label={renderCustomLabel}  // ✅ custom label, no overlap
                  >
                    {pieData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={STATUS_COLORS[entry.name] || "#adb5bd"}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [value, name.replace("_", " ")]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={9}
                    formatter={(value) => (
                      <span style={{ fontSize: "12px", color: "#495057" }}>
                        {value.replace("_", " ")}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* BAR CHART */}
        <div className="col-lg-7 mb-4">
          <div className="bg-white shadow-sm p-4 h-100" style={{ borderRadius: "24px" }}>
            <h5 className="fw-bold mb-1">Applications by Company</h5>
            <p className="text-muted small mb-3">Top companies by application count</p>

            {barData.length === 0 ? (
              <div
                className="d-flex flex-column align-items-center justify-content-center"
                style={{ height: 300 }}
              >
                <p className="text-muted mb-1">No company data found</p>
                {/* ✅ Debug hint — remove after fixing backend */}
                <p className="text-muted small">
                  Check: does your application object have a <code>company</code> field?
                  <br />
                  It may be <code>app.job.company</code> or <code>app.companyName</code> in your API response.
                </p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={barData}
                  margin={{ top: 5, right: 10, left: -10, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="company"
                    tick={{ fontSize: 11, fill: "#6c757d" }}
                    angle={-35}
                    textAnchor="end"
                    interval={0}
                  />
                  <YAxis tick={{ fontSize: 11, fill: "#6c757d" }} allowDecimals={false} />
                  <Tooltip
                    formatter={(value) => [value, "Applications"]}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey="count" fill="#4361ee" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* SUMMARY STRIP */}
      <div className="row mb-2">
        {[
          { label: "Total Jobs", value: totalJobs, icon: "💼" },
          { label: "Total Applications", value: totalApplications, icon: "📄" },
          { label: "Selected", value: stats.SELECTED || 0, icon: "✅" },
          { label: "Interviews Scheduled", value: stats.INTERVIEW || 0, icon: "📅" },
        ].map((item) => (
          <div key={item.label} className="col-6 col-md-3 mb-3">
            <div className="bg-white shadow-sm p-3 text-center" style={{ borderRadius: "20px" }}>
              <div style={{ fontSize: "28px" }}>{item.icon}</div>
              <h4 className="fw-bold mb-0 mt-1">{item.value}</h4>
              <p className="text-muted small mb-0">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnalyticsCharts;
