import React from "react";
import "./style.css";
const VideoPlayer = ({ video, text, onTextChange }) => {
  return (
    <div className="video-player-container">
      <div id="video-container">
        <video
          id="video-player"
          controls
          src={video || ""}
          style={{
            width: "100%", 
            height: "100%", 
            objectFit: "contain",
          }}
        ></video>
      </div>
      <div className="input-container">
        <label htmlFor="text-input" style={{ marginBottom: "12px", marginRight:'20px' }}>
          Message
        </label>
        <input
          type="text"
          id="text-input"
          placeholder="Enter label for the video"
          value={text || ""}
          onChange={onTextChange}
          style={{
            padding: "10px",
            width: "80%",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
