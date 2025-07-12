import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Button, TextField } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

const AITools = () => {
  const [workout, setWorkout] = useState('');
  const [meal, setMeal] = useState('');
  const [posture, setPosture] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleWorkout = () => setWorkout('AI Suggestion: 30 min HIIT, 15 min core, 10 min stretching.');
  const handleMeal = () => setMeal('AI Meal Plan: Oatmeal breakfast, grilled chicken salad lunch, salmon & veggies dinner.');
  const handlePosture = () => setPosture('AI detected: Good posture! Keep your back straight.');
  const handleFeedback = () => setFeedback('Smart Feedback: Your water intake was lower this week. Let’s increase it!');

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" mb={3}>AI-Assisted Tools</Typography>
      <Grid container spacing={3}>
        {/* AI Workout Suggestion */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <FitnessCenterIcon color="primary" sx={{ fontSize: 40 }} />
            <Typography variant="h6" fontWeight="bold" mt={1}>AI Workout Suggestion</Typography>
            <Button variant="outlined" size="small" onClick={handleWorkout} sx={{ mt: 1 }}>Generate</Button>
            <Typography variant="body2" sx={{ mt: 1 }}>{workout}</Typography>
          </Paper>
        </Grid>
        {/* AI Meal Plan Generator */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <RestaurantMenuIcon color="success" sx={{ fontSize: 40 }} />
            <Typography variant="h6" fontWeight="bold" mt={1}>AI Meal Plan</Typography>
            <Button variant="outlined" size="small" onClick={handleMeal} sx={{ mt: 1 }}>Generate</Button>
            <Typography variant="body2" sx={{ mt: 1 }}>{meal}</Typography>
          </Paper>
        </Grid>
        {/* Posture Detection */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <VisibilityIcon color="info" sx={{ fontSize: 40 }} />
            <Typography variant="h6" fontWeight="bold" mt={1}>Posture Detection</Typography>
            <Button variant="outlined" size="small" onClick={handlePosture} sx={{ mt: 1 }}>Analyze</Button>
            <Typography variant="body2" sx={{ mt: 1 }}>{posture}</Typography>
          </Paper>
        </Grid>
        {/* Smart Feedback */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <TipsAndUpdatesIcon color="warning" sx={{ fontSize: 40 }} />
            <Typography variant="h6" fontWeight="bold" mt={1}>Smart Feedback</Typography>
            <Button variant="outlined" size="small" onClick={handleFeedback} sx={{ mt: 1 }}>Get Feedback</Button>
            <Typography variant="body2" sx={{ mt: 1 }}>{feedback}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AITools; 