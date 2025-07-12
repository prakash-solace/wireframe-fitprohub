import React, { useState } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Chip, FormControlLabel, Checkbox
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const initialPlans = [
  { id: 1, name: 'Bob Monthly', type: 'Monthly', features: 'Chat, Calls, Diet Chart', price: 49, status: 'Active', professionalType: 'trainer', professionalName: 'Bob Trainer', description: 'Best for beginners', duration: '1 month', maxClients: 10, trialAvailable: true, notes: 'Includes 1:1 chat' },
  { id: 2, name: 'Morgan Vegan', type: 'Monthly', features: 'Meal Plan, Chat', price: 69, status: 'Active', professionalType: 'nutritionist', professionalName: 'Morgan Nutri', description: 'Vegan meal plan', duration: '1 month', maxClients: 5, trialAvailable: false, notes: '' },
];

const typeOptions = ['Monthly', 'Quarterly', 'Yearly'];
const statusOptions = ['Active', 'Inactive'];
const professionalTypeOptions = ['trainer', 'nutritionist'];
const professionalNameOptions = {
  trainer: ['Bob Trainer', 'Sam Fit', 'Alex Pro'],
  nutritionist: ['Morgan Nutri', 'Jamie Diet', 'Taylor Health'],
};

const Subscriptions = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [open, setOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ name: '', type: 'Monthly', features: '', price: '', status: 'Active' });
  const [filterType, setFilterType] = useState('');
  const [filterName, setFilterName] = useState('');

  const handleOpen = (idx = null) => {
    setEditIdx(idx);
    if (idx !== null) {
      setForm(plans[idx]);
    } else {
      setForm({ name: '', type: 'Monthly', features: '', price: '', status: 'Active' });
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
      setPlans(plans => plans.map((p, i) => i === editIdx ? { ...form, id: p.id } : p));
    } else {
      setPlans(plans => [...plans, { ...form, id: Date.now() }]);
    }
    setOpen(false);
  };

  const handleDelete = idx => {
    setPlans(plans => plans.filter((_, i) => i !== idx));
  };

  return (
    <Box p={3}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4" fontWeight="bold">Subscription Plans</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>Add Plan</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Features</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Professional Type</TableCell>
              <TableCell>Professional Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Max Clients</TableCell>
              <TableCell>Trial</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans.map((p, idx) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.type}</TableCell>
                <TableCell>{p.features}</TableCell>
                <TableCell>${p.price}</TableCell>
                <TableCell>
                  <Chip label={p.status} color={p.status === 'Active' ? 'success' : 'default'} />
                </TableCell>
                <TableCell>{p.professionalType}</TableCell>
                <TableCell>{p.professionalName}</TableCell>
                <TableCell>{p.description}</TableCell>
                <TableCell>{p.duration}</TableCell>
                <TableCell>{p.maxClients}</TableCell>
                <TableCell>{p.trialAvailable ? 'Yes' : 'No'}</TableCell>
                <TableCell>{p.notes}</TableCell>
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
        <DialogTitle>{editIdx !== null ? 'Edit Plan' : 'Add Plan'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            value={form.name}
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
          <TextField
            margin="dense"
            label="Features"
            name="features"
            value={form.features}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            type="number"
            value={form.price}
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
          <FormControl fullWidth margin="dense">
            <InputLabel>Professional Type</InputLabel>
            <Select
              name="professionalType"
              value={form.professionalType}
              label="Professional Type"
              onChange={handleChange}
            >
              {professionalTypeOptions.map(type => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Professional Name</InputLabel>
            <Select
              name="professionalName"
              value={form.professionalName}
              label="Professional Name"
              onChange={handleChange}
            >
              {professionalNameOptions[form.professionalType]?.map(name => (
                <MenuItem key={name} value={name}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
          <FormControl fullWidth margin="dense">
            <InputLabel>Duration</InputLabel>
            <Select
              name="duration"
              value={form.duration}
              label="Duration"
              onChange={handleChange}
            >
              <MenuItem value="1 week">1 Week</MenuItem>
              <MenuItem value="1 month">1 Month</MenuItem>
              <MenuItem value="3 months">3 Months</MenuItem>
              <MenuItem value="6 months">6 Months</MenuItem>
              <MenuItem value="1 year">1 Year</MenuItem>
              <MenuItem value="custom">Custom</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Max Clients"
            name="maxClients"
            type="number"
            value={form.maxClients}
            onChange={handleChange}
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                name="trialAvailable"
                checked={form.trialAvailable}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Trial Available"
          />
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
    </Box>
  );
};

export default Subscriptions; 