import { useEffect, useState, useCallback } from "react";
import { BiSolidCameraOff } from "react-icons/bi";
import { FaCamera, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { MdOutlineScreenShare } from "react-icons/md";
// import { MdOutlineStopScreenShare } from "react-icons/md";
import { HiOutlinePhoneMissedCall } from "react-icons/hi";
import styles from "../../css/joinScreen.module.css";
import { useLocation, useNavigate } from "react-router-dom";

function JoinScreen() {
  const [videoControls, setVideoControls] = useState(false);
  const [audioControls, setAudioControls] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [stream, setStream] = useState(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { candidateName } = location.state || {};

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const [avatarBgColor] = useState(generateRandomColor());

  const playVideoFromCamera = useCallback(async () => {
    try {
      const constraints = { video: videoControls, audio: audioControls };
      let stream;
      if (isScreenSharing) {
        stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        stream.getVideoTracks()[0].onended = function () {
          setIsScreenSharing(false);
          setStream(null);
        };
      } else {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      }
      const videoElement = document.querySelector("video#localVideo");
      if (videoElement) {
        videoElement.srcObject = stream;
      }
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

  useEffect(() => {
    if (stream) {
      // Update the audio track if the audioControls state changes
      stream
        .getAudioTracks()
        .forEach((track) => (track.enabled = audioControls));
    }
  }, [audioControls, stream]);

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
    try {
      if (!isScreenSharing) {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        setIsScreenSharing(true);
        setStream(stream);
        stream.getVideoTracks()[0].onended = function () {
          setIsScreenSharing(false);
          setStream(null);
        };
      } else {
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
        setIsScreenSharing(false);
        setStream(null);
      }
    } catch (error) {
      console.error("Error during screen sharing:", error);
      setIsScreenSharing(false);
    }
  }, [isScreenSharing, stream]);

  const toggleFullScreen = () => {
    const videoElement = document.querySelector("video#localVideo");
    const avatarContainer = document.querySelector(
      `.${styles.avatarContainer}`
    );

    const elementToFullscreen = videoElement || avatarContainer;

    if (elementToFullscreen) {
      if (!document.fullscreenElement) {
        if (elementToFullscreen.requestFullscreen) {
          elementToFullscreen.requestFullscreen();
        } else if (elementToFullscreen.mozRequestFullScreen) {
          /* Firefox */
          elementToFullscreen.mozRequestFullScreen();
        } else if (elementToFullscreen.webkitRequestFullscreen) {
          /* Chrome, Safari and Opera */
          elementToFullscreen.webkitRequestFullscreen();
        } else if (elementToFullscreen.msRequestFullscreen) {
          /* IE/Edge */
          elementToFullscreen.msRequestFullscreen();
        }
        setIsFullScreen(true);
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          /* Firefox */
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          /* Chrome, Safari and Opera */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          /* IE/Edge */
          document.msExitFullscreen();
        }
        setIsFullScreen(false);
      }
    } else {
      setIsFullScreen(false);
      console.warn("No element found to toggle full screen.");
    }
  };

  const handleLeaveMeeting = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setVideoControls(false);
      setAudioControls(false);
      setIsScreenSharing(false);
      setIsFullScreen(false);
    }
    navigate("/createMeeting");
  };
  return (
    <div className={styles.joinScreen}>
      {videoControls || isScreenSharing ? (
        <video
          id="localVideo"
          autoPlay
          muted
          playsInline
          controls={false}
          className={styles.videoElement}
        />
      ) : (
        <div className={styles.avatarContainer}>
          <div
            className={styles.avatarCircle}
            style={{ backgroundColor: avatarBgColor }}
          >
            <span className={styles.avatarInitial}>
              {candidateName ? candidateName.charAt(0).toUpperCase() : ""}
            </span>
          </div>
        </div>
      )}

      <div className={styles.controls}>
        {videoControls ? (
          <FaCamera
            size={"2.4rem"}
            className={styles.controlIcon}
            onClick={toggleVideo}
          />
        ) : (
          <BiSolidCameraOff
            size={"2.4rem"}
            className={styles.controlIcon}
            onClick={toggleVideo}
          />
        )}
        {audioControls ? (
          <FaMicrophone
            size={"2.4rem"}
            className={styles.controlIcon}
            onClick={toggleAudio}
          />
        ) : (
          <FaMicrophoneSlash
            size={"2.4rem"}
            className={styles.controlIcon}
            onClick={toggleAudio}
          />
        )}

        <MdOutlineScreenShare
          size={"2.4rem"}
          className={styles.controlIcon}
          onClick={toggleScreenSharing}
        />

        {isFullScreen ? (
          <MdFullscreenExit
            size={"2.4rem"}
            className={styles.controlIcon}
            onClick={toggleFullScreen}
          />
        ) : (
          <MdFullscreen
            size={"2.4rem"}
            className={styles.controlIcon}
            onClick={toggleFullScreen}
          />
        )}
        <HiOutlinePhoneMissedCall
          size={"2.4rem"}
          className={styles.callcontrolIcon}
          onClick={handleLeaveMeeting}
        />
      </div>
    </div>
  );
}

export default JoinScreen;
