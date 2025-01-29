// VolumeControl.tsx
import React, { useState, useEffect } from 'react';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid';

interface VolumeControlProps {
  value: number;
  onChange: (newVolume: number) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ value, onChange }) => {
  const [sliderValue, setSliderValue] = useState(value);

  useEffect(() => {
    setSliderValue(value); // Sync the slider value with parent
  }, [value]);

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value, 10);
    setSliderValue(newVolume);
    onChange(newVolume); // Pass the updated value to the parent component
  };

  return (
    <div className="w-[300px] flex items-center gap-2">
      {/* Speaker Icon */}
      {sliderValue === 0 ? (
        <SpeakerXMarkIcon className="w-6 h-6 text-gray-400" />
      ) : (
        <SpeakerWaveIcon className="w-6 h-6 text-black" />
      )}

      <div className="relative w-full">
        {/* Background track */}
        <div className="absolute top-2 left-0 right-0 h-2 bg-[#FFE4FD] rounded-full"></div>
        
        {/* Progress track with gradient fuchsia */}
        <div
          className="absolute top-2 left-0 h-2 rounded-full"
          style={{
            width: `${sliderValue}%`,
            background: `linear-gradient(to right, #FF66B2, #FF29EB)`,
          }}
        ></div>

        {/* Slider input (hides the default thumb) */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={handleVolumeChange}
          className="relative w-full appearance-none h-2 bg-transparent cursor-pointer"
          style={{ zIndex: 1 }}
        />
        
        {/* Custom thumb styled with fuchsia */}
        <div
          className="absolute w-[18px] h-[18px] bg-fuchsia-500 rounded-full shadow-md top-1/2 left-0 transform -translate-y-1/2"
          style={{ left: `calc(${sliderValue}% - 9px)` }}
        ></div>
      </div>
      
      {/* CSS to hide the default thumb */}
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 0; /* Hide the default thumb */
          height: 0; /* Hide the default thumb */
        }

        input[type="range"]::-moz-range-thumb {
          width: 0; /* Hide the default thumb */
          height: 0; /* Hide the default thumb */
        }

        input[type="range"]::-ms-thumb {
          width: 0; /* Hide the default thumb */
          height: 0; /* Hide the default thumb */
        }
      `}</style>
    </div>
  );
};

export default VolumeControl;
