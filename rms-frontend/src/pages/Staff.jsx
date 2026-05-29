import { useState } from "react";
import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import SectionCard from "../components/SectionCard";

function Staff() {
  const [search, setSearch] = useState("");

  const staffMembers = [
    { id: 1, name: "Rahul Verma", role: "Manager", shift: "Morning" },
    { id: 2, name: "Aisha Khan", role: "Chef", shift: "Evening" },
    { id: 3, name: "Rohan Patel", role: "Waiter", shift: "Morning" },
    { id: 4, name: "Sneha Joshi", role: "Cashier", shift: "Night" },
  ];

  const filteredStaff = staffMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Header title="Staff" subtitle="Manage restaurant staff and shifts" />

        <div className="dashboard-content">
          <div className="page-toolbar">
            <input
              type="text"
              className="input"
              placeholder="Search staff..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="add-btn">Add Staff Member</button>
          </div>

          <SectionCard title="Staff Directory">
            {filteredStaff.length === 0 ? (
              <div className="state-text">No staff members found.</div>
            ) : (
              <div className="table-wrap">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Shift</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStaff.map((member) => (
                      <tr key={member.id}>
                        <td>#{member.id}</td>
                        <td>{member.name}</td>
                        <td>{member.role}</td>
                        <td>{member.shift}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

export default Staff;
