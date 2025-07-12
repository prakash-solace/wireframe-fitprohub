import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Button, Chip, TextField, Snackbar, IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LinkIcon from '@mui/icons-material/Link';
import EmailIcon from '@mui/icons-material/Email';
import DiscountIcon from '@mui/icons-material/Discount';

const Marketing = () => {
  const [referralCode] = useState('FITPRO123');
  const [affiliateLink] = useState('https://fitprohub.com/affiliate/abc123');
  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [newsletter, setNewsletter] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [snack, setSnack] = useState('');

  const handleCopy = (text, msg) => {
    navigator.clipboard.writeText(text);
    setSnack(msg);
  };
  const handlePromo = () => {
    setPromoApplied(true);
    setSnack('Promo code applied!');
  };
  const handleSubscribe = () => {
    setSubscribed(true);
    setSnack('Subscribed to newsletter!');
  };

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" mb={3}>Marketing & Monetization</Typography>
      <Grid container spacing={3}>
        {/* Referral Program */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <LoyaltyIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="h6" fontWeight="bold" mt={1}>Referral Program</Typography>
            <Chip label={referralCode} color="success" sx={{ mt: 1, mb: 1 }} />
            <Button variant="outlined" size="small" onClick={() => handleCopy(referralCode, 'Referral code copied!')}>Copy Code</Button>
          </Paper>
        </Grid>
        {/* Affiliate Link */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <LinkIcon color="secondary" sx={{ fontSize: 40 }} />
            <Typography variant="h6" fontWeight="bold" mt={1}>Affiliate Link</Typography>
            <Chip label="fitprohub.com/affiliate/abc123" color="info" sx={{ mt: 1, mb: 1 }} />
            <Button variant="outlined" size="small" onClick={() => handleCopy(affiliateLink, 'Affiliate link copied!')}>Copy Link</Button>
          </Paper>
        </Grid>
        {/* Promo Codes */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <DiscountIcon color="warning" sx={{ fontSize: 40 }} />
            <Typography variant="h6" fontWeight="bold" mt={1}>Promo Codes</Typography>
            <TextField
              value={promo}
              onChange={e => setPromo(e.target.value)}
              size="small"
              placeholder="Enter code"
              sx={{ mt: 1, mb: 1 }}
              disabled={promoApplied}
            />
            <Button variant="outlined" size="small" onClick={handlePromo} disabled={promoApplied}>{promoApplied ? 'Applied' : 'Apply'}</Button>
          </Paper>
        </Grid>
        {/* Newsletter Subscription */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <EmailIcon color="info" sx={{ fontSize: 40 }} />
            <Typography variant="h6" fontWeight="bold" mt={1}>Newsletter</Typography>
            <TextField
              value={newsletter}
              onChange={e => setNewsletter(e.target.value)}
              size="small"
              placeholder="Your email"
              sx={{ mt: 1, mb: 1 }}
              disabled={subscribed}
            />
            <Button variant="outlined" size="small" onClick={handleSubscribe} disabled={subscribed}>{subscribed ? 'Subscribed' : 'Subscribe'}</Button>
          </Paper>
        </Grid>
        {/* Social Sharing */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <ShareIcon color="success" sx={{ fontSize: 40 }} />
            <Typography variant="h6" fontWeight="bold" mt={1}>Social Sharing</Typography>
            <Button variant="outlined" size="small" onClick={() => handleCopy('https://fitprohub.com', 'Link copied!')}>Share Platform</Button>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={!!snack}
        autoHideDuration={2000}
        onClose={() => setSnack('')}
        message={snack}
        action={
          <IconButton size="small" color="inherit" onClick={() => setSnack('')}>
            ×
          </IconButton>
        }
      />
    </Box>
  );
};

export default Marketing; 