import { getYouTubeEmbedUrl, isYouTubeUrl } from '@/lib/youtube';

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
  onEnded?: () => void;
  className?: string;
}

export default function VideoPlayer({ videoUrl, title, onEnded, className = '' }: VideoPlayerProps) {
  if (!videoUrl) {
    return (
      <div className={`aspect-video bg-gray-900 rounded-lg flex items-center justify-center ${className}`}>
        <p className="text-white">Video tidak tersedia</p>
      </div>
    );
  }

  // Check if it's a YouTube URL
  const isYouTube = isYouTubeUrl(videoUrl) || videoUrl.includes('youtube.com/embed/');

  if (isYouTube) {
    // Convert to embed URL if needed
    let embedUrl = videoUrl;
    if (!videoUrl.includes('youtube.com/embed/')) {
      const convertedUrl = getYouTubeEmbedUrl(videoUrl);
      if (convertedUrl) {
        embedUrl = convertedUrl;
      }
    }

    return (
      <div className={`aspect-video bg-gray-900 rounded-lg overflow-hidden ${className}`}>
        <iframe
          src={embedUrl}
          title={title || 'Video'}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // Regular video file
  const fullUrl = videoUrl.startsWith('http')
    ? videoUrl
    : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${videoUrl}`;

  return (
    <div className={`aspect-video bg-gray-900 rounded-lg overflow-hidden ${className}`}>
      <video
        src={fullUrl}
        controls
        className="w-full h-full"
        onEnded={onEnded}
      />
    </div>
  );
}

