import React, { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "" });
    const [message, setMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        axios
            .get(`https://reqres.in/api/users?page=${page}`)
            .then((response) => setUsers(response.data.data))
            .catch((error) => console.error(error));
    }, [page]);

    const handleEditClick = (user) => {
        setEditingUser(user.id);
        setFormData({ first_name: user.first_name, last_name: user.last_name, email: user.email });
        setMessage({ type: "", text: "" }); 
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async (id) => {
        if (!formData.first_name.trim() || !formData.last_name.trim() || !formData.email.trim()) {
            setMessage({ type: "error", text: "All fields are required!" });
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setMessage({ type: "error", text: "Invalid email format!" });
            return;
        }

        try {
            await axios.put(`https://reqres.in/api/users/${id}`, formData);
            setUsers(users.map(user => user.id === id ? { ...user, ...formData } : user));
            setEditingUser(null);
            setMessage({ type: "success", text: "User details updated successfully!" });
        } catch (error) {
            console.error("Error updating user:", error);
            setMessage({ type: "error", text: "Failed to update user!" });
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://reqres.in/api/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
            setMessage({ type: "success", text: "User deleted successfully!" });
        } catch (error) {
            setMessage({ type: "error", text: "Error deleting user!" });
        }
    };

    return (
        <div>
            <h2>User List</h2>

            {message.text && (
                <p style={{ color: message.type === "error" ? "red" : "green" }}>{message.text}</p>
            )}

            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <img src={user.avatar} alt={user.first_name} width="50" />
                            </td>
                            <td>
                                {editingUser === user.id ? (
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    user.first_name
                                )}
                            </td>
                            <td>
                                {editingUser === user.id ? (
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    user.last_name
                                )}
                            </td>
                            <td>
                                {editingUser === user.id ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    user.email
                                )}
                            </td>
                            <td>
                                {editingUser === user.id ? (
                                    <button onClick={() => handleSave(user.id)}>Save</button>
                                ) : (
                                    <button onClick={() => handleEditClick(user)}>Edit</button>
                                )}
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                Previous
            </button>
            <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
    );
};

export default Users;
