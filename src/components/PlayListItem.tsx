//PlayListItem.tsx
import React from 'react';

interface PlayListItemProps {
  song: Song;
  isSelected: boolean;
  onClick: () => void;
}

interface Song {
  id: number;
  title: string;
  genre: string;
  length: string;
  artist: string;
}

const PlayListItem: React.FC<PlayListItemProps> = ({ song, isSelected, onClick }) => {
  return (
    <div
      className={`p-4 cursor-pointer ${isSelected ? 'bg-purple-200' : 'bg-white'}`}
      onClick={onClick}
    >
      <h2 className="text-lg font-bold">{song.title}</h2>
      <p className="text-sm text-gray-600">{song.genre}</p>
      <p className="text-sm text-gray-400">{song.length}</p>
    </div>
  );
};

export default PlayListItem;
