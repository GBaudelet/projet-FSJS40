import React, { useState, useEffect } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  const [editingUser, setEditingUser] = useState({
    id: "",
    username: "",
    role_id: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/v1/user/all");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const userData = { ...editingUser };

      const response = await fetch(
        `http://localhost:9000/api/v1/user/update/${editingUser.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
          credentials: "include",
        }
      );

      const data = await response.json();
      setUsers(users.map((user) => (user.id === data.id ? data : user)));
      setIsEditing(null);
      setEditingUser({ id: "", username: "", role_id: "" });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     await fetch(`http://localhost:9000/api/v1/user/delete/${id}`, {
  //       method: "DELETE",
  //       credentials: "include",
  //     });
  //     setUsers(users.filter((user) => user.id !== id));
  //   } catch (error) {
  //     console.error("Error deleting user:", error);
  //   }
  // };

  return (
    <section className="users-page">
      <h2>Users</h2>

      <ul className="users-list">
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user, index) => (
            <li key={user.id || index} className="user-item">
              <div className="user-details">
                <p>Name: {user.username}</p>
                <p>Role: {user.role}</p>
              </div>
              <div className="user-actions">
                <button
                  onClick={() => {
                    setIsEditing(user.id);
                    setEditingUser({
                      id: user.id,
                      username: user.username,
                      role_id: user.role_id,
                    });
                  }}
                >
                  Edit
                </button>
                {/* <button onClick={() => handleDelete(user.id)}>Delete</button> */}
              </div>
            </li>
          ))
        ) : (
          <p>No users found</p>
        )}
      </ul>

      {isEditing && (
        <div className="form-container">
          <h3>Edit User</h3>

          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            placeholder="Name"
            value={editingUser.username}
            onChange={(e) =>
              setEditingUser({ ...editingUser, username: e.target.value })
            }
          />

          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={editingUser.role_id}
            onChange={(e) =>
              setEditingUser({ ...editingUser, role_id: e.target.value })
            }
          >
            <option value="1">Admin</option>
            <option value="2">User</option>
          </select>

          <button onClick={handleUpdate}>Update User</button>
        </div>
      )}
    </section>
  );
};

export default UsersPage;
