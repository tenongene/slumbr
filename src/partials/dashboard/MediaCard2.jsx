import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from "../../images/healthySleep.jpg";

export default function MediaCard2() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={Image}
        title="healthy sleep lady"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        Healthy Sleep Habits
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Your daily routines – what you eat and drink, the medications you take, how you schedule your days and how you choose to spend your evenings – can significantly impact your quality of sleep. Even a few slight adjustments can, in some cases, mean the difference between sound sleep and a restless night.
        </Typography>
      </CardContent>
      <CardActions>
        <Link to="https://sleepeducation.org/healthy-sleep/healthy-sleep-habits/" target='_blank'>
          <Button size="small">Learn More</Button>
        </Link>
        
      </CardActions>
    </Card>
  );
}