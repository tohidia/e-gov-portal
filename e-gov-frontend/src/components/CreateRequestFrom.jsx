

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function CreateRequestForm({ users, services, formData, setFormData }) {
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "documents") {
//       setFormData({ ...formData, documents: Array.from(files).map(f => f.name) });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Please login first!");
//       navigate("/login");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:3000/api/requests", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Failed to create request");

//       toast.success("Request created successfully!");
//       setFormData({ user_id: "", service_id: "", documents: [], fee: "" }); // ریست فرم
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white shadow rounded">
//       <div className="mb-4">
//         <label>Citizen</label>
//         <select name="user_id" value={formData.user_id} onChange={handleChange} required>
//           <option value="">Select Citizen</option>
//           {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
//         </select>
//       </div>

//       <div className="mb-4">
//         <label>Service</label>
//         <select name="service_id" value={formData.service_id} onChange={handleChange} required>
//           <option value="">Select Service</option>
//           {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
//         </select>
//       </div>

//       <div className="mb-4">
//         <label>Documents</label>
//         <input type="file" name="documents" multiple onChange={handleChange} />
//       </div>

//       <div className="mb-4">
//         <label>Fee</label>
//         <input type="number" name="fee" value={formData.fee} onChange={handleChange} required />
//       </div>

//       <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
//         Create Request
//       </button>
//     </form>
//   );
// }


import { useState } from "react";

export default function CreateRequestForm({ users, services }) {
  const [formData, setFormData] = useState({
    user_id: "",
    service_id: "",
    documents: [],
    fee: 0,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "documents") {
      setFormData({ ...formData, documents: Array.from(files).map(f => f.name) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first!");

    try {
      const res = await fetch("http://localhost:3000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create request");

      alert("Request created successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white shadow rounded">
      <div className="mb-4">
        <label>Citizen</label>
        <select name="user_id" value={formData.user_id} onChange={handleChange} required>
          <option value="">Select Citizen</option>
          {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
      </div>

      <div className="mb-4">
        <label>Service</label>
        <select name="service_id" value={formData.service_id} onChange={handleChange} required>
          <option value="">Select Service</option>
          {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>

      <div className="mb-4">
        <label>Documents</label>
        <input type="file" name="documents" multiple onChange={handleChange} />
      </div>

      <div className="mb-4">
        <label>Fee</label>
        <input type="number" name="fee" value={formData.fee} onChange={handleChange} required />
      </div>

      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
        Create Request
      </button>
    </form>
  );
}
