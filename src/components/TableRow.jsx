// components/TableRow.jsx
import React, { useState, useEffect } from 'react';

const TableRow = ({ user, onSelect, isSelected, onEdit }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  useEffect(() => {
    setEditedUser({ ...user });
  }, [user]);

  const handleRowSelection = () => {
    onSelect(user.id);
  };

  const handleEdit = () => {
    if (isEditing) {
      // Save changes
      onEdit(editedUser);
    }
    setEditing(!isEditing);
  };

  const handleDelete = () => {
    // Add logic to handle deleting
    console.log(`Delete user with ID: ${user.id}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <tr>
      <td>
        <input type="checkbox" onChange={handleRowSelection} checked={isSelected} />
      </td>
      <td>{editedUser.id}</td>
      <td>
        {isEditing ? (
          <input type="text" name="name" value={editedUser.name} onChange={handleInputChange} />
        ) : (
          editedUser.name
        )}
      </td>
      <td>{editedUser.email}</td>
      <td>{editedUser.role}</td>
      <td>
        <button className={isEditing ? 'save' : 'edit'} onClick={handleEdit}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button className="delete" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
