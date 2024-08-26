import React, { useContext } from "react";
import "./Main.css";
import { assets } from "./../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const { recpromt, onSent, showresult, Load, resultData, setinput, input } =
    useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <img className="ham" src={assets.menu_icon} alt="" />
        <p>Gemini</p>
        <img className="acc" src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showresult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello , Ayush</span>
              </p>
              <p>How can i help you</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on upcoming road trips</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Brief this Subject</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>BrainStrom this ideas</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve Readabiliity</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recpromt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {Load ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => {
                setinput(e.target.value);
              }}
              value={input}
              className="box"
              type="text"
              placeholder="Enter the prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>
          <p className="foot">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
