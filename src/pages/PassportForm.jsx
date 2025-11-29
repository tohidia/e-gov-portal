import React, { useState, useEffect } from 'react';
import { createRequest, getRequests } from '../api/requestService';

const PassportForm = () => {
  const [citizenName, setCitizenName] = useState('');
  const [fee, setFee] = useState('');
  const [document, setDocument] = useState('');
  const [requests, setRequests] = useState([]);

  // 🟢 گرفتن همه درخواست‌ها از بک‌اند
  const fetchRequests = async () => {
    try {
      const data = await getRequests();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRequest = {
      user_id: 4,
      service_id: 9,
      documents: [document],
      fee: fee,
      status: 'Submitted',
    };

    try {
      await createRequest(newRequest);
      alert('Request submitted successfully!');
      fetchRequests(); // 🔁 بعد از ارسال، لیست را تازه کن
    } catch (error) {
      console.error('Error creating request:', error);
      alert('Failed to submit request.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">
        Passport Renewal Form
      </h2>

      {/* 🧾 فرم ثبت درخواست */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block mb-1 text-gray-700">Citizen Name</label>
          <input
            type="text"
            value={citizenName}
            onChange={(e) => setCitizenName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Fee</label>
          <input
            type="number"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="Enter service fee"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Document</label>
          <input
            type="text"
            value={document}
            onChange={(e) => setDocument(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2"
            placeholder="passport.pdf"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Submit Request
        </button>
      </form>

      {/* 🧩 نمایش لیست درخواست‌ها */}
      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Submitted Requests:</h3>
        <ul className="space-y-2">
          {requests.length > 0 ? (
            requests.map((req) => (
              <li key={req.id} className="border rounded-lg p-3">
                <p><strong>ID:</strong> {req.id}</p>
                <p><strong>Status:</strong> {req.status}</p>
                <p><strong>Fee:</strong> ${req.fee}</p>
                <p><strong>Documents:</strong> {req.documents.join(', ')}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No requests found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PassportForm;
