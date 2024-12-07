import React from 'react';
import { useVideoStore } from '../store/videoStore';

export const ConfigPanel: React.FC = () => {
  const { config, setConfig } = useVideoStore();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Background URL
        </label>
        <input
          type="text"
          value={config.background}
          onChange={(e) => setConfig({ background: e.target.value })}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Size
        </label>
        <input
          type="number"
          value={config.fontSize}
          onChange={(e) => setConfig({ fontSize: parseInt(e.target.value) })}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Color
        </label>
        <input
          type="color"
          value={config.textColor}
          onChange={(e) => setConfig({ textColor: e.target.value })}
          className="w-full p-2 border rounded-lg"
        />
      </div>
    </div>
  );
};