import React, { useEffect, useState } from "react";
import "./DashBoard.css";
import ActivityCard from "../../component/activityComponent/ActivityCard.jsx";
import ProfileComponent from "../../component/activityComponent/ProfileComponent.jsx";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { Avatar, Typography } from "@mui/material";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { jwtDecode } from "jwt-decode";

const DashBoard = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const [alluser, setAlluser] = useState([]);
  const [allPosts, setAllpost] = useState([]);
  const [newPost, setNewpost] = useState({
    userId: decodedToken.data.id,
    content: "",
    visibility: "public",
  });

  const postdata = async () => {
    const data = await axios.get(
      `http://54.145.12.92:8000/api/posts/${decodedToken?.data?.id}/feed`
    );
    console.log(data?.data);
    setAllpost(data?.data);
  };

  useEffect(() => {
    const userData = async () => {
      const data = await axios.get(
        `http://54.145.12.92:8000/api/users/all-users/${decodedToken?.data?.id}`
      );

      setAlluser(data?.data);
    };
    postdata();
    userData();
  }, []);

  const handleNewpostContent = (e) => {
    setNewpost({ ...newPost, content: e.target.value });
  };

  const handleSubmitpostContent = async (e) => {
    e.preventDefault();
    if (newPost.content.trim() === "") {
      alert("Please enter a post content");
      return;
    }
    axios
      .post(
        `http://54.145.12.92:8000/api/posts/${decodedToken?.data?.id}/create`,
        newPost
      )
      .then((response) => {
        console.log(response);
        postdata();
      });

    setNewpost({
      userId: decodedToken?.data?.id,
      content: "",
      visibility: "public",
    });
  };
  return (
    <div className="dashboard-main">
      <div className="welcome_note">
        <Card className="friend-list">
          <Typography style={{ marginBottom: "1rem" }}>Add Friends</Typography>
          <input
            id="outlined-required"
            placeholder="search for friends"
            className="search-for-frind"
          />
        </Card>
      </div>
      <div className="activity_card_section">
        <Card className="postcreation-card">
          <form>
            <TextField
              onChange={handleNewpostContent}
              value={newPost.content}
              id="outlined-multiline-flexible"
              label="Add your Feed"
              multiline
              maxRows={4}
              className="postcreation-input"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "inherit",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "inherit",
                    boxShadow: "none",
                  },
                },
              }}
            />
            <button onClick={handleSubmitpostContent} className="add-post-btn">
              Add Post
            </button>
          </form>
        </Card>
        {allPosts &&
          allPosts.map((post) => (
            <ActivityCard
              username={post.userId.name}
              activityDescription={post.content}
            />
          ))}
      </div>
      <div className="profile">
        <ProfileComponent />
        <Card className="mainuserlistcard">
          <p style={{ fontWeight: "500", marginBottom: "0.1rem" }}>All Users</p>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {alluser &&
              alluser.map((user) => (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src="" alt={user.name} />
                  </ListItemAvatar>
                  <ListItemText primary={user.name} secondary="online" />
                </ListItem>
              ))}
          </List>
        </Card>
      </div>
    </div>
  );
};

export default DashBoard;
