import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "../../images/sleepEnvironment.jpg";

export default function MediaCard3() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={Image}
        title="cozy dark room"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" >
          A Restful Sleep Environment
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} className="pt-5">
        One potential barrier to a good night’s sleep is your sleep environment. Sleep environment refers to your bedroom and other nighttime surroundings. Your sleep environment includes important qualities, like the temperature as well as levels of humidity, light, and noise. Having the right sleep environment can mean the difference between a night of restful, restorative sleep or one filled with uncomfortable tossing and turning.
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          to="https://www.sleepfoundation.org/bedroom-environment"
          target="_blank"
        >
          <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
