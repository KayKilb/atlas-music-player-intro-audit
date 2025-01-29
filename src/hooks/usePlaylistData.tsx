//usePlaylistData.tsx
import { useState, useEffect } from 'react';

interface Song {
  id: number;
  title: string;
  genre: string;
  length: string;
  cover: string;
  artist: string;
}

export const usePlaylistData = () => {
  const [data, setData] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/playlist'
        );
        const playlistData = await response.json();
        setData(playlistData);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, []);

  return { data, loading };
};

export default usePlaylistData
