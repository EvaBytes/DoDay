import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { PlayIcon, PauseIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { motion, useAnimation } from "framer-motion";
import Swal from "sweetalert2"; // Import SweetAlert2
import withReactContent from "sweetalert2-react-content"; // Import the React plugin
import confetti from "canvas-confetti"; // Import confetti directly

const MySwal = withReactContent(Swal); // Create a SweetAlert2 instance with React support

const BeeTimer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(40);
  const [key, setKey] = useState(0);
  const [isEditing, setIsEditing] = useState(true);
  const [timeInput, setTimeInput] = useState("00:40");
  const controls = useAnimation();

  const handleStart = () => {
    setIsPlaying(true);
    setIsEditing(false);
    controls.start({ x: "calc(-60vw - 100px)" });
  };

  const handlePause = () => {
    setIsPlaying(false);
    controls.stop();
  };

  const handleReset = () => {
    setIsPlaying(false);
    setIsEditing(true);
    setKey((prev) => prev + 1);
    controls.stop();
    controls.set({ x: "-100%" });
  };

  const handleTimeInputChange = (e) => {
    const value = e.target.value;
    setTimeInput(value);

    const [minutes, seconds] = value.split(":").map(Number);
    const totalSeconds = minutes * 60 + seconds;
    setDuration(totalSeconds);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (isPlaying) {
      controls.start({ x: "calc(-60vw - 100px)" });
    }
  }, [key, isPlaying, controls]);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-center gap-3">
      <motion.div
        className="absolute"
        animate={controls}
        initial={{ x: "-100%" }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          },
        }}
        style={{
          height: "90px",
          width: "90px",
          top: "0",
          marginRight: "1rem",
        }}
      >
        <motion.div
          animate={{
            y: ["0", "10px", "-10px", "0"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <img
            src="/Bee.gif"
            alt="Bee"
            style={{
              height: "100%",
              width: "100%",
              transform: "scaleX(-1)",
            }}
          />
        </motion.div>
      </motion.div>

      <CountdownCircleTimer
        key={key}
        isPlaying={isPlaying}
        duration={duration}
        size={120}
        strokeWidth={6}
        onComplete={() => {
          setIsPlaying(false);
          controls.stop();
          controls.set({ x: "-100%" });

          // Show a SweetAlert2 popup with confetti
          MySwal.fire({
            title: "Time is up!",
            text: "Wanna start again?",
            icon: "success",
            confirmButtonText: "Skip",
            showClass: {
              popup: "animate__animated animate__fadeInDown", // Entry animation
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp", // Exit animation
            },
            didOpen: () => {
              // Trigger confetti
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
              });
            },
          });
        }}
        colors={["#32CD32", "#FFA500", "#FFD700"]}
        colorsTime={[duration, duration / 2, 0]}
        trailColor="rgba(144, 238, 144, 0.2)"
      >
        {({ remainingTime }) => (
          <div
            className="flex justify-center items-center"
            style={{
              background: `conic-gradient(from 90deg, #32CD32 ${100 - (remainingTime / duration) * 100}%, #FFA500 ${100 - (remainingTime / duration) * 100}%)`,
            }}
          >
            {isEditing ? (
              <input
                type="text"
                value={timeInput}
                onChange={handleTimeInputChange}
                className="text-center text-xl bg-transparent border-none w-20 outline-none"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "green",
                  fontSize: "1.7rem",
                  fontWeight: "bold",
                }}
                placeholder="mm:ss"
                maxLength={5}
              />
            ) : (
              <div
                className="text-center text-xl"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "green",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                {formatTime(remainingTime)}
              </div>
            )}
          </div>
        )}
      </CountdownCircleTimer>

      <div className="flex gap-2 mt-2">
        <button
          onClick={handleStart}
          className="bg-green-500 text-white rounded p-2 hover:bg-green-700 focus:outline-none"
        >
          <PlayIcon className="h-4 w-4" />
        </button>
        <button
          onClick={handlePause}
          className="bg-yellow-400 text-white rounded p-2 hover:bg-yellow-600 focus:outline-none"
        >
          <PauseIcon className="h-4 w-4" />
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 text-white rounded p-2 hover:bg-red-700 focus:outline-none"
        >
          <ArrowPathIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default BeeTimer;