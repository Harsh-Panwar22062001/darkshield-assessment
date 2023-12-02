// components/UserTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, IconButton, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';  // Import the correct icon
import DeleteIcon from '@mui/icons-material/Delete';  // Import the correct icon
import SearchIcon from '@mui/icons-material/Search';


const UserTable = ({ userData, selectedRows, onRowSelection, onEdit, onDeleteSelected, onPageChange, currentPage, rowsPerPage, searchTerm, onSearch }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox checked={selectedRows.length === userData.length} onChange={() => onRowSelection('all')} />
            </TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData
            .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
            .map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>
                  <Checkbox checked={selectedRows.includes(user.id)} onChange={() => onRowSelection(user.id)} />
                </TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  {user.id === selectedRows[0] ? (
                    <TextField value={user.name} onChange={(e) => onEdit(user.id, 'name', e.target.value)} />
                  ) : (
                    user.name
                  )}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => onEdit(user.id, 'name', user.name)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => onRowSelection(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div>
        <Button onClick={() => onPageChange(1)}>First Page</Button>
        <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous Page
        </Button>
        <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage * rowsPerPage >= userData.length}>
          Next Page
        </Button>
        <Button onClick={() => onPageChange(Math.ceil(userData.length / rowsPerPage))}>Last Page</Button>
      </div>
      <Button color="secondary" startIcon={<DeleteIcon />} onClick={onDeleteSelected} disabled={selectedRows.length === 0}>
        Delete Selected
      </Button>
    </TableContainer>
  );
};

export default UserTable;
