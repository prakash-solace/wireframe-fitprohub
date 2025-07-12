import React, { useState } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Chip, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CampaignIcon from '@mui/icons-material/Campaign';

const initialUsers = [
  { id: 1, name: 'Alice', email: 'alice@fitprohub.com', status: 'Active' },
  { id: 2, name: 'Bob', email: 'bob@fitprohub.com', status: 'Pending' },
  { id: 3, name: 'Carol', email: 'carol@fitprohub.com', status: 'Suspended' },
];
const initialTx = [
  { id: 1, user: 'Alice', amount: 50, type: 'Session', status: 'Paid', date: '2024-06-10' },
  { id: 2, user: 'Bob', amount: 120, type: 'Payout', status: 'Paid', date: '2024-06-11' },
];
const statusOptions = ['Active', 'Pending', 'Suspended', 'Banned'];

const AdminPortal = () => {
  const [users, setUsers] = useState(initialUsers);
  const [txs] = useState(initialTx);
  const [open, setOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', status: 'Active' });
  const [announceOpen, setAnnounceOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([]);

  const handleOpen = (idx = null) => {
    setEditIdx(idx);
    if (idx !== null) {
      setForm(users[idx]);
    } else {
      setForm({ name: '', email: '', status: 'Active' });
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
      setUsers(users => users.map((u, i) => i === editIdx ? { ...form, id: u.id } : u));
    } else {
      setUsers(users => [...users, { ...form, id: Date.now() }]);
    }
    setOpen(false);
  };
  const handleDelete = idx => {
    setUsers(users => users.filter((_, i) => i !== idx));
  };
  const handleStatus = (idx, status) => {
    setUsers(users => users.map((u, i) => i === idx ? { ...u, status } : u));
  };
  const handleAnnounce = () => {
    if (announcement.trim()) {
      setAnnouncements(a => [...a, { text: announcement, date: new Date().toLocaleString() }]);
      setAnnouncement('');
      setAnnounceOpen(false);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" mb={2}>Admin Portal</Typography>
      <Box mb={4}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6">User Management</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>Add User</Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((u, idx) => (
                <TableRow key={u.id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Chip label={u.status} color={u.status === 'Active' ? 'success' : u.status === 'Pending' ? 'warning' : u.status === 'Suspended' ? 'default' : 'error'} />
                  </TableCell>
                  <TableCell align="right">
                    <Button size="small" onClick={() => handleStatus(idx, 'Active')}>Approve</Button>
                    <Button size="small" color="warning" onClick={() => handleStatus(idx, 'Suspended')}>Suspend</Button>
                    <Button size="small" color="error" onClick={() => handleStatus(idx, 'Banned')}>Ban</Button>
                    <IconButton onClick={() => handleOpen(idx)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(idx)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box mb={4}>
        <Typography variant="h6" mb={1}>Transactions</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {txs.map(tx => (
                <TableRow key={tx.id}>
                  <TableCell>{tx.user}</TableCell>
                  <TableCell>${tx.amount}</TableCell>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell>{tx.status}</TableCell>
                  <TableCell>{tx.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box mb={4}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h6">Global Announcements</Typography>
          <Button variant="contained" startIcon={<CampaignIcon />} onClick={() => setAnnounceOpen(true)}>New Announcement</Button>
        </Box>
        {announcements.length === 0 ? (
          <Typography color="text.secondary">No announcements yet.</Typography>
        ) : (
          <Box>
            {announcements.map((a, i) => (
              <Paper key={i} sx={{ p: 2, mb: 1 }}>
                <Typography>{a.text}</Typography>
                <Typography variant="caption" color="text.secondary">{a.date}</Typography>
              </Paper>
            ))}
          </Box>
        )}
      </Box>
      {/* User dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIdx !== null ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={form.email}
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
      {/* Announcement dialog */}
      <Dialog open={announceOpen} onClose={() => setAnnounceOpen(false)}>
        <DialogTitle>New Announcement</DialogTitle>
        <DialogContent>
          <TextField
            label="Announcement"
            value={announcement}
            onChange={e => setAnnouncement(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAnnounceOpen(false)}>Cancel</Button>
          <Button onClick={handleAnnounce} variant="contained">Send</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPortal; 