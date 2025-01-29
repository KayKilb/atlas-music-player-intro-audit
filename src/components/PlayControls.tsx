// src/components/PlayControls.tsx
import React from 'react';
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
  onToggleShuffle: () => void;
  isFirstSong: boolean;
  isLastSong: boolean;
  isShuffle: boolean;
}

const PlayControls: React.FC<PlayControlsProps> = ({
  isPlaying,
  onPlayPauseToggle,
  onPrevious,
  onSkip,
  onToggleShuffle,
  isFirstSong,
  isLastSong,
  isShuffle
}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="flex items-center justify-center gap-8 w-full max-w-sm mx-auto">
        {/* Back Button */}
        <button
          className="p-2 rounded-full bg-fuchsia-200 hover:bg-fuchsia-300"
          onClick={onPrevious}
          disabled={isFirstSong}
        >
          <BackwardIcon className={`h-5 w-5 ${isFirstSong ? 'text-fuchsia-400' : 'text-fuchsia-600'}`} />
        </button>

        {/* Play/Pause Button */}
        <button
          className="p-3 rounded-full bg-fuchsia-500 hover:bg-fuchsia-700"
          onClick={onPlayPauseToggle}
        >
          {isPlaying ? <PauseIcon className="h-6 w-6 text-white" /> : <PlayIcon className="h-6 w-6 text-white" />}
        </button>

        {/* Forward Button */}
        <button
          className="p-2 rounded-full bg-fuchsia-200 hover:bg-fuchsia-300"
          onClick={onSkip}
          disabled={isLastSong}
        >
          <ForwardIcon className={`h-5 w-5 ${isLastSong ? 'text-fuchsia-400' : 'text-fuchsia-600'}`} />
        </button>

        {/* Shuffle Button */}
        <button
          className={`p-2 rounded-full ${isShuffle ? 'bg-fuchsia-500 text-white' : 'bg-fuchsia-200 text-fuchsia-600'} hover:bg-fuchsia-300`}
          onClick={onToggleShuffle}
        >
          <ArrowPathRoundedSquareIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default PlayControls;
