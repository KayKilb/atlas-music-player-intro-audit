// PlayControls.tsx
import React, { useState } from 'react';
import {
  PlayIcon,
  PauseIcon,
  ForwardIcon,
  BackwardIcon,
  ArrowPathRoundedSquareIcon
} from '@heroicons/react/24/solid';

interface PlayControlsProps {
  isPlaying: boolean;
  onPlayPauseToggle: () => void;
  onPrevious: () => void;
  onSkip: (index?: number) => void;
  isFirstSong: boolean;
  isLastSong: boolean;
}

const PlayControls: React.FC<PlayControlsProps> = ({
  isPlaying,
  onPlayPauseToggle,
  onPrevious,
  onSkip,
  isFirstSong,
  isLastSong
}) => {
  const [speed, setSpeed] = useState<number>(1);
  const [isShuffle, setShuffle] = useState<boolean>(false);

  // play/pause state
  const handlePlayPause = () => {
    onPlayPauseToggle();
  };

  // speed between 1x, 2x, and 3x
  const handleSpeedToggle = () => {
    setSpeed((prevSpeed) => (prevSpeed === 3 ? 1 : prevSpeed + 1));
  };

  // shuffle mode
  const handleShuffleToggle = () => {
    setShuffle((prevShuffle) => !prevShuffle);
  };

const handleSkip = () => {
  console.log("Skipping Song..."); // Debugging log
  
  if (isShuffle) {
    const randomIndex = Math.floor(Math.random() * 10); // Assuming 10 songs
    console.log(`Shuffle Mode: Skipping to random song index ${randomIndex}`);
    onSkip(randomIndex); // Skip to a random song
  } else {
    console.log("Skipping to next song...");

    onSkip((prevIndex) => {
      if (isLastSong) {
        console.log("Reached last song. Looping to first song.");
        return 0; // Loop back to first song
      }
      return prevIndex + 1; // Move to next song normally
    });
  }
};

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="flex items-center justify-center gap-8 w-full max-w-sm mx-auto">
        {/* Speed Button */}
        <button
          className="text-fuchsia-500 hover:text-fuchsia-700"
          onClick={handleSpeedToggle}
        >
          {speed}x
        </button>

        {/* Back Button */}
        <button
          className="p-2 rounded-full bg-fuchsia-200 hover:bg-fuchsia-300"
          onClick={onPrevious}
          disabled={isFirstSong}
        >
          <BackwardIcon
            className={`h-5 w-5 ${isFirstSong ? 'text-fuchsia-400' : 'text-fuchsia-600'}`}
          />
        </button>

        {/* Play/Pause Button */}
        <button
          className="p-3 rounded-full bg-fuchsia-500 hover:bg-fuchsia-700"
          onClick={handlePlayPause}
        >
          {isPlaying ? (
            <PauseIcon className="h-6 w-6 text-white" />
          ) : (
            <PlayIcon className="h-6 w-6 text-white" />
          )}
        </button>

        {/* Forward Button */}
        <button
          className="p-2 rounded-full bg-fuchsia-200 hover:bg-fuchsia-300"
          onClick={handleSkip}
        >
          <ForwardIcon className="h-5 w-5 text-fuchsia-600" />
        </button>

        {/* Shuffle Button */}
        <button
          className={`p-2 rounded-full ${isShuffle ? 'bg-fuchsia-500' : 'bg-fuchsia-200'} hover:bg-fuchsia-300`}
          onClick={handleShuffleToggle}
        >
          <ArrowPathRoundedSquareIcon className="h-5 w-5 text-fuchsia-600" />
        </button>
      </div>
    </div>
  );
};

export default PlayControls;
