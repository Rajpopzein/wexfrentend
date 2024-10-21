import React, { useEffect } from "react";
import "./chatpage.css";
import SearchIcon from "@mui/icons-material/Search";
import MicNoneIcon from "@mui/icons-material/MicNone";
import Chatcard from "../../component/chatCard/Chatcard.jsx";
import { Avatar, Button } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import SettingsIcon from "@mui/icons-material/Settings";
import ChatBubble from "../../component/chatbuble/ChatBubble.jsx";
import { io } from "socket.io-client";

const ChatPage = () => {
  const socket = io("http://localhost:8000");
  useEffect(() => {
    socket.on("connection", () => {
      console.log("Connected to server:", socket.id);
    });

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const images = [
    "http://i.imgur.com/XMFU15Sb.jpg",
    "http://i.imgur.com/6auJ65mb.jpg",
    "http://i.imgur.com/KaIJClxb.jpg",
    "http://i.imgur.com/IRBPlFdb.jpg",
    "http://i.imgur.com/a5EwJB1b.jpg",
    "http://i.imgur.com/daKDMh1b.jpg",
    "http://i.imgur.com/6GQGGDFb.jpg",
    "http://i.imgur.com/B4tpgOBb.jpg",
    "http://i.imgur.com/RDcAPJ2b.jpg",
    "http://i.imgur.com/tHbhIL9b.jpg",
    "http://i.imgur.com/Brj3HfBb.jpg",
    "http://i.imgur.com/EMLzoedb.jpg",
    "http://i.imgur.com/GMGjufGb.jpg",
    "http://i.imgur.com/yc0xclAb.jpg",
    "http://i.imgur.com/GwJ0BUSb.jpg",
    "http://i.imgur.com/91Fedvgb.jpg",
    "http://i.imgur.com/t3TgKAgb.jpg",
    "http://i.imgur.com/hmfY4nxb.jpg",
    "http://i.imgur.com/5OvqlJJb.jpg",
    "http://i.imgur.com/fg5hPUyb.jpg",
    "http://i.imgur.com/VF0Ilgrb.jpg",
    "http://i.imgur.com/Q1mMRpyb.jpg",
    "http://i.imgur.com/6p3uH8Tb.jpg",
    "http://i.imgur.com/vYMqieHb.jpg",
    "http://i.imgur.com/DtXTpBQb.jpg",
    "http://i.imgur.com/dJ3ztdqb.jpg",
    "http://i.imgur.com/7ihvHWOb.jpg",
    "http://i.imgur.com/cfhuvtrb.jpg",
    "http://i.imgur.com/i476LlHb.jpg",
    "http://i.imgur.com/6NyC3tTb.jpg",
    "http://i.imgur.com/I7IUNsib.jpg",
    "http://i.imgur.com/A9DAUg7b.jpg",
    "http://i.imgur.com/3IJht9Jb.jpg",
    "http://i.imgur.com/LAH9mtfb.jpg",
    "http://i.imgur.com/V0XKFJtb.jpg",
    "http://i.imgur.com/Pc2aKXzb.jpg",
    "http://i.imgur.com/1aJHCPeb.jpg",
    "http://i.imgur.com/w2dNcr8b.jpg",
    "http://i.imgur.com/e7pVL6ib.jpg",
    "http://i.imgur.com/hm5jEDHb.jpg",
    "http://i.imgur.com/vvpYgSEb.jpg",
    "http://i.imgur.com/WktrkEkb.jpg",
    "http://i.imgur.com/UnQQ41Rb.jpg",
    "http://i.imgur.com/1wft3bDb.jpg",
    "http://i.imgur.com/aovgMf9b.jpg",
    "http://i.imgur.com/5FwL3ppb.jpg",
    "http://i.imgur.com/flaXRSWb.jpg",
    "http://i.imgur.com/CjS3Zbfb.jpg",
    "http://i.imgur.com/4pnOM3Cb.jpg",
    "http://i.imgur.com/Ch1HvFsb.jpg",
  ];
  return (
    <div className="chatpage_main">
      <div className="chatpage_recent_messages_users">
        <p className="chat_head_text">Chat</p>
        <div className="main_search_bar">
          <SearchIcon className="prefix_search_icon" />
          <input
            type="text"
            placeholder="Search here.."
            className="search_bar_message"
          />
          <MicNoneIcon className="suffix_search_icon" />
        </div>
        <p className="chat_head_text">Message</p>
        <div className="message_list_person">
          {Array(8)
            .fill()
            .map((_, index) => (
              <Chatcard key={index} />
            ))}
        </div>
      </div>
      <div className="chatpage_message_box">
        <div className="message_box_header">
          <div className="image_chat_div">
            <Avatar
              alt="Remy Sharp"
              src="https://posterjack.ca/cdn/shop/articles/Portriat_Photography_Composition_Tips.jpg?v=1563409841&width=1500"
            />
            <div className="name_lastseen">
              <p>Name</p>
              <p>Last seen: 2 hours ago</p>
            </div>
          </div>
        </div>
        <div className="message_box_body">
          <ChatBubble
            message="Hello, how are you?"
            images="https://posterjack.ca/cdn/shop/articles/Portriat_Photography_Composition_Tips.jpg?v=1563409841&width=1500'"
          />
          <ChatBubble
            message="Hi Im good, how about you"
            alinement={true}
            images="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/15cfd3e2-8927-411a-8a93-37251abdd93b/depjx48-a09dc713-da41-4f71-9abd-dc61044b5763.png/v1/fit/w_401,h_602,q_70,strp/random_people_portrait_from_pinterest_by_iskovela_depjx48-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjAyIiwicGF0aCI6IlwvZlwvMTVjZmQzZTItODkyNy00MTFhLThhOTMtMzcyNTFhYmRkOTNiXC9kZXBqeDQ4LWEwOWRjNzEzLWRhNDEtNGY3MS05YWJkLWRjNjEwNDRiNTc2My5wbmciLCJ3aWR0aCI6Ijw9NDAxIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.qwtKskUkT_0FE1AH93Delld_dgDqiPSlA5BBtauCwRU"
          />
        </div>
        <form
          onSubmit={(e) => {
            console.log(e);
          }}
        >
          <div className="message_box_footer">
            <AttachFileIcon className="icon_msg" />
            <input
              type="text"
              placeholder="Type a message"
              className="msg-txt-fld"
            />
            <div style={{ display: "flex" }}>
              <Button type="submit" className="send_btn">
                <SendIcon />
              </Button>
              <MicNoneIcon className="icon_msg" />
            </div>
          </div>
        </form>
      </div>
      <div className="main_profile">
        <div className="image_chat_div">
          <Avatar
            alt="Remy Sharp"
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/15cfd3e2-8927-411a-8a93-37251abdd93b/depjx48-a09dc713-da41-4f71-9abd-dc61044b5763.png/v1/fit/w_401,h_602,q_70,strp/random_people_portrait_from_pinterest_by_iskovela_depjx48-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjAyIiwicGF0aCI6IlwvZlwvMTVjZmQzZTItODkyNy00MTFhLThhOTMtMzcyNTFhYmRkOTNiXC9kZXBqeDQ4LWEwOWRjNzEzLWRhNDEtNGY3MS05YWJkLWRjNjEwNDRiNTc2My5wbmciLCJ3aWR0aCI6Ijw9NDAxIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.qwtKskUkT_0FE1AH93Delld_dgDqiPSlA5BBtauCwRU"
          />
          <div className="name_lastseen">
            <p>Name</p>
            <p>Last seen: 2 hours ago</p>
          </div>
          <SettingsIcon className="settings_icon" />
        </div>
        <div className="file_contents">
          <div className="file_header">
            <div style={{ display: "flex" }}>
              <p>Media</p>
              <p style={{ fontSize: "12px", marginLeft: "5px" }}>23</p>
            </div>
            <p style={{ fontSize: "12px" }}>See All</p>
          </div>
        </div>
        <div className="image_gal">
          {Array(5)
            .fill()
            .map((_, index) => (
              <img
                alt="imag"
                src={images[Math.floor(Math.random() * images.length)]}
                key={index}
              />
            ))}
        </div>
        <div className="file_contents">
          <div className="file_header">
            <div style={{ display: "flex", alignItems: "center" }}>
              <p>Files</p>
              <p style={{ fontSize: "12px", marginLeft: "5px" }}>23</p>
            </div>
            <p style={{ fontSize: "12px" }}>See All</p>
          </div>
        </div>
        <div className="file_details">
          {Array(4)
            .fill()
            .map((_, index) => (
              <div className="file_div" key={index}>
                <Avatar />
                <div className="file_with_details">
                  <p>File Name</p>
                  <div>
                    <p>File Size</p>
                    <p>File Type</p>
                    <p>File Date</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
