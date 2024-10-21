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
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import Popper from "@mui/material/Popper";
import { Box } from "@mui/material";
import Popover from "@mui/material/Popover";

const DashBoard = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const [alluser, setAlluser] = useState([]);
  const [allPosts, setAllpost] = useState([]);
  const [allUsers, setAllusers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredUser, setHoveredUser] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [popperOpen, setPopperOpen] = useState(false);

  const names = ["public", "friends"];

  const postdata = async () => {
    const data = await axios.get(
      `https://wexbackend-1.onrender.com/api/posts/${decodedToken?.data?.id}/feed`
    );
    setAllpost(data?.data);
  };

  const getalluser = async () => {
    const data = await axios.get(
      `https://wexbackend-1.onrender.com/api/users/${decodedToken?.data?.id}/exclude-self-friends`
    );
    setAllusers(data?.data);
  };
  const userData = async () => {
    const data = await axios.get(
      `https://wexbackend-1.onrender.com/api/users/${decodedToken?.data?.id}/friends`
    );
    setAlluser(data?.data);
  };

  useEffect(() => {
    getalluser();
    postdata();
    userData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFriend = async () => {
    setButtonDisabled(true);
    const value = {
      friendId: hoveredUser._id,
    };
    const data = await axios.put(
      `https://wexbackend-1.onrender.com/api/users/${decodedToken?.data?.id}/add-friend`,
      value
    );
    if (data.status === 200) {
      toast("Friend added successfully");
      setButtonDisabled(false);
      getalluser();
      userData();
    }
  };
  // Formik setup
  const formik = useFormik({
    initialValues: {
      content: "",
      visibility: "",
    },
    validationSchema: Yup.object({
      content: Yup.string().required("Please enter a post content"),
      visibility: Yup.string().required(
        "Please select at least one visibility option"
      ),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post(
          `https://wexbackend-1.onrender.com/api/posts/${decodedToken?.data?.id}/create`,
          { ...values, userId: decodedToken.data.id }
        );
        postdata();
        toast("Post created successfully");
        resetForm();
      } catch (error) {
        console.error("Error creating post", error);
      }
    },
  });
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoverdata, setHoveredData] = useState({});
  const [btndis, SetBtndis] = useState(false);
  const [openpop, setOpenPop] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // const handleaddfrnd = async () => {
  //   SetBtndis(true);
  //   const value = {
  //     friendId: hoverdata._id,
  //   };
  //   const data = await axios.put(
  //     `https://wexbackend-1.onrender.com/api/users/${decodedToken?.data?.id}/add-friend`,
  //     value
  //   );
  //   if (data.status === 200) {
  //     toast("Friend added successfully");
  //     SetBtndis(false);
  //     getalluser();
  //     userData();
  //   }
  // };

  return (
    <div className="dashboard-main">
      <div className="welcome_note">
        <Card className="friend-list">
          <Typography style={{ marginBottom: "1rem" }}>Add Friends</Typography>
          <input
            id="outlined-required"
            placeholder="Search for friends"
            className="search-for-frind"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {filteredUsers.length === 0 && (
            <p style={{ fontSize: "0.8rem", marginTop: "5px" }}>
              No friends found
            </p>
          )}
          {filteredUsers.length === 0 && (
            <p style={{ fontSize: "0.8rem", marginTop: "5px" }}>
              No friends found
            </p>
          )}
          <List
            sx={{ width: "100%", bgcolor: "background.paper" }}
            className="all-user-list"
          >
            {filteredUsers.map((user, index) => (
              <ListItem
                key={index}
                onMouseEnter={(event) => {
                  setHoveredIndex(index);
                  setHoveredUser(user);
                  setPopperOpen(true);
                  setAnchorEl(event.currentTarget);
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setPopperOpen(false);
                  setAnchorEl(null);
                }}
                sx={{ position: "relative", cursor: "pointer" }}
              >
                <ListItemAvatar>
                  <Avatar src="" alt={user.name} />
                </ListItemAvatar>
                <ListItemText primary={user.name} secondary={user.email} />
                {hoveredIndex === index && (
                  <Popper
                    open={popperOpen}
                    anchorEl={anchorEl}
                    placement="right"
                  >
                    <Box className="poper">
                      <Typography>Add {user.name} as a friend</Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddFriend}
                        disabled={buttonDisabled}
                        sx={{ marginTop: "0.5rem" }}
                      >
                        Add Friend
                      </Button>
                    </Box>
                  </Popper>
                )}
              </ListItem>
            ))}
          </List>
        </Card>
      </div>
      <div className="activity_card_section">
        <Card className="postcreation-card">
          <form onSubmit={formik.handleSubmit}>
            <TextField
              onChange={formik.handleChange}
              value={formik.values.content}
              name="content"
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
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
            />
            <FormControl
              style={{ marginRight: "1rem", width: "100px" }}
              error={
                formik.touched.visibility && Boolean(formik.errors.visibility)
              }
            >
              <Select
                className="select-selectp"
                displayEmpty
                value={formik.values.visibility}
                onChange={formik.handleChange}
                name="visibility"
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Visibility</em>;
                  }
                  return selected;
                }}
              >
                <MenuItem disabled value="">
                  <em>Visibility</em>
                </MenuItem>
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.visibility && formik.errors.visibility && (
                <Typography color="error" variant="caption">
                  {formik.errors.visibility}
                </Typography>
              )}
            </FormControl>
            <button type="submit" className="add-post-btn">
              Add Post
            </button>
          </form>
        </Card>
        {allPosts &&
          allPosts.map((post, index) => (
            <ActivityCard
              key={index}
              username={post.userId.name}
              activityDescription={post.content}
            />
          ))}
      </div>
      <div className="profile">
        <ProfileComponent data={decodedToken} />
        <Card className="mainuserlistcard">
          <p style={{ fontWeight: "500", marginBottom: "0.1rem" }}>Friends</p>
          {alluser.length === 0 && (
            <p style={{ fontSize: "0.8rem" }}>No friends found</p>
          )}
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {alluser &&
              alluser.map((user, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar src="" alt={user.friendId.name} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.friendId.name}
                    secondary={user.friendId.email}
                  />
                </ListItem>
              ))}
          </List>
        </Card>
      </div>
    </div>
  );
};

export default DashBoard;
