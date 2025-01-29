// MusicPlayer.tsx
import React, { useEffect, useState, useCallback } from 'react';
import CurrentlyPlaying from './CurrentlyPlaying';
import Playlist from './Playlist';
import usePlaylistData from '../hooks/usePlaylistData';

interface Song {
  id: number;
  title: string;
  genre: string;
  length: string;
  artist: string;
}

const MusicPlayer: React.FC = () => {
  const { data: playlist, loading } = usePlaylistData();
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const [isShuffle, setIsShuffle] = useState<boolean>(false); // Moved shuffle state here

  useEffect(() => {
    if (!loading && playlist.length > 0) {
      setCurrentSong(playlist[0]);
    }
  }, [loading, playlist]);

  // ✅ Toggle Shuffle Mode
  const handleToggleShuffle = () => {
    setIsShuffle((prev) => !prev);
    console.log(`Shuffle Mode: ${!isShuffle}`);
  };

  // ✅ Skip to Next Song, Looping at the End
  const handleSkip = useCallback(() => {
    if (!currentSong || playlist.length <= 1) return;
    
    let nextIndex;
    if (isShuffle) {
      do {
        nextIndex = Math.floor(Math.random() * playlist.length);
      } while (playlist[nextIndex].id === currentSong.id); // Ensure it's a different song
      console.log(`Shuffle Mode: Skipping to ${playlist[nextIndex].title}`);
    } else {
      nextIndex = (playlist.findIndex(song => song.id === currentSong.id) + 1) % playlist.length;
      console.log(`Skipping to ${playlist[nextIndex].title}`);
    }

    setCurrentSong(playlist[nextIndex]);
  }, [playlist, currentSong, isShuffle]);

  // ✅ Previous Song (Loop Back to Last if at First Song)
  const handlePrevious = useCallback(() => {
    if (!currentSong || playlist.length <= 1) return;

    let previousIndex = playlist.findIndex(song => song.id === currentSong.id) - 1;
    if (previousIndex < 0) previousIndex = playlist.length - 1; // Loop to last song

    console.log(`Going back to ${playlist[previousIndex].title}`);
    setCurrentSong(playlist[previousIndex]);
  }, [playlist, currentSong]);

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const handleSongChange = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);  // Optionally start playing the selected song immediately
  };

  return (
    <div className="music-player flex flex-col lg:flex-row gap-4 h-full max-w-7xl mx-auto p-4 bg-fuchsia-900">
      {/* Currently Playing Section */}
      <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden relative min-h-[630px] lg:min-h-0">
        {currentSong && (
          <CurrentlyPlaying
            song={currentSong}
            onPlayPause={handlePlayPause}
            onSkip={handleSkip}
            onBack={handlePrevious}
            onToggleShuffle={handleToggleShuffle}
            isPlaying={isPlaying}
            volume={volume}
            onVolumeChange={handleVolumeChange}
            playlist={playlist}
            isShuffle={isShuffle} // Pass shuffle state
          />
        )}
      </div>

      {/* Playlist Section */}
      <div className="flex-1 bg-[#FFE3FD] rounded-lg shadow-md overflow-hidden p-4">
        <h2 className="text-2xl font-bold mb-4">Playlist</h2>
        <Playlist
          playlist={playlist}
          currentSong={currentSong}
          onSongSelect={handleSongChange}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
