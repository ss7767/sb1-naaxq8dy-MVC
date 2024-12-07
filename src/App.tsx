import { VideoPreview } from './components/VideoPreview';
import { LyricsInput } from './components/LyricsInput';
import { ConfigPanel } from './components/ConfigPanel';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Lyrics Video Generator
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <VideoPreview />
          </div>
          
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Configuration</h2>
              <ConfigPanel />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Lyrics</h2>
              <LyricsInput />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;