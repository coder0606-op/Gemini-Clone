import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "./../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setextended] = useState(false);
  const { onSent, newChat, prevprompts, setrecprompt } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setrecprompt(prompt);
    await onSent(prompt);
  };

  return (
    <>
      <div className="sidebar">
        <div className="top">
          <img
            onClick={() => setextended((prev) => !prev)}
            className="menu"
            src={assets.menu_icon}
            alt=""
          />
          <div onClick={() => newChat()} className="newchat">
            <img src={assets.plus_icon} alt="" />
            {extended ? <p>New Chat</p> : null}
          </div>
          {extended ? (
            <div className="recent">
              <p className="recent-title">Recent</p>
              {Array.isArray(prevprompts) &&
                prevprompts.map((item, index) => {
                  return (
                    <div
                      onClick={() => loadPrompt(item)}
                      className="recent_entry"
                      key={index}
                    >
                      <img src={assets.message_icon} alt="" />
                      <p>{item.slice(0, 15)}...</p>
                    </div>
                  );
                })}
            </div>
          ) : null}
        </div>
        <div className="bottom">
          <div className="bottom-item recent_entry">
            <img src={assets.question_icon} alt="" />
            {extended ? <p>Help</p> : null}
          </div>
          <div className="bottom-item recent_entry">
            <img src={assets.history_icon} alt="" />
            {extended ? <p> Activity</p> : null}
          </div>
          <div className="bottom-item recent_entry">
            <img src={assets.setting_icon} alt="" />
            {extended ? <p>Setting</p> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
