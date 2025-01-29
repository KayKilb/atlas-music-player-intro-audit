// CurrentlyPlaying.tsx
import React from 'react';
import CoverArt from './CoverArt';
import SongTitle from './SongTitle';
import PlayControls from './PlayControls';
import VolumeControls from './VolumeControls';

interface Song {
  cover?: string;
  title: string;
  artist: string;
}

interface CurrentlyPlayingProps {
  song: Song;
  onPlayPause: () => void;
  onBack: () => void;
  onSkip: () => void;
  onToggleShuffle: () => void;
  isPlaying: boolean;
  volume: number;
  onVolumeChange: (newVolume: number) => void;
  playlist: Song[];
  isShuffle: boolean;
}

const CurrentlyPlaying: React.FC<CurrentlyPlayingProps> = ({
  song,
  onPlayPause,
  onBack,
  onSkip,
  onToggleShuffle,
  isPlaying,
  volume,
  onVolumeChange,
  playlist,
  isShuffle
}) => {
  // Check if the current song is the first or last in the playlist
  const currentIndex = playlist.findIndex((s) => s.title === song.title);
  const isFirstSong = currentIndex === 0;
  const isLastSong = currentIndex === playlist.length - 1;

  return (
    <div className="flex flex-col gap-2 h-full justify-center items-center p-4">
      {/* Display cover art, fallback to placeholder if none */}
      <CoverArt coverImage={song.cover || '../assets/placeholder.svg'} />

      {/* Display song title and artist */}
      <SongTitle title={song.title} artist={song.artist} />

      {/* Playback controls: play/pause, back, and skip */}
      <PlayControls 
        isPlaying={isPlaying}
        onPlayPauseToggle={onPlayPause}
        onPrevious={onBack}
        onSkip={onSkip}
        onToggleShuffle={onToggleShuffle}
        isFirstSong={isFirstSong}
        isLastSong={isLastSong}
        isShuffle={isShuffle}
      />

      {/* Volume control slider */}
      <VolumeControls value={volume} onChange={onVolumeChange} />
    </div>
  );
};

export default CurrentlyPlaying;
