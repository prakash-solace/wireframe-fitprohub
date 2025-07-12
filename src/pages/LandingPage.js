// NOTE: This is a wireframe. All data and features are simulated with dummy data. No backend is connected.
// TODO: Add sliders for trainers and nutritionists, and banner slider as per requirements.
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Typography, Button, Grid, Paper, Avatar, Container, useTheme, useMediaQuery, Card, CardContent, CardMedia, Dialog, DialogTitle, DialogContent, DialogActions, AppBar, Toolbar, Link as MuiLink, IconButton, Drawer, List, ListItem, ListItemText, useScrollTrigger } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
// import './HeroBanner.css'; // Remove this line for now

const bannerSlides = [
  { title: 'Transform Your Fitness Journey', desc: 'Connect with top trainers and nutritionists.', img: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c' },
  { title: 'Personalized Plans', desc: 'Get custom workouts and meal plans.', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' },
  { title: 'Track Your Progress', desc: 'Visualize your health improvements.', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a' },
];
// Add plans to each trainer and nutritionist
const trainers = [
  { name: 'Bob Trainer', specialty: 'Strength & Conditioning', img: 'https://randomuser.me/api/portraits/men/32.jpg',
    goals: ['Build Muscle', 'Weight Loss'], availability: 'Weekdays', experience: 7, location: 'New York',
    plans: [
      { id: 1, name: 'Bob Monthly', type: 'Monthly', features: ['Chat', 'Calls', 'Diet Chart'], price: 49 },
      { id: 2, name: 'Bob Pro', type: 'Yearly', features: ['All Features'], price: 399 },
    ] },
  { name: 'Sam Fit', specialty: 'Yoga & Flexibility', img: 'https://randomuser.me/api/portraits/men/45.jpg',
    goals: ['Yoga', 'Flexibility', 'Stress Relief'], availability: 'Weekends', experience: 4, location: 'San Francisco',
    plans: [
      { id: 3, name: 'Sam Yoga', type: 'Monthly', features: ['Yoga Chat', 'Video'], price: 59 },
    ] },
  { name: 'Alex Pro', specialty: 'HIIT & Cardio', img: 'https://randomuser.me/api/portraits/men/65.jpg',
    goals: ['Cardio Health', 'Weight Loss'], availability: 'Evenings', experience: 5, location: 'Chicago',
    plans: [
      { id: 4, name: 'Alex HIIT', type: 'Quarterly', features: ['HIIT Plan', 'Calls'], price: 129 },
    ] },
];
const nutritionists = [
  { name: 'Morgan Nutri', specialty: 'Vegan & Plant-based', img: 'https://randomuser.me/api/portraits/women/44.jpg',
    goals: ['Vegan Diet', 'Weight Loss'], availability: 'Weekdays', experience: 6, location: 'Los Angeles',
    plans: [
      { id: 5, name: 'Morgan Vegan', type: 'Monthly', features: ['Meal Plan', 'Chat'], price: 69 },
    ] },
  { name: 'Jamie Diet', specialty: 'Keto & Low-Carb', img: 'https://randomuser.me/api/portraits/women/55.jpg',
    goals: ['Keto', 'Diabetes Control'], availability: 'Weekends', experience: 8, location: 'Miami',
    plans: [
      { id: 6, name: 'Jamie Keto', type: 'Monthly', features: ['Keto Plan', 'Calls'], price: 79 },
    ] },
  { name: 'Taylor Health', specialty: 'Sports Nutrition', img: 'https://randomuser.me/api/portraits/women/66.jpg',
    goals: ['Sports Performance', 'Build Muscle'], availability: 'Evenings', experience: 3, location: 'Seattle',
    plans: [
      { id: 7, name: 'Taylor Sports', type: 'Yearly', features: ['Sports Plan', 'Chat'], price: 299 },
    ] },
];
// Remove old plans array

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const bannerSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };
  const cardSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    arrows: true,
  };
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [profileData, setProfileData] = React.useState(null);
  const [subDialogOpen, setSubDialogOpen] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState(null);
  const [subscribedPlanId, setSubscribedPlanId] = React.useState(null);
  const [navOpen, setNavOpen] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);
  const handleSearchClick = () => setShowResults(true);
  const handleCloseResults = () => setShowResults(false);
  const navLinks = [
    { label: 'Home', to: 'banner' },
    { label: 'Features', to: 'features' },
    { label: 'Trainers', to: 'trainers' },
    { label: 'Nutritionists', to: 'nutritionists' },
    { label: 'Plans', to: 'plans' },
    { label: 'Testimonials', to: 'testimonials' },
  ];

  const handleProfileOpen = (profile) => {
    setProfileData(profile);
    setProfileOpen(true);
  };
  const handleProfileClose = () => {
    setProfileOpen(false);
    setProfileData(null);
  };
  const handleConnect = () => {
    // Simulate connect action (show a message or redirect, here just close modal)
    setProfileOpen(false);
    alert('Connection request sent! (simulated)');
  };
  const handleSubscribe = (plan) => {
    setSelectedPlan(plan);
    setSubDialogOpen(true);
  };
  const handleSubDialogClose = () => {
    setSubDialogOpen(false);
    setSelectedPlan(null);
  };
  const handleConfirmSubscribe = () => {
    setSubscribedPlanId(selectedPlan.id);
    setSubDialogOpen(false);
    setSelectedPlan(null);
  };
  // Minimal test slider for debugging
  const testSlides = [
    { color: 'red', label: 'Test Slide 1' },
    { color: 'green', label: 'Test Slide 2' },
    { color: 'blue', label: 'Test Slide 3' },
  ];

  // Unified data for filtering
  const allPros = [
    ...trainers.map(t => ({ ...t, type: 'Trainer', minPrice: Math.min(...t.plans.map(p => p.price)) })),
    ...nutritionists.map(n => ({ ...n, type: 'Nutritionist', minPrice: Math.min(...n.plans.map(p => p.price)) })),
  ];
  // Filter state
  const [filter, setFilter] = React.useState({
    specialty: '',
    goal: '',
    priceMin: '',
    priceMax: '',
    availability: '',
    experience: '',
    location: '',
    search: '',
  });
  const [filteredPros, setFilteredPros] = React.useState(allPros);
  const [loading, setLoading] = React.useState(false);
  // Unique options for dropdowns
  const specialtyOptions = Array.from(new Set(allPros.map(p => p.specialty)));
  const goalOptions = Array.from(new Set(allPros.flatMap(p => p.goals)));
  const availabilityOptions = Array.from(new Set(allPros.map(p => p.availability)));
  // Filter handler
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(f => ({ ...f, [name]: value }));
  };
  // Simulate AJAX filter
  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let result = allPros.filter(p => {
        if (filter.specialty && p.specialty !== filter.specialty) return false;
        if (filter.goal && !p.goals.includes(filter.goal)) return false;
        if (filter.priceMin && p.minPrice < Number(filter.priceMin)) return false;
        if (filter.priceMax && p.minPrice > Number(filter.priceMax)) return false;
        if (filter.availability && p.availability !== filter.availability) return false;
        if (filter.experience && p.experience < Number(filter.experience)) return false;
        if (filter.location && !p.location.toLowerCase().includes(filter.location.toLowerCase())) return false;
        if (filter.search && !p.name.toLowerCase().includes(filter.search.toLowerCase())) return false;
        return true;
      });
      setFilteredPros(result);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [JSON.stringify(filter)]);

  return (
    <Box>
      {/* Navigation Bar */}
      <AppBar position="sticky" color="default" elevation={2} sx={{ mb: 0 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight="bold" sx={{ color: 'primary.main', cursor: 'pointer' }} onClick={() => scroll.scrollToTop()}>
            FitProHub
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
            {navLinks.map(link => (
              <ScrollLink key={link.to} to={link.to} smooth duration={600} offset={-70} style={{ textDecoration: 'none', cursor: 'pointer' }}>
                <Typography variant="button" sx={{ color: 'primary.main', fontWeight: 600, '&:hover': { color: 'secondary.main' } }}>{link.label}</Typography>
              </ScrollLink>
            ))}
          </Box>
          <IconButton edge="end" color="inherit" aria-label="menu" sx={{ display: { xs: 'flex', md: 'none' } }} onClick={() => setNavOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Mobile Drawer */}
      <Drawer anchor="right" open={navOpen} onClose={() => setNavOpen(false)}>
        <Box sx={{ width: 220, mt: 4 }}>
          <List>
            {navLinks.map(link => (
              <ListItem button key={link.to} onClick={() => { setNavOpen(false); scroll.scrollTo(link.to, { smooth: true, duration: 600, offset: -70 }); }}>
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      {/* Static Hero Section (no slider) */}
      <Box id="banner" sx={{
        position: 'relative',
        minHeight: { xs: 400, md: '90vh' },
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(120deg, rgba(20,20,30,0.85) 60%, rgba(30,30,40,0.6) 100%), url('https://images.unsplash.com/photo-1519864600265-abb23847ef2c') center/cover no-repeat`,
      }}>
        {/* Decorative SVG/Icon */}
        <Box sx={{ position: 'absolute', right: 40, bottom: 40, zIndex: 2, display: { xs: 'none', md: 'block' } }}>
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="58" stroke="#fff" strokeDasharray="6 6" strokeWidth="2" opacity="0.2" />
            <rect x="35" y="35" width="50" height="50" rx="25" fill="#1976d2" opacity="0.12" />
            <path d="M60 40 L70 80 L50 80 Z" fill="#fff" opacity="0.18" />
          </svg>
        </Box>
        {/* Hero Content */}
        <Box sx={{ position: 'relative', zIndex: 2, px: { xs: 2, md: 4 }, py: 8, width: '100%', maxWidth: 1100, textAlign: 'center', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Typography variant={isMobile ? 'h4' : 'h2'} fontWeight="bold" sx={{ letterSpacing: 1, mb: 2, lineHeight: 1.15 }}>
            Transform Your Fitness Journey
          </Typography>
          <Typography variant={isMobile ? 'body1' : 'h5'} sx={{ mt: 1, mb: 4, color: 'grey.200', fontWeight: 400 }}>
            Connect with top trainers and nutritionists. Get personalized plans. Track your progress.
          </Typography>
          {/* Modern AJAX Search/Filter UI (moved here) */}
          <Paper elevation={6} sx={{
            mb: 4,
            px: { xs: 2, md: 4 },
            py: { xs: 2, md: 3 },
            borderRadius: 4,
            bgcolor: 'rgba(255,255,255,0.95)',
            boxShadow: 6,
            width: '100%',
            maxWidth: 900,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 0.5 }}>Specialty</Typography>
                <select name="specialty" value={filter.specialty} onChange={handleFilterChange} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #bbb', background: '#fff', fontSize: 16 }}>
                  <option value="">All</option>
                  {specialtyOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 0.5 }}>Goal</Typography>
                <select name="goal" value={filter.goal} onChange={handleFilterChange} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #bbb', background: '#fff', fontSize: 16 }}>
                  <option value="">All</option>
                  {goalOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </Grid>
              <Grid item xs={6} sm={3} md={2}>
                <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 0.5 }}>Min Price</Typography>
                <input name="priceMin" type="number" value={filter.priceMin} onChange={handleFilterChange} placeholder="$" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #bbb', background: '#fff', fontSize: 16 }} />
              </Grid>
              <Grid item xs={6} sm={3} md={2}>
                <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 0.5 }}>Max Price</Typography>
                <input name="priceMax" type="number" value={filter.priceMax} onChange={handleFilterChange} placeholder="$" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #bbb', background: '#fff', fontSize: 16 }} />
              </Grid>
              <Grid item xs={6} sm={3} md={2}>
                <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 0.5 }}>Availability</Typography>
                <select name="availability" value={filter.availability} onChange={handleFilterChange} style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #bbb', background: '#fff', fontSize: 16 }}>
                  <option value="">All</option>
                  {availabilityOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </Grid>
              <Grid item xs={6} sm={3} md={2}>
                <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 0.5 }}>Min Exp (yrs)</Typography>
                <input name="experience" type="number" value={filter.experience} onChange={handleFilterChange} placeholder="Years" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #bbb', background: '#fff', fontSize: 16 }} />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 0.5 }}>Location</Typography>
                <input name="location" value={filter.location} onChange={handleFilterChange} placeholder="City/Region" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #bbb', background: '#fff', fontSize: 16 }} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 0.5 }}>Search Name</Typography>
                <input name="search" value={filter.search} onChange={handleFilterChange} placeholder="Search by name" style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #bbb', background: '#fff', fontSize: 16 }} />
              </Grid>
            </Grid>
            <Button variant="contained" color="primary" size="large" sx={{ mt: 2, borderRadius: 99, fontWeight: 'bold', px: 5 }} onClick={handleSearchClick}>
              Search
            </Button>
          </Paper>
          <Button variant="contained" color="secondary" size="large" sx={{ fontWeight: 'bold', fontSize: 20, px: 5, py: 1.5, borderRadius: 99, boxShadow: 3, mt: 2 }} onClick={() => navigate('/dashboard')}>
            Get Started
          </Button>
        </Box>
      </Box>
      {/* Features Section */}
      <Box id="features" sx={{ py: 10, pb: 8, bgcolor: 'lightgrey', textAlign: 'center' }}>
        <Container maxWidth="lg" sx={{ mx: 'auto' }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>Why Choose FitProHub?</Typography>
          <Grid container spacing={6} justifyContent="center" alignItems="stretch">
            <Grid item xs={12} md={4}>
              <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.light', mb: 2 }}>
                  <CheckCircleIcon />
                </Avatar>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>Personalized Training</Typography>
                <Typography variant="body1" sx={{ color: 'grey.700' }}>
                  Get one-on-one sessions with certified trainers tailored to your goals.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.light', mb: 2 }}>
                  <CheckCircleIcon />
                </Avatar>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>Nutrition Plans</Typography>
                <Typography variant="body1" sx={{ color: 'grey.700' }}>
                  Access meal plans and nutrition advice from expert nutritionists.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.light', mb: 2 }}>
                  <CheckCircleIcon />
                </Avatar>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>Progress Tracking</Typography>
                <Typography variant="body1" sx={{ color: 'grey.700' }}>
                  Monitor your workouts and health metrics in real-time.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Trainers Section (remove results grid from here) */}
      <Box id="trainers" sx={{ py: 10, pb: 8, bgcolor: 'white', textAlign: 'center' }}>
        <Container maxWidth="lg" sx={{ mx: 'auto' }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>Our Trainers & Nutritionists</Typography>
        </Container>
      </Box>
      {/* Nutritionists Section */}
      <Box id="nutritionists" sx={{ py: 10, pb: 8, bgcolor: 'lightgrey', textAlign: 'center' }}>
        <Container maxWidth="lg" sx={{ mx: 'auto' }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>Our Nutritionists</Typography>
          <Grid container spacing={6} justifyContent="center" alignItems="stretch">
            {nutritionists.map(nutritionist => (
              <Grid item xs={12} sm={6} md={4} key={nutritionist.name} display="flex" justifyContent="center">
                <Card sx={{ width: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, mx: 'auto', overflow: 'visible' }}>
                  <Avatar src={nutritionist.img} sx={{ width: 100, height: 100, mb: 2, bgcolor: 'grey.200', color: 'primary.main', fontSize: 36 }}>
                    {(!nutritionist.img || nutritionist.img === '') && nutritionist.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>{nutritionist.name}</Typography>
                  <Typography variant="body2" sx={{ color: 'grey.600', mb: 1 }}>{nutritionist.specialty}</Typography>
                  <Button variant="outlined" color="primary" onClick={() => handleProfileOpen(nutritionist)}>View Profile</Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* Plans Section */}
      <Box id="plans" sx={{ py: 10, pb: 8, bgcolor: 'white', textAlign: 'center' }}>
        <Container maxWidth="lg" sx={{ mx: 'auto' }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>Our Plans</Typography>
          <Grid container spacing={6} justifyContent="center" alignItems="stretch">
            {trainers.flatMap(trainer => trainer.plans).map(plan => (
              <Grid item xs={12} sm={6} md={4} key={plan.id} display="flex" justifyContent="center">
                <Card sx={{ width: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, mx: 'auto' }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>{plan.name}</Typography>
                  <Typography variant="body2" sx={{ color: 'grey.600', mb: 1 }}>{plan.type}</Typography>
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>${plan.price}</Typography>
                  <Button variant="contained" color="primary" onClick={() => handleSubscribe(plan)}>Subscribe</Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* Testimonials Section */}
      <Box id="testimonials" sx={{ py: 10, pb: 8, bgcolor: 'lightgrey', textAlign: 'center' }}>
        <Container maxWidth="lg" sx={{ mx: 'auto' }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>What Our Clients Say</Typography>
          <Grid container spacing={6} justifyContent="center" alignItems="stretch">
            {[{
              text: '"FitProHub changed my life. The trainers are amazing and the nutrition plans are spot on."',
              author: '- Sarah M.'
            }, {
              text: '"I\'ve never felt better. The progress tracking feature is incredible."',
              author: '- John D.'
            }, {
              text: '"The community here is amazing. I\'ve made so many friends."',
              author: '- Emily R.'
            }].map((testimonial, idx) => (
              <Grid item xs={12} md={4} key={idx} display="flex" justifyContent="center">
                <Card sx={{ width: 320, p: 3, mx: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'grey.800', mb: 1 }}>{testimonial.text}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{testimonial.author}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* Footer */}
      <Box sx={{ py: 6, bgcolor: 'primary.main', color: 'white', textAlign: 'center', mt: 0 }}>
        <Typography variant="body2">© 2023 FitProHub. All rights reserved.</Typography>
      </Box>

      {/* Profile Dialog */}
      <Dialog open={profileOpen} onClose={handleProfileClose} maxWidth="sm" fullWidth>
        <DialogTitle>{profileData?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 1 }}>Specialty: {profileData?.specialty}</Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>Plans:</Typography>
          {profileData?.plans?.map(plan => (
            <Box key={plan.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2">{plan.name} ({plan.type}) - ${plan.price}</Typography>
              <Button variant="outlined" color="primary" onClick={() => handleSubscribe(plan)}>Subscribe</Button>
            </Box>
          ))}
          <Button variant="contained" color="primary" onClick={handleConnect}>Connect with {profileData?.name}</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProfileClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Subscription Dialog */}
      <Dialog open={subDialogOpen} onClose={handleSubDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Subscribe to {selectedPlan?.name} Plan</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            You are about to subscribe to the "{selectedPlan?.name}" plan.
            This plan costs ${selectedPlan?.price}.
          </Typography>
          <Typography variant="body2" sx={{ color: 'error.main', mt: 1 }}>
            Note: This is a simulated subscription. No actual payment processing is done.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubDialogClose} color="primary">Cancel</Button>
          <Button onClick={handleConfirmSubscribe} color="primary" variant="contained">Confirm Subscription</Button>
        </DialogActions>
      </Dialog>

      {/* Results Modal */}
      <Dialog open={showResults} onClose={handleCloseResults} maxWidth="lg" fullWidth>
        <DialogTitle>Search Results</DialogTitle>
        <DialogContent dividers sx={{ minHeight: 200, maxHeight: 600, maxWidth: 1100, width: '100%' }}>
          {loading ? (
            <Box sx={{ textAlign: 'center', py: 8 }}><Typography>Loading...</Typography></Box>
          ) : filteredPros.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}><Typography>No results found.</Typography></Box>
          ) : (
            <Grid container spacing={3} justifyContent="flex-start" alignItems="stretch">
              {filteredPros.map(pro => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={pro.name + pro.type} display="flex" justifyContent="center">
                  <Card sx={{ width: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, mx: 'auto', overflow: 'visible' }}>
                    <Avatar src={pro.img} sx={{ width: 100, height: 100, mb: 2, bgcolor: 'grey.200', color: 'primary.main', fontSize: 36 }}>
                      {(!pro.img || pro.img === '') && pro.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>{pro.name} <span style={{ fontWeight: 400, fontSize: 14, color: '#888' }}>({pro.type})</span></Typography>
                    <Typography variant="body2" sx={{ color: 'grey.600', mb: 1 }}>{pro.specialty}</Typography>
                    <Typography variant="body2" sx={{ color: 'grey.600', mb: 1 }}>Goals: {pro.goals.join(', ')}</Typography>
                    <Typography variant="body2" sx={{ color: 'grey.600', mb: 1 }}>From ${pro.minPrice} • {pro.availability} • {pro.experience} yrs • {pro.location}</Typography>
                    <Button variant="outlined" color="primary" onClick={() => handleProfileOpen(pro)}>View Profile</Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResults} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LandingPage; 