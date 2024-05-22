import { useEffect, useState, useCallback } from "react";
import { BiSolidCameraOff } from "react-icons/bi";
import { FaCamera, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { MdOutlineScreenShare } from "react-icons/md";
import { MdOutlineStopScreenShare } from "react-icons/md";
import { PiSelectionBackgroundBold } from "react-icons/pi";
import Sidebar from "./Sidebar";
import "../css/JoinScreen.css";
import { useLocation } from "react-router-dom";
import * as bodyPix from "@tensorflow-models/body-pix";
import "@tensorflow/tfjs";

function JoinScreen() {
  const [videoControls, setVideoControls] = useState(false);
  const [audioControls, setAudioControls] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [stream, setStream] = useState(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const location = useLocation();
  const { candidateName } = location.state || {};

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

  // useEffect(() => {
  //   if (stream) {
  //     const videoElement = document.querySelector("video#localVideo");
  //     videoElement.addEventListener("loadeddata", () => {
  //       setIsVideoLoaded(true);
  //     });
  //   }
  // }, [stream]);

  // useEffect(() => {
  //   if (isVideoLoaded) {
  //     loadAndPredict();
  //   }
  // }, [isVideoLoaded]);

  // async function loadAndPredict() {
  //   let net = await bodyPix.load();

  //   const videoElement = document.querySelector("video#localVideo");
  //   const canvasElement = document.querySelector("canvas#outputCanvas");
  //   const ctx = canvasElement.getContext("2d");

  //   const processFrame = async () => {
  //     const segmentation = await net.segmentPerson(videoElement);
  //     const maskBackground = bodyPix.toMask(segmentation);
  //     bodyPix.drawMask(
  //       canvasElement,
  //       videoElement,
  //       maskBackground,
  //       { r: 0, g: 0, b: 0, a: 255 },
  //       0,
  //       false
  //     );
  //     requestAnimationFrame(processFrame);
  //   };
  //   processFrame();
  // }

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
{/* 
          <PiSelectionBackgroundBold size={"1.6rem"} className="control-icon" onClick={loadAndPredict}/>
         {isVideoLoaded && <canvas id="outputCanvas"></canvas>}  */}
        </div>
        
      </div>
    </div>
  );
}

export default JoinScreen;
