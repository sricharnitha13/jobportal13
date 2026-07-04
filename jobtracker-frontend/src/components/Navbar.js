// import {
//   useEffect,
//   useState
// } from "react";

// function Navbar() {

//   // 🔔 NOTIFICATIONS

//   const [
//     notifications,
//     setNotifications
//   ] = useState([]);

//   // 🔽 DROPDOWN STATE

//   const [
//     openNotifications,
//     setOpenNotifications
//   ] = useState(false);

//   // 🔍 SEARCH

//   const [
//     search,
//     setSearch
//   ] = useState("");

//   // 🔥 FETCH NOTIFICATIONS

//   const fetchNotifications =
//     async () => {

//       try {

//         const token =
//           localStorage.getItem("token");

//         const res = await fetch(

//           "https://jobportal13.onrender.com/notifications",

//           {
//             headers: {
//               Authorization:
//                 "Bearer " + token
//             }
//           }
//         );

//         if (!res.ok) {

//           throw new Error(
//             "Failed to fetch notifications"
//           );
//         }

//         const data =
//           await res.json();

//         setNotifications(

//           data.map((n) => ({
//             ...n,
//             clicked: false
//           }))
//         );

//       } catch (err) {

//         console.log(
//           "Notification Error:",
//           err
//         );
//       }
//     };

//   // 🔄 LOAD

//   useEffect(() => {

//     fetchNotifications();

//   }, []);

//   // 🔴 UNREAD COUNT

//   const unreadCount =
//     notifications.filter(
//       n => !n.clicked
//     ).length;

//   // ✅ MARK AS READ

//   const markAsRead =
//     (id) => {

//       setNotifications((prev) =>

//         prev.map((n) =>

//           n.id === id
//             ? {
//                 ...n,
//                 clicked: true
//               }
//             : n
//         )
//       );
//     };

//   return (

//     <div
//       className="
//         bg-white
//         shadow-sm
//         rounded-4
//         px-4
//         py-3
//         mb-4
//         d-flex
//         justify-content-between
//         align-items-center
//         position-relative
//       "
//     >

//       {/* 🔍 SEARCH */}

//       <div
//         className="
//           d-flex
//           align-items-center
//           gap-3
//         "
//       >

//         <input

//           type="text"

//           className="
//             form-control
//             shadow-sm
//             border-0
//           "

//           placeholder="
//             Search jobs, companies...
//           "

//           value={search}

//           onChange={(e) =>
//             setSearch(e.target.value)
//           }

//           style={{
//             width: "360px",
//             borderRadius: "14px",
//             height: "46px"
//           }}
//         />

//       </div>

//       {/* RIGHT */}

//       <div
//         className="
//           d-flex
//           align-items-center
//           gap-4
//         "
//       >

//         {/* 🔔 BELL */}

//         <div
//           className="position-relative"
//         >

//           <button

//             onClick={() =>
//               setOpenNotifications(
//                 !openNotifications
//               )
//             }

//             className="
//               btn
//               btn-light
//               position-relative
//               border-0
//               shadow-sm
//             "

//             style={{
//               width: "50px",
//               height: "50px",
//               borderRadius: "16px",
//               fontSize: "20px"
//             }}
//           >

//             🔔

//             {/* 🔴 BADGE */}

//             {unreadCount > 0 && (

//               <span
//                 className="
//                   position-absolute
//                   top-0
//                   start-100
//                   translate-middle
//                   badge
//                   rounded-pill
//                   bg-danger
//                 "
//               >

//                 {unreadCount}

//               </span>
//             )}

//           </button>

//           {/* 🔽 DROPDOWN */}

//           {openNotifications && (

//             <div

//               className="
//                 position-absolute
//                 end-0
//                 mt-3
//                 bg-white
//                 shadow-lg
//                 p-2
//               "

//               style={{
//                 width: "360px",
//                 borderRadius: "20px",
//                 maxHeight: "450px",
//                 overflowY: "auto",
//                 zIndex: 1000
//               }}
//             >

//               {/* HEADER */}

//               <div
//                 className="
//                   fw-bold
//                   px-3
//                   py-2
//                   border-bottom
//                   mb-2
//                 "
//               >

//                 Notifications

//               </div>

//               {/* EMPTY */}

//               {notifications.length === 0 ? (

//                 <div
//                   className="
//                     p-4
//                     text-center
//                     text-muted
//                   "
//                 >

//                   No notifications

//                 </div>

//               ) : (

//                 notifications.map((n) => (

//                   <div

//                     key={n.id}

//                     onClick={() =>
//                       markAsRead(n.id)
//                     }

//                     className="
//                       p-3
//                       mb-2
//                       rounded-4
//                     "

//                     style={{
//                       backgroundColor:
//                         n.clicked
//                           ? "#ffffff"
//                           : "#f8f9fa",

//                       cursor: "pointer",

//                       transition:
//                         "0.2s ease"
//                     }}
//                   >

//                     {/* MESSAGE */}

//                     <div
//                       className="
//                         fw-semibold
//                         small
//                         mb-1
//                       "
//                     >

//                       {n.message}

//                     </div>

//                     {/* TIME */}

//                     <small
//                       className="
//                         text-muted
//                       "
//                     >

//                       {new Date(
//                         n.createdAt
//                       ).toLocaleString()}

//                     </small>

//                   </div>
//                 ))
//               )}

//             </div>
//           )}

//         </div>

//         {/* 👤 PROFILE */}

//         <div
//           className="
//             d-flex
//             align-items-center
//             gap-2
//           "
//         >

//           <img

//             src="https://i.pravatar.cc/100"

//             alt="profile"

//             className="shadow-sm"

//             style={{
//               width: "46px",
//               height: "46px",
//               borderRadius: "50%",
//               objectFit: "cover",
//               cursor: "pointer"
//             }}
//           />

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Navbar;

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Navbar() {
  // 🔔 NOTIFICATIONS
  const [notifications, setNotifications] = useState([]);
  // 🔽 DROPDOWN STATE
  const [openNotifications, setOpenNotifications] = useState(false);

  // 🔍 SEARCH
  const [search, setSearch] = useState("");

  // 🔥 FETCH NOTIFICATIONS
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://jobportal13.onrender.com/notifications", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await res.json();
      setNotifications(data); // use backend's `read` field directly
    } catch (err) {
      console.log("Notification Error:", err);
    }
  };

  // 🔄 LOAD
  useEffect(() => {
    fetchNotifications();
  }, []);

  // 🔴 UNREAD COUNT
  const unreadCount = notifications.filter((n) => !n.read).length;

  // ✅ MARK AS READ
  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`https://jobportal13.onrender.com/notifications/read/${id}`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      // Update local state after backend confirms
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="
        bg-white shadow-sm rounded-4 px-4 py-3 mb-4
        d-flex justify-content-between align-items-center position-relative
      "
    >
      {/* 🔍 SEARCH */}
      <div className="d-flex align-items-center gap-3">
        <input
          type="text"
          className="form-control shadow-sm border-0"
          placeholder="Search jobs, companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "360px",
            borderRadius: "14px",
            height: "46px",
          }}
        />
      </div>

      {/* RIGHT */}
      <div className="d-flex align-items-center gap-4">
        {/* 🔔 BELL */}
        <div className="position-relative">
          <button
            onClick={() => setOpenNotifications(!openNotifications)}
            className="btn btn-light position-relative border-0 shadow-sm"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "16px",
              fontSize: "20px",
            }}
          >
            🔔
            {/* 🔴 BADGE */}
            {unreadCount > 0 && (
              <span
                className="
                  position-absolute top-0 start-100 translate-middle
                  badge rounded-pill bg-danger
                "
              >
                {unreadCount}
              </span>
            )}
          </button>

          {/* 🔽 DROPDOWN */}
          {openNotifications && (
            <div
              className="
                position-absolute end-0 mt-3 bg-white shadow-lg p-2
              "
              style={{
                width: "360px",
                borderRadius: "20px",
                maxHeight: "450px",
                overflowY: "auto",
                zIndex: 1000,
              }}
            >
              {/* HEADER */}
              <div
                className="
                  fw-bold px-3 py-2 border-bottom mb-2
                "
              >
                Notifications
              </div>

              {/* EMPTY */}
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted">
                  No notifications
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className="p-3 mb-2 rounded-4"
                    style={{
                      backgroundColor: n.read ? "#ffffff" : "#f8f9fa",
                      cursor: "pointer",
                      transition: "0.2s ease",
                    }}
                  >
                    {/* MESSAGE */}
                    <div className="fw-semibold small mb-1">{n.message}</div>
                    {/* TIME */}
                    <small className="text-muted">
                      {new Date(n.createdAt).toLocaleString()}
                    </small>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* 👤 PROFILE */}
        <div className="d-flex align-items-center gap-2">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="shadow-sm"
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Navbar;
