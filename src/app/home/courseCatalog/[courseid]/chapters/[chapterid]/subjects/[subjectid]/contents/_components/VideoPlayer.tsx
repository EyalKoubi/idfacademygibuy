// components/VideoPlayer.tsx
import React from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  return (
    <div>
      <ReactPlayer url={videoUrl} controls />
    </div>
  );
};

export default VideoPlayer;
