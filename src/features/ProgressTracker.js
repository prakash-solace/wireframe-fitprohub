import React, { useState } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Tabs, Tab, Avatar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ImageIcon from '@mui/icons-material/Image';
import TimelineIcon from '@mui/icons-material/Timeline';

const users = ['Alice', 'Carol'];
const groups = ['Yoga Group', 'Weight Loss Group'];

const initialProgress = [
  { id: 1, user: 'Alice', group: '', date: '2024-06-01', weight: 70, steps: 8000, water: 2.5, calories: 1800 },
  { id: 2, user: 'Carol', group: '', date: '2024-06-02', weight: 69.8, steps: 9000, water: 2.7, calories: 1750 },
  { id: 3, user: '', group: 'Yoga Group', date: '2024-06-03', weight: 69.5, steps: 10000, water: 3.0, calories: 1700 },
];

const initialActivities = [
  { id: 1, type: 'plan', user: 'Alice', group: '', date: '2024-06-01', desc: 'Workout plan assigned: Full Body HIIT', icon: <FitnessCenterIcon color="primary" /> },
  { id: 2, type: 'resource', user: '', group: 'Yoga Group', date: '2024-06-03', desc: 'Resource shared: Yoga PDF', icon: <AssignmentIcon color="secondary" /> },
  { id: 3, type: 'bmi', user: 'Alice', group: '', date: '2024-06-04', desc: 'BMI report uploaded', icon: <TimelineIcon color="info" /> },
  { id: 4, type: 'photo', user: 'Carol', group: '', date: '2024-06-05', desc: 'Progress photo uploaded', icon: <ImageIcon color="success" /> },
  { id: 5, type: 'task', user: '', group: 'Yoga Group', date: '2024-06-06', desc: 'Task assigned: 10,000 steps challenge', icon: <AssignmentIcon color="warning" /> },
];

const ProgressTracker = () => {
  // Simulate role ("trainer", "nutritionist", "user")
  const [role] = useState('trainer'); // Change to 'user' to simulate user view
  const [progress, setProgress] = useState(initialProgress);
  const [activities, setActivities] = useState(initialActivities);
  const [open, setOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ user: '', group: '', date: '', weight: '', steps: '', water: '', calories: '' });
  const [userFilter, setUserFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState('');
  const [tab, setTab] = useState(0);
  // New state for activity details dialog
  const [activityDetailOpen, setActivityDetailOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleOpen = (idx = null) => {
    setEditIdx(idx);
    if (idx !== null) {
      setForm(progress[idx]);
    } else {
      setForm({ user: '', group: '', date: '', weight: '', steps: '', water: '', calories: '' });
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
      setProgress(progress => progress.map((p, i) => i === editIdx ? { ...form, id: p.id } : p));
    } else {
      setProgress(progress => [...progress, { ...form, id: Date.now() }]);
      // Log as activity
      setActivities(acts => [
        { id: Date.now(), type: 'progress', user: form.user, group: form.group, date: form.date, desc: `Progress entry added: Weight ${form.weight}kg, Steps ${form.steps}`, icon: <TimelineIcon color="primary" /> },
        ...acts
      ]);
    }
    setOpen(false);
  };

  const handleDelete = idx => {
    setProgress(progress => progress.filter((_, i) => i !== idx));
  };

  // Simulate adding a plan/resource/task/BMI/photo for demo
  const handleAddActivity = (type) => {
    const now = new Date().toISOString().slice(0, 10);
    let desc = '';
    let icon = null;
    if (type === 'plan') { desc = 'Workout plan assigned: Cardio Blast'; icon = <FitnessCenterIcon color="primary" />; }
    if (type === 'resource') { desc = 'Resource shared: Healthy Recipes PDF'; icon = <AssignmentIcon color="secondary" />; }
    if (type === 'task') { desc = 'Task assigned: Drink 2L water daily'; icon = <AssignmentIcon color="warning" />; }
    if (type === 'bmi') { desc = 'BMI report uploaded'; icon = <TimelineIcon color="info" />; }
    if (type === 'photo') { desc = 'Progress photo uploaded'; icon = <ImageIcon color="success" />; }
    setActivities(acts => [
      { id: Date.now(), type, user: userFilter, group: groupFilter, date: now, desc, icon },
      ...acts
    ]);
  };

  // Filtered progress and activities by user/group
  const filtered = progress.filter(p =>
    (userFilter ? p.user === userFilter : true) &&
    (groupFilter ? p.group === groupFilter : true)
  );
  const filteredActs = activities.filter(a =>
    (userFilter ? a.user === userFilter : true) &&
    (groupFilter ? a.group === groupFilter : true)
  );

  // Prepare data for a simple weight-over-time graph (placeholder)
  const weightData = filtered.slice().sort((a, b) => a.date.localeCompare(b.date));

  return (
    <Box p={3}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4" fontWeight="bold">Progress Tracker</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpen()}>Add Entry</Button>
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
      {/* Tabs: Progress | Activity Feed */}
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3 }}>
        <Tab label="Progress Entries" />
        <Tab label="Activity Feed" />
      </Tabs>
      {tab === 0 && (
        <>
          <Box mb={3}>
            <Typography variant="h6" gutterBottom>Weight Over Time (Graph)</Typography>
            <Paper sx={{ p: 2, mb: 2, maxWidth: 600 }}>
              <Box sx={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'grey.500' }}>
                {/* Replace with real chart later */}
                {weightData.length > 1 ? (
                  <svg width="90%" height="100%" viewBox="0 0 300 120">
                    {weightData.map((d, i, arr) => i < arr.length - 1 && (
                      <line
                        key={i}
                        x1={30 + (i * 80)}
                        y1={100 - (d.weight - 68) * 30}
                        x2={30 + ((i + 1) * 80)}
                        y2={100 - (arr[i + 1].weight - 68) * 30}
                        stroke="#1976d2"
                        strokeWidth="2"
                      />
                    ))}
                    {weightData.map((d, i) => (
                      <circle
                        key={i}
                        cx={30 + (i * 80)}
                        cy={100 - (d.weight - 68) * 30}
                        r={5}
                        fill="#1976d2"
                      />
                    ))}
                    {weightData.map((d, i) => (
                      <text
                        key={i}
                        x={30 + (i * 80)}
                        y={115}
                        fontSize="10"
                        textAnchor="middle"
                      >{d.date.slice(5)}</text>
                    ))}
                  </svg>
                ) : (
                  <span>No data to display</span>
                )}
              </Box>
            </Paper>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Group</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Weight (kg)</TableCell>
                  <TableCell>Steps</TableCell>
                  <TableCell>Water (L)</TableCell>
                  <TableCell>Calories</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((p, idx) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.user}</TableCell>
                    <TableCell>{p.group}</TableCell>
                    <TableCell>{p.date}</TableCell>
                    <TableCell>{p.weight}</TableCell>
                    <TableCell>{p.steps}</TableCell>
                    <TableCell>{p.water}</TableCell>
                    <TableCell>{p.calories}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleOpen(idx)}><EditIcon /></IconButton>
                      <IconButton color="error" onClick={() => handleDelete(idx)}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      {tab === 1 && (
        <Box>
          <Box mb={2}>
            <Button variant="outlined" startIcon={<FitnessCenterIcon />} sx={{ mr: 1 }} onClick={() => handleAddActivity('plan')}>Add Plan</Button>
            <Button variant="outlined" startIcon={<AssignmentIcon />} sx={{ mr: 1 }} onClick={() => handleAddActivity('resource')}>Share Resource</Button>
            <Button variant="outlined" startIcon={<AssignmentIcon />} sx={{ mr: 1 }} onClick={() => handleAddActivity('task')}>Assign Task</Button>
            <Button variant="outlined" startIcon={<TimelineIcon />} sx={{ mr: 1 }} onClick={() => handleAddActivity('bmi')}>Upload BMI</Button>
            <Button variant="outlined" startIcon={<ImageIcon />} onClick={() => handleAddActivity('photo')}>Upload Photo</Button>
          </Box>
          <Paper sx={{ p: 2 }}>
            <Typography fontWeight="bold" mb={2}>Activity Feed</Typography>
            {filteredActs.length === 0 ? (
              <Typography color="text.secondary">No activities yet.</Typography>
            ) : (
              filteredActs.map(a => (
                <Box key={a.id} display="flex" alignItems="center" gap={2} mb={2} sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'grey.100' } }}
                  onClick={() => { setSelectedActivity(a); setActivityDetailOpen(true); }}>
                  <Avatar sx={{ bgcolor: 'grey.100', color: 'primary.main' }}>{a.icon}</Avatar>
                  <Box>
                    <Typography>{a.desc}</Typography>
                    <Typography variant="caption" color="text.secondary">{a.date} {a.user || a.group}</Typography>
                  </Box>
                </Box>
              ))
            )}
          </Paper>
        </Box>
      )}
      {/* Activity Detail Dialog */}
      <Dialog open={activityDetailOpen} onClose={() => setActivityDetailOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Activity Details</DialogTitle>
        <DialogContent dividers>
          {selectedActivity ? (
            <Box>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Avatar sx={{ bgcolor: 'grey.100', color: 'primary.main' }}>{selectedActivity.icon}</Avatar>
                <Box>
                  <Typography variant="h6">{selectedActivity.desc}</Typography>
                  <Typography variant="body2" color="text.secondary">{selectedActivity.date} {selectedActivity.user || selectedActivity.group}</Typography>
                </Box>
              </Box>
              {/* Show more details based on type */}
              {selectedActivity.type === 'progress' && (
                <Box mt={2}>
                  <Typography fontWeight="bold">Progress Report</Typography>
                  <TableContainer component={Paper} sx={{ mt: 1 }}>
                    <Table size="small">
                      <TableBody>
                        <TableRow><TableCell>Weight (kg)</TableCell><TableCell>{selectedActivity.weight}</TableCell></TableRow>
                        <TableRow><TableCell>Steps</TableCell><TableCell>{selectedActivity.steps}</TableCell></TableRow>
                        <TableRow><TableCell>Water (L)</TableCell><TableCell>{selectedActivity.water}</TableCell></TableRow>
                        <TableRow><TableCell>Calories</TableCell><TableCell>{selectedActivity.calories}</TableCell></TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
              {/* For plan/resource/task/bmi/photo, show generic info */}
              {['plan','resource','task','bmi','photo'].includes(selectedActivity.type) && (
                <Box mt={2}>
                  <Typography fontWeight="bold">Details</Typography>
                  <TableContainer component={Paper} sx={{ mt: 1 }}>
                    <Table size="small">
                      <TableBody>
                        <TableRow><TableCell>User</TableCell><TableCell>{selectedActivity.user || '-'}</TableCell></TableRow>
                        <TableRow><TableCell>Group</TableCell><TableCell>{selectedActivity.group || '-'}</TableCell></TableRow>
                        <TableRow><TableCell>Date</TableCell><TableCell>{selectedActivity.date}</TableCell></TableRow>
                        <TableRow><TableCell>Description</TableCell><TableCell>{selectedActivity.desc}</TableCell></TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </Box>
          ) : (
            <Typography>No activity selected.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActivityDetailOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIdx !== null ? 'Edit Entry' : 'Add Entry'}</DialogTitle>
        <DialogContent>
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
            label="Weight (kg)"
            name="weight"
            type="number"
            value={form.weight}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Steps"
            name="steps"
            type="number"
            value={form.steps}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Water (L)"
            name="water"
            type="number"
            value={form.water}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Calories"
            name="calories"
            type="number"
            value={form.calories}
            onChange={handleChange}
            fullWidth
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

export default ProgressTracker; 