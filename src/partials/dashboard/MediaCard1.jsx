import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from "../../images/Insomnia.jpg"

export default function MediaCard1() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={Image}
        title="sleepless lady"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        Insomnia: Symptoms, Causes, and Treatments
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Insomnia is one of the most common health concerns among adults. Insomnia causes sleep issues that interfere with daily life and can be debilitating for some people. Many factors may contribute to insomnia, including stress, medications, and an individual’s sleep habits and environment.
        </Typography>
      </CardContent>
      <CardActions>
        <Link to="https://www.sleepfoundation.org/insomnia" target='_blank'>
          <Button size="small">Learn More</Button>
        </Link>
        
      </CardActions>
    </Card>
  );
}