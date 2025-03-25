import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "../../images/cbt.avif";

export default function MediaCard4() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={Image}
        title="cozy dark room"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" >
          Cognitive Behavioral Therapy for Insomnia (CBT-I)
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} className="pt-5">
        CBT-I focuses on exploring the connection between the way we think, the things we do, and how we sleep. During treatment, a trained CBT-I provider helps to identify thoughts, feelings, and behaviors that are contributing to the symptoms of insomnia. Thoughts and feelings about sleep are examined and tested to see if they’re accurate, while behaviors are examined to determine if they promote sleep. Sessions may include cognitive, behavioral, and educational components.
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          to="https://stanfordhealthcare.org/medical-treatments/c/cognitive-behavioral-therapy-insomnia/procedures.html"
          target="_blank"
        >
          <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
