//Playlist.tsx
import React from 'react';
import PlayListItem from './PlayListItem';

// Define types for the playlist props
interface PlaylistProps {
  playlist: Song[];
  currentSong: Song | null;
  onSongSelect: (song: Song) => void;
}

interface Song {
  id: number;
  title: string;
  genre: string;
  length: string;
  artist: string;
}

const Playlist: React.FC<PlaylistProps> = ({ playlist, currentSong, onSongSelect }) => {

  return (
    <div className="playlist space-y-2">
      {playlist.map((song) => (
        <PlayListItem
          key={song.id}
          song={song}
          isSelected={currentSong ? currentSong.id === song.id : false}
          onClick={() => onSongSelect(song)}
        />
      ))}
    </div>
  );
};

export default Playlist;
