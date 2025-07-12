import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Button, Switch, FormControlLabel, Select, MenuItem, Snackbar, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import TranslateIcon from '@mui/icons-material/Translate';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TextFieldsIcon from '@mui/icons-material/TextFields';

const PlatformEnhancers = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('normal');
  const [contrast, setContrast] = useState(false);
  const [lang, setLang] = useState('en');
  const [notifOpen, setNotifOpen] = useState(false);

  const handleNotif = () => setNotifOpen(true);

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" mb={3}>Platform Experience Enhancers</Typography>
      <Grid container spacing={3}>
        {/* Theme Toggle */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Brightness4Icon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="h6" fontWeight="bold" mt={1}>Theme</Typography>
            <FormControlLabel
              control={<Switch checked={darkMode} onChange={() => setDarkMode(d => !d)} />}
              label={darkMode ? 'Dark Mode' : 'Light Mode'}
            />
          </Paper>
        </Grid>
        {/* Accessibility */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <TextFieldsIcon color="secondary" sx={{ fontSize: 40 }} />
            <Typography variant="h6" fontWeight="bold" mt={1}>Accessibility</Typography>
            <Select
              value={fontSize}
              onChange={e => setFontSize(e.target.value)}
              size="small"
              sx={{ mt: 1, minWidth: 100 }}
            >
              <MenuItem value="small">Small</MenuItem>
              <MenuItem value="normal">Normal</MenuItem>
              <MenuItem value="large">Large</MenuItem>
            </Select>
            <FormControlLabel
              control={<Switch checked={contrast} onChange={() => setContrast(c => !c)} />}
              label="High Contrast"
              sx={{ display: 'block', mt: 1 }}
            />
          </Paper>
        </Grid>
        {/* Multi-language */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <TranslateIcon color="success" sx={{ fontSize: 40 }} />
            <Typography variant="h6" fontWeight="bold" mt={1}>Language</Typography>
            <Select
              value={lang}
              onChange={e => setLang(e.target.value)}
              size="small"
              sx={{ mt: 1, minWidth: 100 }}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
              <MenuItem value="fr">French</MenuItem>
            </Select>
          </Paper>
        </Grid>
        {/* Notifications */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <NotificationsIcon color="info" sx={{ fontSize: 40 }} />
            <Typography variant="h6" fontWeight="bold" mt={1}>Notifications</Typography>
            <Button variant="outlined" size="small" onClick={handleNotif} sx={{ mt: 1 }}>Show Notification</Button>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={notifOpen}
        autoHideDuration={2000}
        onClose={() => setNotifOpen(false)}
        message="This is a sample notification!"
        action={
          <IconButton size="small" color="inherit" onClick={() => setNotifOpen(false)}>
            ×
          </IconButton>
        }
      />
    </Box>
  );
};

export default PlatformEnhancers; 