import React, { useState, useEffect } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  const [editingUser, setEditingUser] = useState({
    id: "",
    username: "",
    password: "",
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
      const { password, ...userData } = editingUser;
      if (password.trim() === "") {
        userData.password = undefined;
      } else {
        userData.password = password;
      }

      const response = await fetch(
        `http://localhost:9000/api/v1/user/update/${editingUser.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();
      setUsers(users.map((user) => (user.id === data.id ? data : user)));
      setIsEditing(null);
      setEditingUser({ id: "", username: "", password: "" });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:9000/api/v1/user/delete/${id}`, {
        method: "DELETE",
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="users-page">
      <h2>Users</h2>

      <div className="users-list">
        {users.map((user, index) => (
          <div key={user.id || index} className="user-item">
            <div className="user-details">
              <p>Name: {user.username}</p>
            </div>
            <div className="user-actions">
              <button
                onClick={() => {
                  setIsEditing(user.id);
                  setEditingUser(user);
                }}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="form-container">
          <h3>Edit User</h3>
          <input
            type="text"
            placeholder="Name"
            value={editingUser.username}
            onChange={(e) =>
              setEditingUser({ ...editingUser, username: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="New Password (leave blank if no change)"
            value={editingUser.password}
            onChange={(e) =>
              setEditingUser({ ...editingUser, password: e.target.value })
            }
          />
          <button onClick={handleUpdate}>Update User</button>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
