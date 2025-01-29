//App.tsx
import React from 'react';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-vista-blue-50 to-vista-blue-600 flex flex-col">
      <main className="flex-grow p-4 sm:p-8">
        <MusicPlayer />
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}

export default App;
