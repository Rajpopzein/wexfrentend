import React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { Avatar, Divider } from "@mui/material";
import "./ActivityCard.css";

const ActivityCard = ({ activityName, activityDescription, username }) => {
  return (
    <Card className="activcontencard">
      <CardContent>
        <div className="activity-card-header">
          <Avatar
            src="https://posterjack.ca/cdn/shop/articles/Portriat_Photography_Composition_Tips.jpg?v=1563409841&width=1500"
            alt=""
            ravan
          />
          <Typography className="username-comp" variant="subtitle2" component="div" gutterBottom>
            {username}
          </Typography>
        </div>
        <div className="activeDescription">
             <Typography variant="body1" color="text.primary">
          {activityDescription}
        </Typography>
        </div>
       
        <Divider style={{marginTop:'0.9rem'}}/>
        <div>
            
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
