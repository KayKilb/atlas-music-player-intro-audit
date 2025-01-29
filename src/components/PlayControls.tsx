// playControl.tsx
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
  onSkip: () => void;
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
    if (!isLastSong) { // Only call onSkip if it's not the last song
      onSkip();
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
          disabled={isLastSong}
        >
          <ForwardIcon
            className={`h-5 w-5 ${isLastSong ? 'text-fuchsia-400' : 'text-fuchsia-600'}`}
          />
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
