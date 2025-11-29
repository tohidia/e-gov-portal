// document.addEventListener("DOMContentLoaded", ()=>{
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   let url = "http://localhost:3000/api/requests/my-requests"; // Citizen
//   if(role==="admin") url="http://localhost:3000/api/requests"; // Admin

//   fetch(url,{
//     method:"GET",
//     headers:{
//       "Content-Type":"application/json",
//       Authorization:`Bearer ${token}`
//     }
//   })
//   .then(res=>res.json())
//   .then(data=>console.log("Requests:",data))
//   .catch(err=>console.error(err));
// });



document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  fetch("http://localhost:3000/api/requests", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => console.log("Requests:", data))
    .catch(err => console.error(err));
});
