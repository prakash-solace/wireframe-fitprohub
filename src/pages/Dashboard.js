// NOTE: This is a wireframe. All data and features are simulated with dummy data. No backend is connected.
import React, { useContext } from 'react';
import { Box, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, IconButton, Button, Grid, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../contexts/AuthContext';
import * as Features from '../features';
import { useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import PaymentIcon from '@mui/icons-material/Payment';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChatIcon from '@mui/icons-material/Chat';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 220;

const roleDashConfig = {
  client: {
    title: 'Client Dashboard',
    actions: ['Book Session', 'Track Progress', 'Join Challenge'],
    stats: ['Active Subscriptions', 'Upcoming Sessions', 'Streak Days']
  },
  trainer: {
    title: 'Trainer Dashboard',
    actions: ['View Clients', 'Create Program', 'Check Earnings'],
    stats: ['Active Clients', 'Sessions This Week', 'Total Earnings']
  },
  nutritionist: {
    title: 'Nutritionist Dashboard',
    actions: ['View Clients', 'Share Meal Plan', 'Check Earnings'],
    stats: ['Active Clients', 'Meal Plans Shared', 'Total Earnings']
  },
  admin: {
    title: 'Admin Portal',
    actions: ['Manage Users', 'View Reports', 'Platform Settings'],
    stats: ['Total Users', 'Transactions', 'Active Professionals']
  }
};

const sidebarIcons = {
  'Bookings': <EventIcon />, 'Progress Tracker': <BarChartIcon />, 'Group Programs': <GroupWorkIcon />, 'Chat': <ChatIcon />, 'Content Library': <LibraryBooksIcon />, 'Bonus Features': <EmojiEventsIcon />, 'Subscriptions': <SubscriptionsIcon />, 'Reports': <BarChartIcon />,
  'Users': <PeopleIcon />, 'Payments': <PaymentIcon />, 'Admin Portal': <SettingsIcon />, 'Marketing': <EmojiEventsIcon />, 'Integrations': <SettingsIcon />, 'Platform Enhancers': <SettingsIcon />, 'AI Tools': <SettingsIcon />
};

const Dashboard = () => {
  const { user, switchRole } = useAuth();
  const theme = useTheme();
  const [darkMode, setDarkMode] = useState(false);
  const role = user?.role || 'client';
  const config = roleDashConfig[role];
  const [selected, setSelected] = useState(-1); // -1 means dashboard home
  // Map sidebar actions to feature components
  const featureMap = {
    client: [Features.Bookings, Features.ProgressTracker, Features.GroupPrograms, Features.Chat, Features.ContentLibrary, Features.BonusFeatures, Features.Subscriptions, Features.Reports],
    trainer: [Features.Users, Features.Bookings, Features.GroupPrograms, Features.Chat, Features.ContentLibrary, Features.Payments, Features.Subscriptions, Features.ProgressTracker, Features.Reports],
    nutritionist: [Features.Users, Features.Bookings, Features.GroupPrograms, Features.Chat, Features.ContentLibrary, Features.Payments, Features.Subscriptions, Features.ProgressTracker, Features.Reports],
    admin: [Features.AdminPortal, Features.Users, Features.Bookings, Features.Payments, Features.Subscriptions, Features.ContentLibrary, Features.Reports, Features.Marketing, Features.Integrations, Features.PlatformEnhancers, Features.AITools],
  };
  const featureTitles = {
    client: ['Bookings', 'Progress Tracker', 'Group Programs', 'Chat', 'Content Library', 'Bonus Features', 'Subscriptions', 'Reports'],
    trainer: ['Users', 'Bookings', 'Group Programs', 'Chat', 'Content Library', 'Payments', 'Subscriptions', 'Progress Tracker', 'Reports'],
    nutritionist: ['Users', 'Bookings', 'Group Programs', 'Chat', 'Content Library', 'Payments', 'Subscriptions', 'Progress Tracker', 'Reports'],
    admin: ['Admin Portal', 'Users', 'Bookings', 'Payments', 'Subscriptions', 'Content Library', 'Reports', 'Marketing', 'Integrations', 'Platform Enhancers', 'AI Tools'],
  };
  const FeatureComponent = featureMap[role][selected] || (() => <div />);
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: darkMode ? 'grey.900' : 'grey.100' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: darkMode ? 'grey.950' : 'primary.main', color: 'white' },
        }}
      >
        <Toolbar sx={{ justifyContent: 'center', py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DashboardIcon fontSize="large" />
            <Typography variant="h6" fontWeight="bold">FitProHub</Typography>
          </Box>
        </Toolbar>
        <List>
          <ListItem button selected={selected === -1} onClick={() => setSelected(-1)}>
            <ListItemIcon sx={{ color: 'white' }}><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          {featureTitles[role].map((text, i) => (
            <ListItem button key={i} selected={selected === i} onClick={() => setSelected(i)}>
              <ListItemIcon sx={{ color: 'white' }}>{sidebarIcons[text] || <SettingsIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: darkMode ? 'grey.900' : 'grey.100', p: 0, minHeight: '100vh' }}>
        {/* Topbar */}
        <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6" fontWeight="bold" color={darkMode ? 'white' : 'primary.main'}>{config.title}</Typography>
              <Button color="primary" variant="outlined" onClick={switchRole} sx={{ ml: 2 }}>Switch Role</Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton color="inherit"><NotificationsIcon /></IconButton>
              <IconButton color="inherit" onClick={() => setDarkMode(d => !d)}>
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <IconButton color="inherit"><AccountCircleIcon /></IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {/* Main area: dashboard home or feature module */}
        {selected === -1 ? (
          <Box sx={{ p: 4 }}>
            <Grid container spacing={3}>
              {config.stats.map((stat, i) => (
                <Grid item xs={12} sm={4} key={i}>
                  <Paper elevation={3} sx={{ p: 4, textAlign: 'center', bgcolor: darkMode ? 'grey.800' : 'white' }}>
                    <Typography variant="h6" fontWeight="bold">{stat}</Typography>
                    <Typography variant="h3" color="primary.main">{Math.floor(Math.random()*100)}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            {/* Sample chart placeholder */}
            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Paper elevation={2} sx={{ p: 4, maxWidth: 600, mx: 'auto', bgcolor: darkMode ? 'grey.800' : 'white' }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Performance Overview</Typography>
                <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'grey.500' }}>
                  [Chart Placeholder]
                </Box>
              </Paper>
            </Box>
          </Box>
        ) : (
          <Box sx={{ p: 4 }}>
            <FeatureComponent />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard; 