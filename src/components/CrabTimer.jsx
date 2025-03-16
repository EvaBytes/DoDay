import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { PlayIcon, PauseIcon, ArrowPathIcon } from "@heroicons/react/24/outline"; 
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";

const CrabTimer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(10);
  const [key, setKey] = useState(0);

  const handleStart = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleReset = () => {
    setIsPlaying(false);
    setKey((prev) => prev + 1); 
  };

  const handleDurationChange = (e) => {
    setDuration(Number(e.target.value));
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-center gap-3">
      <div className="flex items-center gap-4 relative">
        <motion.div
          className="absolute"
          animate={{
            x: ["0", "calc(-60vw - 100px)", "0"], 
          }}
          transition={{
            duration: 30, 
            repeat: Infinity, 
            repeatType: "loop", 
          }}
          style={{
            height: "100px", 
            width: "100px",
            top: "0", 
          }}
        >
          <Player
            autoplay
            loop
            src="public/Crab.json"
            style={{ height: "100%", width: "100%" }}
          />
        </motion.div>

        <CountdownCircleTimer
          key={key}
          isPlaying={isPlaying}
          duration={duration}
          size={120} 
          strokeWidth={6}
          onComplete={() => setIsPlaying(false)}
          colors={["#006400", "#228B22", "#32CD32"]}
          colorsTime={[duration, duration / 2, 0]}
          trailColor="rgba(144, 238, 144, 0.2)"        
        >
          {({ remainingTime }) => (
            <div
              className="flex justify-center items-center"
              style={{
                background: `conic-gradient(from 90deg, rgba(0, 255, 0, 0.5) ${100 - (remainingTime / duration) * 100}%, rgba(255, 127, 80, 0.5) ${100 - (remainingTime / duration) * 100}%)`
              }}
            >
              <input
                type="number"
                value={duration}
                onChange={handleDurationChange}
                className="text-center text-xl bg-transparent border-none w-20 outline-none"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "green",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              />
            </div>
          )}
        </CountdownCircleTimer>
      </div>

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

export default CrabTimer;
