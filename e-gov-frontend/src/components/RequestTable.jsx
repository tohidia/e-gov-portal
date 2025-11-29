export default function RequestTable({ requests }) {
  return (
    <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-indigo-600 text-white">
        <tr>
          <th className="p-3">ID</th>
          <th className="p-3">Citizen</th>
          <th className="p-3">Service</th>
          <th className="p-3">Department</th>
          <th className="p-3">Fee</th>
          <th className="p-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {requests.map(r => (
          <tr key={r.id} className="border-b hover:bg-gray-100">
            <td className="p-3">{r.id}</td>
            <td className="p-3">{r.citizen_name}</td>
            <td className="p-3">{r.service_name}</td>
            <td className="p-3">{r.department_name}</td>
            <td className="p-3">${r.fee}</td>
            <td className="p-3">{r.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
