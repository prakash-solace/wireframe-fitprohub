import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Chip } from '@mui/material';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';

const BonusFeatures = () => {
  // Streak tracker
  const [streak, setStreak] = useState(7);
  // Water intake reminder
  const [water, setWater] = useState(0);
  // Journal
  const [journal, setJournal] = useState('');
  const [journalOpen, setJournalOpen] = useState(false);
  // Referral
  const [referralCode] = useState('FITPRO123');
  const [copied, setCopied] = useState(false);

  const handleWater = () => setWater(w => w + 1);
  const handleJournalSave = () => setJournalOpen(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" mb={3}>Bonus & Engagement Features</Typography>
      <Grid container spacing={3}>
        {/* Streak Tracker */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <EmojiEventsIcon color="warning" sx={{ fontSize: 40 }} />
            <Typography variant="h6" fontWeight="bold" mt={1}>Streak Tracker</Typography>
            <Typography variant="h4" color="primary.main">{streak} days</Typography>
            <Typography variant="body2">Logged in a row!</Typography>
          </Paper>
        </Grid>
        {/* Water Intake Reminder */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <LocalDrinkIcon color="info" sx={{ fontSize: 40 }} />
            <Typography variant="h6" fontWeight="bold" mt={1}>Water Intake</Typography>
            <Typography variant="h4" color="primary.main">{water} cups</Typography>
            <Button variant="outlined" size="small" onClick={handleWater} sx={{ mt: 1 }}>+1 Cup</Button>
          </Paper>
        </Grid>
        {/* Journal/Log */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <EditIcon color="secondary" sx={{ fontSize: 40 }} />
            <Typography variant="h6" fontWeight="bold" mt={1}>Journal / Log</Typography>
            <Typography variant="body2" sx={{ minHeight: 40 }}>{journal ? journal.slice(0, 40) + (journal.length > 40 ? '...' : '') : 'No entry yet.'}</Typography>
            <Button variant="outlined" size="small" onClick={() => setJournalOpen(true)} sx={{ mt: 1 }}>Write</Button>
          </Paper>
        </Grid>
        {/* Referral Program */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <ShareIcon color="success" sx={{ fontSize: 40 }} />
            <Typography variant="h6" fontWeight="bold" mt={1}>Referral Program</Typography>
            <Typography variant="body2">Invite friends & get rewards!</Typography>
            <Chip label={referralCode} color={copied ? 'success' : 'default'} sx={{ mt: 1, mb: 1 }} />
            <Button variant="outlined" size="small" onClick={handleCopy}>{copied ? 'Copied!' : 'Copy Code'}</Button>
          </Paper>
        </Grid>
      </Grid>
      {/* Journal Dialog */}
      <Dialog open={journalOpen} onClose={() => setJournalOpen(false)}>
        <DialogTitle>Write in your Journal</DialogTitle>
        <DialogContent>
          <TextField
            value={journal}
            onChange={e => setJournal(e.target.value)}
            fullWidth
            multiline
            rows={5}
            placeholder="Reflect on your day, progress, or goals..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setJournalOpen(false)}>Cancel</Button>
          <Button onClick={handleJournalSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BonusFeatures; 