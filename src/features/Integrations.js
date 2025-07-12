import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Button, Chip } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VideocamIcon from '@mui/icons-material/Videocam';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

const Integrations = () => {
  const [fitStatus, setFitStatus] = useState('Not Connected');
  const [calStatus, setCalStatus] = useState('Not Synced');
  const [zoomStatus, setZoomStatus] = useState('Not Linked');
  const [notifStatus, setNotifStatus] = useState('Not Enabled');

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" mb={3}>Integrations</Typography>
      <Grid container spacing={3}>
        {/* Google Fit / Apple Health */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <FitnessCenterIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="h6" fontWeight="bold" mt={1}>Google Fit / Apple Health</Typography>
            <Chip label={fitStatus} color={fitStatus === 'Connected' ? 'success' : 'default'} sx={{ mt: 1 }} />
            <Button variant="outlined" size="small" onClick={() => setFitStatus('Connected')} sx={{ mt: 1 }}>Connect</Button>
          </Paper>
        </Grid>
        {/* Google Calendar */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <CalendarMonthIcon color="secondary" sx={{ fontSize: 40 }} />
            <Typography variant="h6" fontWeight="bold" mt={1}>Google Calendar</Typography>
            <Chip label={calStatus} color={calStatus === 'Synced' ? 'success' : 'default'} sx={{ mt: 1 }} />
            <Button variant="outlined" size="small" onClick={() => setCalStatus('Synced')} sx={{ mt: 1 }}>Sync</Button>
          </Paper>
        </Grid>
        {/* Zoom / Google Meet */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <VideocamIcon color="info" sx={{ fontSize: 40 }} />
            <Typography variant="h6" fontWeight="bold" mt={1}>Zoom / Google Meet</Typography>
            <Chip label={zoomStatus} color={zoomStatus === 'Linked' ? 'success' : 'default'} sx={{ mt: 1 }} />
            <Button variant="outlined" size="small" onClick={() => setZoomStatus('Linked')} sx={{ mt: 1 }}>Link</Button>
          </Paper>
        </Grid>
        {/* WhatsApp / Email Notifications */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <WhatsAppIcon color="success" sx={{ fontSize: 40, mr: 1 }} />
            <EmailIcon color="error" sx={{ fontSize: 40, ml: 1 }} />
            <Typography variant="h6" fontWeight="bold" mt={1}>WhatsApp / Email</Typography>
            <Chip label={notifStatus} color={notifStatus === 'Enabled' ? 'success' : 'default'} sx={{ mt: 1 }} />
            <Button variant="outlined" size="small" onClick={() => setNotifStatus('Enabled')} sx={{ mt: 1 }}>Enable</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Integrations; 