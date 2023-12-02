// App.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import UserTable from './components/UserTable';

const App = () => {
  const [userData, setUserData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleRowSelection = (selected) => {
    if (selected === 'all') {
      setSelectedRows(selectedRows.length === userData.length ? [] : userData.map((user) => user.id));
    } else {
      setSelectedRows((prevSelected) => {
        if (prevSelected.includes(selected)) {
          return prevSelected.filter((id) => id !== selected);
        } else {
          return [...prevSelected, selected];
        }
      });
    }
  };

  const handleDeleteSelected = () => {
    const updatedData = userData.filter((user) => !selectedRows.includes(user.id));
    setUserData(updatedData);
    setSelectedRows([]);
  };

  const handleEdit = (userId, fieldName, value) => {
    const updatedData = userData.map((user) => {
      if (user.id === userId) {
        return { ...user, [fieldName]: value };
      }
      return user;
    });
    setUserData(updatedData);
  };

  const handleSearch = () => {
    // Add logic to handle search/filter
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <TextField
        placeholder="Search..."
        variant="outlined"
        fullWidth
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton color="primary" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
      <UserTable
        userData={userData}
        selectedRows={selectedRows}
        onRowSelection={handleRowSelection}
        onEdit={handleEdit}
        onDeleteSelected={handleDeleteSelected}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        searchTerm={searchTerm}
        onSearch={handleSearch}
      />
    </Container>
  );
};

export default App;
