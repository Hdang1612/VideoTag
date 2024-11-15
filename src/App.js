import React, { useState, useEffect } from "react";
import "./App.css";
import VideoPlayer from "./component/VideoPlayer";
import { toast } from "react-toastify";
const App = () => {
  const [videoData, setVideoData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const apiUrl = "http://localhost:5000/videos";

  // Fetch video data from API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setVideoData(data);
        if (data.length > 0) {
          setInputValue(data[0].text); // Set initial value
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        toast.error("Failed to fetch video data!");
      }
    };

    fetchVideos();
  }, []);

  const handleNext = () => {
    if (currentIndex < videoData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setInputValue(videoData[nextIndex].text);
    } else {
      toast.info("This is the last video.");
    }
  };

  const handleSubmit = async () => {
    if (!videoData[currentIndex]) return;

    const updatedVideo = { ...videoData[currentIndex], text: inputValue };

    try {
      const response = await fetch(`${apiUrl}/${updatedVideo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedVideo),
      });

      if (!response.ok) {
        throw new Error(`Failed to update video: ${response.status}`);
      }

      toast.success("Video updated successfully!");
    } catch (error) {
      console.error("Error updating video:", error);
      toast.error("An error occurred while updating the video.");
    }
  };

  return (
    <div className="App" >
      <VideoPlayer
        video={videoData[currentIndex]?.link}
        text={inputValue}
        onTextChange={(e) => setInputValue(e.target.value)}
      />
      <div className="button-container" style={{display:'flex ', justifyContent:'space-around' }}>
        <button onClick={handleNext}>Next</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default App;
