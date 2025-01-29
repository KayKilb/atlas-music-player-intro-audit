//CurrentlyPlaying.tsx
import React from 'react';
import CoverArt from './CoverArt';
import SongTitle from './SongTitle';
import PlayControls from './PlayControls';
import VolumeControl from './VolumeControl';

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
  isPlaying: boolean;
  volume: number;
  onVolumeChange: (newVolume: number) => void;
  playlist: Song[];
}

const CurrentlyPlaying: React.FC<CurrentlyPlayingProps> = ({
  song,
  onPlayPause,
  onBack,
  onSkip,
  isPlaying,
  volume,
  onVolumeChange,
  playlist
}) => {
   // Check if the current song is the first or last in the playlist
  const isFirstSong = playlist.length > 0 && playlist[0].title === song.title;
  const isLastSong = playlist.length > 0 && playlist[playlist.length - 1].title === song.title;
  
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
        onNext={onSkip}
        isFirstSong={isFirstSong}
        isLastSong={isLastSong}
      />

      {/* Volume control slider */}
      <VolumeControl value={volume} onChange={onVolumeChange} />
    </div>
  );
};

export default CurrentlyPlaying;
