// /* eslint-disable no-unused-vars */
// /* eslint-disable react-hooks/exhaustive-deps */
// import {

//   useEffect,
//   useState

// } from "react";

// function ManageUsers() {

//   const token =
//     localStorage.getItem("token");

//   const [users, setUsers] =
//     useState([]);

//   useEffect(() => {

//     fetchUsers();

//   }, [fetchUsers]);

//   const fetchUsers =
//     async () => {

//       try {

//         const res = await fetch(

//           "https://jobportal13.onrender.com/admin/users",

//           {
//             headers: {
//               Authorization:
//                 "Bearer " + token
//             }
//           }
//         );

//         const data =
//           await res.json();

//         setUsers(data);

//       } catch {

//         alert(
//           "Failed to load users"
//         );
//       }
//     };

//   return (

//     <div className="
//       container
//       py-4
//     ">

//       <div
//         className="
//           bg-white
//           shadow-sm
//           p-4
//         "
//         style={{
//           borderRadius: "24px"
//         }}
//       >

//         <h2 className="
//           fw-bold
//           mb-4
//         ">
//           Manage Users
//         </h2>

//         <div className="
//           table-responsive
//         ">

//           <table className="
//             table
//             align-middle
//           ">

//             <thead>

//               <tr>

//                 <th>ID</th>

//                 <th>Username</th>

//                 <th>Email</th>

//                 <th>Role</th>

//               </tr>

//             </thead>

//             <tbody>

//               {users.map(user => (

//                 <tr key={user.id}>

//                   <td>
//                     {user.id}
//                   </td>

//                   <td>
//                     {user.username}
//                   </td>

//                   <td>
//                     {user.email}
//                   </td>

//                   <td>

//                     <span
//                       className={

//                         user.role ===
//                         "ADMIN"

//                         ? "badge bg-dark"

//                         : "badge bg-primary"
//                       }
//                     >

//                       {user.role}

//                     </span>

//                   </td>

//                 </tr>

//               ))}

//             </tbody>

//           </table>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default ManageUsers;

import { useEffect, useState, useCallback } from "react";

function ManageUsers() {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("https://jobportal13.onrender.com/admin/users", {
        headers: { Authorization: "Bearer " + token }
      });
      const data = await res.json();
      setUsers(data);
    } catch {
      alert("Failed to load users");
    }
  }, [token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="container py-4">
      <div className="bg-white shadow-sm p-4" style={{ borderRadius: "24px" }}>
        <h2 className="fw-bold mb-4">Manage Users</h2>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={user.role === "ADMIN" ? "badge bg-dark" : "badge bg-primary"}>
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;