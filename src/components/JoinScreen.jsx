import { useEffect, useState, useCallback } from "react";
import { BiSolidCameraOff } from "react-icons/bi";
import { FaCamera, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { MdOutlineScreenShare } from "react-icons/md";
import { MdOutlineStopScreenShare } from "react-icons/md";
import Sidebar from "./Sidebar";
import "../css/JoinScreen.css";
import { useLocation } from "react-router-dom";

function JoinScreen() {
  const location = useLocation();
  const { candidateName } = location.state || {};

  const [videoControls, setVideoControls] = useState(false);
  const [audioControls, setAudioControls] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [stream, setStream] = useState(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const [avatarBgColor, setAvatarBgColor] = useState(generateRandomColor());

  const playVideoFromCamera = useCallback(async () => {
    try {
      const constraints = { video: videoControls, audio: audioControls };
      let stream;
      if (isScreenSharing) {
        stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      } else {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      }
      const videoElement = document.querySelector("video#localVideo");
      videoElement.srcObject = stream;
      setStream(stream);
    } catch (error) {
      console.error("Error opening video camera.", error);
    }
  }, [videoControls, audioControls, isScreenSharing]);

  useEffect(() => {
    playVideoFromCamera();
  }, [playVideoFromCamera]);

  const toggleVideo = useCallback(() => {
    setVideoControls((prevState) => {
      const newState = !prevState;
      if (stream) {
        stream.getVideoTracks().forEach((track) => (track.enabled = newState));
      }
      return newState;
    });
  }, [stream]);

  const toggleAudio = useCallback(() => {
    setAudioControls((prevState) => {
      const newState = !prevState;
      if (stream) {
        stream.getAudioTracks().forEach((track) => (track.enabled = newState));
      }
      return newState;
    });
  }, [stream]);

  const toggleScreenSharing = useCallback(async () => {
    setIsScreenSharing((prevState) => !prevState);
  }, []);

  const toggleFullScreen = () => {
    const videoElement = document.querySelector("video#localVideo");
    if (!document.fullscreenElement) {
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      }
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullScreen(false);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div className="join-screen">
        {videoControls || isScreenSharing ? (
          <video
            id="localVideo"
            autoPlay
            playsInline
            controls={false}
            className="video-element"
          />
        ) : (
          <div className="avatar-container">
            <div
              className="avatar-circle"
              style={{ backgroundColor: avatarBgColor }}
            >
              <span className="avatar-initial">
                {candidateName ? candidateName.charAt(0).toUpperCase() : ""}
              </span>
            </div>
          </div>
        )}

        <div className="controls">
          {videoControls ? (
            <FaCamera
              size={"1.6rem"}
              className="control-icon"
              onClick={toggleVideo}
            />
          ) : (
            <BiSolidCameraOff
              size={"1.6rem"}
              className="control-icon"
              onClick={toggleVideo}
            />
          )}
          {audioControls ? (
            <FaMicrophone
              size={"1.6rem"}
              className="control-icon"
              onClick={toggleAudio}
            />
          ) : (
            <FaMicrophoneSlash
              size={"1.6rem"}
              className="control-icon"
              onClick={toggleAudio}
            />
          )}
          {isScreenSharing ? (
            <MdOutlineStopScreenShare
              size={"1.6rem"}
              className="control-icon"
              onClick={toggleScreenSharing}
            />
          ) : (
            <MdOutlineScreenShare
              size={"1.6rem"}
              className="control-icon"
              onClick={toggleScreenSharing}
            />
          )}

          {isFullScreen ? (
            <MdFullscreenExit
              size={"1.6rem"}
              className="control-icon"
              onClick={toggleFullScreen}
            />
          ) : (
            <MdFullscreen
              size={"1.6rem"}
              className="control-icon"
              onClick={toggleFullScreen}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default JoinScreen;
