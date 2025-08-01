export default function TabUsers() {
  const users = [
    { name: "Alice Johnson", email: "alice@example.com", status: "Active" },
    { name: "Bob Smith", email: "bob@example.com", status: "Active" },
    { name: "Carol Williams", email: "carol@example.com", status: "Inactive" },
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">User Management</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={index}>
                <td className="px-4 py-2 text-sm text-gray-900">{user.name}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{user.email}</td>
                <td className="px-4 py-2">
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    user.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-gray-600 mt-4">
        👥 This users tab was dynamically loaded! It could include complex user management
        features, data grids, or admin tools that are only needed when managing users.
      </p>
    </div>
  );
}