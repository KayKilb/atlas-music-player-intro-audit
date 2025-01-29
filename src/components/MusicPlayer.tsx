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
  const [isShuffle, setIsShuffle] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && playlist.length > 0) {
      setCurrentSong(playlist[0]);
    }
  }, [loading, playlist]);

  // Skip to the next song, with wrapping
  const handleSkip = useCallback(() => {
    if (!currentSong || playlist.length <= 1) return;
    let nextIndex = (playlist.findIndex(song => song.id === currentSong.id) + 1) % playlist.length;
    setCurrentSong(playlist[nextIndex]);
  }, [playlist, currentSong]);

  // Shuffle to a random song, different from the current one
  const handleShuffle = useCallback(() => {
    if (!currentSong || playlist.length <= 1) return;
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * playlist.length);
    } while (playlist[randomIndex].id === currentSong.id);
    setCurrentSong(playlist[randomIndex]);
  }, [playlist, currentSong]);

  // Go to the previous song, with wrapping
  const handlePrevious = useCallback(() => {
    if (!currentSong || playlist.length <= 1) return;
    let previousIndex = (playlist.findIndex(song => song.id === currentSong.id) - 1 + playlist.length) % playlist.length;
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
            onSkip={isShuffle ? handleShuffle : handleSkip}
            onBack={handlePrevious}
            isPlaying={isPlaying}
            volume={volume}
            onVolumeChange={handleVolumeChange}
            playlist={playlist}
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
