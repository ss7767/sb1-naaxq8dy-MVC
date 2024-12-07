import React from 'react';
import { useVideoStore } from '../store/videoStore';

export const LyricsInput: React.FC = () => {
  const { setLyrics } = useVideoStore();

  const handleLyricsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    const lines = text.split('\n').filter(line => line.trim());
    
    const lyrics = lines.map((line, index) => ({
      text: line,
      timestamp: index * 3000, // 3 seconds per line
    }));

    setLyrics(lyrics);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Enter Lyrics (one line per verse)
      </label>
      <textarea
        className="w-full h-48 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your lyrics here..."
        onChange={handleLyricsChange}
      />
    </div>
  );
};