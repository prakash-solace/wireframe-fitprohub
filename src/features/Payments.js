import React, { useState } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PaidIcon from '@mui/icons-material/Paid';

const initialPayments = [
  { id: 1, user: 'Alice', amount: 50, type: 'Session', status: 'Paid', date: '2024-06-10', payout: 'Pending' },
  { id: 2, user: 'Bob', amount: 120, type: 'Payout', status: 'Paid', date: '2024-06-11', payout: 'Completed' },
  { id: 3, user: 'Carol', amount: 30, type: 'Refund', status: 'Refunded', date: '2024-06-12', payout: 'Completed' },
];

const statusOptions = ['Paid', 'Refunded', 'Pending'];
const payoutOptions = ['Pending', 'Completed'];
const typeOptions = ['Session', 'Payout', 'Refund'];

const Payments = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [open, setOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ user: '', amount: '', type: 'Session', status: 'Paid', date: '', payout: 'Pending' });

  const handleOpen = (idx = null) => {
    setEditIdx(idx);
    if (idx !== null) {
      setForm(payments[idx]);
    } else {
      setForm({ user: '', amount: '', type: 'Session', status: 'Paid', date: '', payout: 'Pending' });
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
      setPayments(payments => payments.map((p, i) => i === editIdx ? { ...form, id: p.id } : p));
    } else {
      setPayments(payments => [...payments, { ...form, id: Date.now() }]);
    }
    setOpen(false);
  };

  const handleDelete = idx => {
    setPayments(payments => payments.filter((_, i) => i !== idx));
  };

  return (
    <Box p={3}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4" fontWeight="bold">Payments</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>Add Payment</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Payout</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((p, idx) => (
              <TableRow key={p.id}>
                <TableCell>{p.user}</TableCell>
                <TableCell>${p.amount}</TableCell>
                <TableCell>{p.type}</TableCell>
                <TableCell>
                  <Chip label={p.status} color={p.status === 'Paid' ? 'success' : p.status === 'Refunded' ? 'primary' : 'warning'} />
                </TableCell>
                <TableCell>{p.date}</TableCell>
                <TableCell>
                  <Chip label={p.payout} color={p.payout === 'Completed' ? 'success' : 'warning'} />
                </TableCell>
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
        <DialogTitle>{editIdx !== null ? 'Edit Payment' : 'Add Payment'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="User"
            name="user"
            value={form.user}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Amount"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            fullWidth
          />
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
            label="Date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Payout</InputLabel>
            <Select
              name="payout"
              value={form.payout}
              label="Payout"
              onChange={handleChange}
            >
              {payoutOptions.map(payout => (
                <MenuItem key={payout} value={payout}>{payout}</MenuItem>
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

export default Payments; 