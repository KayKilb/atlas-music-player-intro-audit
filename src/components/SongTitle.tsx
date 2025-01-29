//SongTitle.tsx
import React from 'react';

interface SongTitleProps {
  title: string;
  artist: string;
}

const SongTitle: React.FC<SongTitleProps> = ({ title, artist }) => {
  return (
    <div className="flex flex-col items-start space-y-2">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <p className="text-lg text-gray-600">{artist}</p>
    </div>
  );
};

export default SongTitle;
