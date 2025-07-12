import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import PaidIcon from '@mui/icons-material/Paid';

const summary = [
  { label: 'Total Sessions', value: 128, icon: <BarChartIcon color="primary" fontSize="large" /> },
  { label: 'Total Revenue', value: '$4,320', icon: <PaidIcon color="success" fontSize="large" /> },
  { label: 'Active Users', value: 56, icon: <PeopleIcon color="info" fontSize="large" /> },
];

const chartData = [
  { month: 'Jan', value: 300 },
  { month: 'Feb', value: 400 },
  { month: 'Mar', value: 350 },
  { month: 'Apr', value: 500 },
  { month: 'May', value: 600 },
  { month: 'Jun', value: 700 },
];

const Reports = () => (
  <Box p={3}>
    <Typography variant="h4" fontWeight="bold" mb={3}>Reports & Analytics</Typography>
    <Grid container spacing={3} mb={3}>
      {summary.map((s, i) => (
        <Grid item xs={12} sm={4} key={i}>
          <Paper elevation={3} sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
            {s.icon}
            <Box>
              <Typography variant="h6" fontWeight="bold">{s.label}</Typography>
              <Typography variant="h4" color="primary.main">{s.value}</Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
    <Paper sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>Monthly Sessions Trend</Typography>
      <Box sx={{ height: 200, display: 'flex', alignItems: 'flex-end', gap: 2, mt: 2 }}>
        {chartData.map((d, i) => (
          <Box key={i} sx={{ flex: 1, textAlign: 'center' }}>
            <Box sx={{ bgcolor: 'primary.main', height: `${d.value / 8}px`, borderRadius: 1, mb: 1 }} />
            <Typography variant="caption">{d.month}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  </Box>
);

export default Reports; 