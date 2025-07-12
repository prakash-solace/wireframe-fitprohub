import React, { useState } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';

const initialContent = [
  { id: 1, type: 'Video', title: 'Beginner Workout', description: 'Full body workout for beginners', folder: 'Beginner Workouts', user: 'Alice', group: '' },
  { id: 2, type: 'PDF', title: 'Keto Diet Plan', description: '7-day meal plan', folder: 'Keto Diet', user: '', group: 'Yoga Group' },
  { id: 3, type: 'Meal Plan', title: 'Vegan Meals', description: 'Plant-based recipes', folder: 'Vegan', user: '', group: '' },
];
const typeOptions = ['Video', 'PDF', 'Meal Plan'];
const users = ['Alice', 'Carol'];
const groups = ['Yoga Group', 'Weight Loss Group'];

const ContentLibrary = () => {
  // Simulate role ("trainer", "nutritionist", "user")
  const [role] = useState('trainer'); // Change to 'user' to simulate user view
  const [content, setContent] = useState(initialContent);
  const [open, setOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ type: 'Video', title: '', description: '', folder: '', user: '', group: '' });
  const [userFilter, setUserFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState('');

  const handleOpen = (idx = null) => {
    setEditIdx(idx);
    if (idx !== null) {
      setForm(content[idx]);
    } else {
      setForm({ type: 'Video', title: '', description: '', folder: '', user: '', group: '' });
    }
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSave = () => {
    if (editIdx !== null) {
      setContent(content => content.map((c, i) => i === editIdx ? { ...form, id: c.id } : c));
    } else {
      setContent(content => [...content, { ...form, id: Date.now() }]);
    }
    setOpen(false);
  };

  const handleDelete = idx => {
    setContent(content => content.filter((_, i) => i !== idx));
  };

  const iconForType = type => {
    if (type === 'Video') return <VideoLibraryIcon color="primary" />;
    if (type === 'PDF') return <PictureAsPdfIcon color="error" />;
    return <FolderIcon color="success" />;
  };

  // Filtered content by user/group
  const filtered = content.filter(c =>
    (userFilter ? c.user === userFilter : true) &&
    (groupFilter ? c.group === groupFilter : true)
  );

  return (
    <Box p={3}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4" fontWeight="bold">Content Library</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>Add Content</Button>
      </Box>
      {/* User/Group selectors */}
      <Box display="flex" gap={2} mb={3}>
        <FormControl sx={{ minWidth: 160 }} size="small">
          <InputLabel>Filter by User</InputLabel>
          <Select
            value={userFilter}
            label="Filter by User"
            onChange={e => setUserFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {users.map(u => <MenuItem key={u} value={u}>{u}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 180 }} size="small">
          <InputLabel>Filter by Group</InputLabel>
          <Select
            value={groupFilter}
            label="Filter by Group"
            onChange={e => setGroupFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {groups.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Folder</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Group</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((c, idx) => (
              <TableRow key={c.id}>
                <TableCell>{iconForType(c.type)} <Chip label={c.type} size="small" sx={{ ml: 1 }} /></TableCell>
                <TableCell>{c.title}</TableCell>
                <TableCell>{c.description}</TableCell>
                <TableCell>{c.folder}</TableCell>
                <TableCell>{c.user}</TableCell>
                <TableCell>{c.group}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpen(idx)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(idx)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIdx !== null ? 'Edit Content' : 'Add Content'}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={form.type}
              label="Type"
              onChange={handleChange}
            >
              {typeOptions.map(type => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            margin="dense"
            label="Folder"
            name="folder"
            value={form.folder}
            onChange={handleChange}
            fullWidth
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>User</InputLabel>
            <Select
              name="user"
              value={form.user}
              label="User"
              onChange={handleChange}
            >
              <MenuItem value="">All</MenuItem>
              {users.map(u => <MenuItem key={u} value={u}>{u}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Group</InputLabel>
            <Select
              name="group"
              value={form.group}
              label="Group"
              onChange={handleChange}
            >
              <MenuItem value="">All</MenuItem>
              {groups.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContentLibrary; 