import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  TextField,
  Button,
  Box,
  Paper,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { motion } from 'framer-motion';
import './UserTable.css'

const UserTable = ({
  userData,
  selectedRows,
  onRowSelection,
  onEdit,
  onDeleteSelected,
  onPageChange,
  currentPage,
  rowsPerPage,
  searchTerm,
  onSearch,
}) => {
  const totalPages = Math.ceil(userData.length / rowsPerPage);

  return (
    <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 4, overflow: 'hidden', marginTop: 4, border: '1px solid #ccc' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2} bgcolor="#f0f0f0">
          
        
        
        
        <TextField
          placeholder="Search..."
          variant="outlined"
          onChange={(e) => onSearch(e.target.value)}
          sx={{ width: '30%'}}
          InputProps={{
            endAdornment: (
              <IconButton color="primary">
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <IconButton
            color="secondary"
            onClick={onDeleteSelected}
            disabled={selectedRows.length === 0}
          >
            <DeleteForeverIcon />
          </IconButton>
        </motion.div>

        
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={selectedRows.length === userData.length}
                onChange={() => onRowSelection('all')}
              />
            </TableCell>
            <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1.2rem' }}>Name</TableCell>
            <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1.2rem' }}>Email</TableCell>
            <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1.2rem' }}>Role</TableCell>
            <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1.2rem' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData
            .filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
            .map((user) => (
              <motion.tr
                key={user.id}
                hover
                selected={selectedRows.includes(user.id)}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                transition={{ duration: 0.2 }}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(user.id)}
                    onChange={() => onRowSelection(user.id)}
                  />
                </TableCell>
                <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1rem' }}>
                  {user.id === selectedRows[0] ? (
                    <TextField value={user.name} onChange={(e) => onEdit(user.id, 'name', e.target.value)} />
                  ) : (
                    user.name
                  )}
                </TableCell>
                <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1rem' }}>{user.email}</TableCell>
                <TableCell sx={{ fontFamily: 'Roboto', fontSize: '1rem' }}>{user.role}</TableCell>
                <TableCell>
                  <motion.div whileHover={{ scale: 1.2 }}>
                    <IconButton color="primary" onClick={() => onEdit(user.id, 'name', user.name)} className="edit">
                      <EditIcon />
                    </IconButton>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2 }}>
                    <IconButton color="secondary" onClick={() => onRowSelection(user.id)} className="delete">
                      <DeleteIcon />
                    </IconButton>
                  </motion.div>
                </TableCell>
              </motion.tr>
            ))}
        </TableBody>
      </Table>
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} p={2} bgcolor="#f0f0f0">
  <Box display="flex" alignItems="center">
    
    <Typography variant="subtitle1" mr={2}>
      Page {currentPage} of {totalPages}
    </Typography>
  </Box>
  
  <Box display="flex" alignItems="center"  justifyContent="center" ml={25}>
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <IconButton onClick={() => onPageChange(1)} className={`page-number ${currentPage === 1 ? 'current-page' : ''}`}>
        {'<<'}
      </IconButton>
    </motion.div>
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <IconButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="jump-icon">
        <NavigateBeforeIcon />
      </IconButton>
    </motion.div>
    {Array.from({ length: totalPages > 5 ? 5 : totalPages }, (_, index) => (
      <motion.div key={index + 1} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          onClick={() => onPageChange(index + 1)}
          className={`page-number ${currentPage === index + 1 ? 'current-page' : ''}`}
          sx={{
            border: '1px solid #ccc',  // Add border style here
            borderRadius: 0,  // Adjust border-radius as needed
          }}
        >
          {index + 1}
        </Button>
      </motion.div>
    ))}
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <IconButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage * rowsPerPage >= userData.length} className="jump-icon">
        <NavigateNextIcon />
      </IconButton>
    </motion.div>
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <IconButton onClick={() => onPageChange(totalPages)} className={`page-number ${currentPage === totalPages ? 'current-page' : ''}`}>
        {'>>'}
      </IconButton>
    </motion.div>
  </Box>

  <Box ml="auto">
   
    <Typography variant="subtitle1">
      {selectedRows.length} row{selectedRows.length !== 1 ? 's' : ''} selected
    </Typography>
  </Box>
</Box>

    </TableContainer>

    
  );
};

export default UserTable;