import React from "react";
import { Card, CardContent, Typography, Avatar } from "@mui/material";
import "./ProfileComponent.css";

const ProfileComponent = (data) => {
  console.log("data", data);
  return (
    <Card className="profileCardComp">
      <CardContent>
        <div className="activity-card-header">
          <Avatar
            src="https://posterjack.ca/cdn/shop/articles/Portriat_Photography_Composition_Tips.jpg?v=1563409841&width=1500"
            alt={data?.data?.data?.name}
            ravan
          />
          <div style={{ marginTop: "0.4rem", marginLeft: "0.4rem" }}>
            <Typography
              className="username-comp"
              variant="subtitle2"
              component="div"
            >
              {data?.data?.data?.name}
            </Typography>
            <Typography
              className="username-comp"
              variant="subtitle3"
              component="div"
            >
              {data?.data?.data?.email}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileComponent;
