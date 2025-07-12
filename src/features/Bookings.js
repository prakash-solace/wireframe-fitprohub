import React, { useState } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';

const initialBookings = [
  { id: 1, client: 'Alice', professional: 'Bob', group: '', date: '2024-06-10', time: '10:00', status: 'Confirmed', notes: 'Bring water bottle.' },
  { id: 2, client: 'Carol', professional: 'Bob', group: '', date: '2024-06-12', time: '14:00', status: 'Pending', notes: '' },
  { id: 3, client: 'Alice', professional: 'Morgan', group: 'Yoga Group', date: '2024-06-15', time: '09:00', status: 'Completed', notes: 'Great session!' },
];

const statusOptions = ['Pending', 'Confirmed', 'Completed', 'Canceled', 'Rejected', 'Reschedule Requested'];
const groups = ['Yoga Group', 'Weight Loss Group'];
const professionals = ['Bob', 'Morgan'];
const clients = ['Alice', 'Carol'];

const getUnique = (arr, key) => Array.from(new Set(arr.map(b => b[key]).filter(Boolean)));

const Bookings = () => {
  // Simulate role ("trainer", "nutritionist", "user")
  const [role] = useState('trainer'); // Change to 'user' to simulate user view
  const [bookings, setBookings] = useState(initialBookings);
  const [open, setOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ client: '', professional: '', group: '', date: '', time: '', status: 'Pending', notes: '' });
  const [clientFilter, setClientFilter] = useState('');
  const [proFilter, setProFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState('');
  const [actionDialog, setActionDialog] = useState({ open: false, idx: null, action: '', reason: '' });

  // Available slots (for user booking)
  const availableSlots = [
    { date: '2024-06-20', time: '10:00' },
    { date: '2024-06-20', time: '14:00' },
    { date: '2024-06-21', time: '09:00' },
  ];

  const handleOpen = (idx = null) => {
    setEditIdx(idx);
    if (idx !== null) {
      setForm(bookings[idx]);
    } else {
      setForm({ client: '', professional: '', group: '', date: '', time: '', status: 'Pending', notes: '' });
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
      setBookings(bookings => bookings.map((b, i) => i === editIdx ? { ...form, id: b.id } : b));
    } else {
      setBookings(bookings => [...bookings, { ...form, id: Date.now() }]);
    }
    setOpen(false);
  };

  const handleDelete = idx => {
    setBookings(bookings => bookings.filter((_, i) => i !== idx));
  };

  // User/group filters
  const filtered = bookings.filter(b =>
    (clientFilter ? b.client === clientFilter : true) &&
    (proFilter ? b.professional === proFilter : true) &&
    (groupFilter ? b.group === groupFilter : true)
  );

  // Simulate a calendar view (just a list grouped by date for now)
  const grouped = filtered.reduce((acc, b) => {
    acc[b.date] = acc[b.date] || [];
    acc[b.date].push(b);
    return acc;
  }, {});

  // Booking actions (trainer/nutritionist)
  const handleAction = (idx, action) => {
    setActionDialog({ open: true, idx, action, reason: '' });
  };
  const handleActionConfirm = () => {
    setBookings(bookings => bookings.map((b, i) =>
      i === actionDialog.idx
        ? { ...b, status: actionDialog.action === 'reschedule' ? 'Reschedule Requested' : actionDialog.action === 'confirm' ? 'Confirmed' : 'Rejected', notes: actionDialog.reason || b.notes }
        : b
    ));
    setActionDialog({ open: false, idx: null, action: '', reason: '' });
  };

  // User booking (from available slots)
  const handleUserBook = slot => {
    setBookings(bookings => [...bookings, {
      id: Date.now(),
      client: 'Alice', // Simulate logged-in user
      professional: '',
      group: '',
      date: slot.date,
      time: slot.time,
      status: 'Pending',
      notes: '',
    }]);
  };

  return (
    <Box p={3}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4" fontWeight="bold">Bookings</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>Add Booking</Button>
      </Box>
      {/* Filters and selectors */}
      <Box display="flex" gap={2} mb={3}>
        <FormControl sx={{ minWidth: 160 }} size="small">
          <InputLabel>Filter by Client</InputLabel>
          <Select
            value={clientFilter}
            label="Filter by Client"
            onChange={e => setClientFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {clients.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 180 }} size="small">
          <InputLabel>Filter by Professional</InputLabel>
          <Select
            value={proFilter}
            label="Filter by Professional"
            onChange={e => setProFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {professionals.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
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
      {/* Calendar View */}
      <Box mb={3}>
        <Typography variant="h6" gutterBottom><CalendarMonthIcon sx={{ mr: 1, verticalAlign: 'middle' }} /> Calendar View (Grouped by Date)</Typography>
        {Object.keys(grouped).sort().map(date => (
          <Paper key={date} sx={{ mb: 2, p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">{date}</Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
              {grouped[date].map((b, idx) => (
                <Chip key={b.id} label={`${b.time} - ${b.client} with ${b.professional || b.group} (${b.status})`} color={b.status === 'Confirmed' ? 'success' : b.status === 'Pending' ? 'warning' : b.status === 'Completed' ? 'primary' : b.status === 'Rejected' ? 'error' : 'default'} sx={{ fontWeight: 'bold' }} />
              ))}
            </Box>
          </Paper>
        ))}
      </Box>
      {/* Available slots for user booking */}
      {role === 'user' && (
        <Box mb={3}>
          <Typography variant="h6" gutterBottom>Book a Session (Available Slots)</Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            {availableSlots.map((slot, i) => (
              <Button key={i} variant="outlined" onClick={() => handleUserBook(slot)}>
                {slot.date} {slot.time}
              </Button>
            ))}
          </Box>
        </Box>
      )}
      {/* Bookings Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Client</TableCell>
              <TableCell>Professional</TableCell>
              <TableCell>Group</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((b, idx) => (
              <TableRow key={b.id}>
                <TableCell>{b.client}</TableCell>
                <TableCell>{b.professional}</TableCell>
                <TableCell>{b.group}</TableCell>
                <TableCell>{b.date}</TableCell>
                <TableCell>{b.time}</TableCell>
                <TableCell>
                  <Chip label={b.status} color={b.status === 'Confirmed' ? 'success' : b.status === 'Pending' ? 'warning' : b.status === 'Completed' ? 'primary' : b.status === 'Rejected' ? 'error' : b.status === 'Reschedule Requested' ? 'secondary' : 'default'} />
                </TableCell>
                <TableCell>{b.notes}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpen(bookings.findIndex(x => x.id === b.id))}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(bookings.findIndex(x => x.id === b.id))}><DeleteIcon /></IconButton>
                  {role !== 'user' && b.status === 'Pending' && (
                    <>
                      <IconButton color="success" onClick={() => handleAction(idx, 'confirm')} title="Confirm"><CheckIcon /></IconButton>
                      <IconButton color="error" onClick={() => handleAction(idx, 'reject')} title="Reject"><CloseIcon /></IconButton>
                      <IconButton color="warning" onClick={() => handleAction(idx, 'reschedule')} title="Reschedule"><ReplayIcon /></IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Add/Edit Booking Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIdx !== null ? 'Edit Booking' : 'Add Booking'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Client"
            name="client"
            value={form.client}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Professional"
            name="professional"
            value={form.professional}
            onChange={handleChange}
            fullWidth
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Group</InputLabel>
            <Select
              name="group"
              value={form.group}
              label="Group"
              onChange={handleChange}
            >
              <MenuItem value="">None</MenuItem>
              {groups.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Time"
            name="time"
            type="time"
            value={form.time}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
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
          <TextField
            margin="dense"
            label="Notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
      {/* Confirm/Reject/Reschedule Dialog */}
      <Dialog open={actionDialog.open} onClose={() => setActionDialog({ open: false, idx: null, action: '', reason: '' })}>
        <DialogTitle>{actionDialog.action === 'confirm' ? 'Confirm Booking' : actionDialog.action === 'reject' ? 'Reject Booking' : 'Request Reschedule'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label={actionDialog.action === 'reschedule' ? 'Reschedule Reason' : 'Reason (optional)'}
            value={actionDialog.reason}
            onChange={e => setActionDialog(a => ({ ...a, reason: e.target.value }))}
            fullWidth
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActionDialog({ open: false, idx: null, action: '', reason: '' })}>Cancel</Button>
          <Button variant="contained" onClick={handleActionConfirm}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Bookings; 