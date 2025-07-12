import React, { useState } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const initialPrograms = [
  { id: 1, title: '21 Day Abs Challenge', description: 'Daily abs workout for 21 days', type: 'Challenge', start: '2024-06-10', end: '2024-07-01', participants: 15, status: 'Active' },
  { id: 2, title: 'Morning Yoga Class', description: 'Group yoga every morning', type: 'Class', start: '2024-06-15', end: '2024-07-15', participants: 8, status: 'Upcoming' },
];

const typeOptions = ['Challenge', 'Class'];
const statusOptions = ['Active', 'Upcoming', 'Completed'];

const GroupPrograms = () => {
  const [programs, setPrograms] = useState(initialPrograms);
  const [open, setOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', type: 'Challenge', start: '', end: '', participants: '', status: 'Active' });

  const handleOpen = (idx = null) => {
    setEditIdx(idx);
    if (idx !== null) {
      setForm(programs[idx]);
    } else {
      setForm({ title: '', description: '', type: 'Challenge', start: '', end: '', participants: '', status: 'Active' });
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
      setPrograms(programs => programs.map((p, i) => i === editIdx ? { ...form, id: p.id } : p));
    } else {
      setPrograms(programs => [...programs, { ...form, id: Date.now() }]);
    }
    setOpen(false);
  };

  const handleDelete = idx => {
    setPrograms(programs => programs.filter((_, i) => i !== idx));
  };

  const iconForType = type => {
    if (type === 'Challenge') return <EmojiEventsIcon color="warning" />;
    return <GroupIcon color="primary" />;
  };

  return (
    <Box p={3}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4" fontWeight="bold">Group Programs & Challenges</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>Add Program</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
              <TableCell>Participants</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {programs.map((p, idx) => (
              <TableRow key={p.id}>
                <TableCell>{iconForType(p.type)} <Chip label={p.type} size="small" sx={{ ml: 1 }} /></TableCell>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.description}</TableCell>
                <TableCell>{p.start}</TableCell>
                <TableCell>{p.end}</TableCell>
                <TableCell>{p.participants}</TableCell>
                <TableCell><Chip label={p.status} color={p.status === 'Active' ? 'success' : p.status === 'Upcoming' ? 'warning' : 'default'} /></TableCell>
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
        <DialogTitle>{editIdx !== null ? 'Edit Program' : 'Add Program'}</DialogTitle>
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
            label="Start Date"
            name="start"
            type="date"
            value={form.start}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="End Date"
            name="end"
            type="date"
            value={form.end}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Participants"
            name="participants"
            type="number"
            value={form.participants}
            onChange={handleChange}
            fullWidth
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={form.status}
              label="Status"
              onChange={handleChange}
            >
              {statusOptions.map(status => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
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

export default GroupPrograms; 