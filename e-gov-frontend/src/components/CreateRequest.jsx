import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CreateRequest() {
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [fee, setFee] = useState("");

  const API_URL = "http://localhost:3000/api";
  const token = localStorage.getItem("token");

  // Load services
  useEffect(() => {
    fetch(`${API_URL}/services`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load services");
        return res.json();
      })
      .then((data) => setServices(data))
      .catch(() => toast.error("❌ Failed to load services"));
  }, []);

  // Submit new request
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!serviceId || !documentName || !fee) {
      toast.error("⚠️ All fields are required");
      return;
    }

    if (!token) {
      toast.error("🚫 You must be logged in to send a request");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          service_id: serviceId,
          documents: [documentName],
          fee,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to submit request");
      }

      toast.success("✅ Request submitted successfully!");
      setServiceId("");
      setDocumentName("");
      setFee("");
    } catch (err) {
      toast.error(`❌ ${err.message}`);
      console.error("Request error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-2xl
          backdrop-blur-xl bg-white/40
          shadow-2xl rounded-3xl p-8
          border border-white/40
          animate-fadeIn flex flex-col gap-6
        "
      >
        <h2 className="text-3xl font-bold text-indigo-700 text-center drop-shadow-sm">
          Create New Request
        </h2>

        {/* Select Service */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-700 font-medium">Select Service</label>
          <select
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            className="
              p-3 rounded-xl border border-slate-300
              bg-white focus:ring-2 focus:ring-indigo-400
              shadow-sm transition
            "
          >
            <option value="">Select a Service</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Document Name */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-700 font-medium">Document Name</label>
          <input
            type="text"
            placeholder="e.g., passport.pdf"
            value={{ documentName }}
            onChange={(e) => setDocumentName(e.target.value)}
            className="
              p-3 rounded-xl border border-slate-300 bg-white
              focus:ring-2 focus:ring-indigo-400
              shadow-sm transition
            "
          />
        </div>

        {/* Fee */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-700 font-medium">Fee Amount</label>
          <input
            type="number"
            placeholder="Enter fee"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            className="
              p-3 rounded-xl border border-slate-300 bg-white
              focus:ring-2 focus:ring-indigo-400
              shadow-sm transition
            "
          />
        </div>

        <button
          type="submit"
          className="
            mt-4 py-3 text-white text-lg font-semibold
            bg-indigo-600 hover:bg-indigo-700
            rounded-full shadow-lg hover:shadow-xl
            transition transform hover:scale-[1.02]
          "
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
