
export const getMimeType = (extension: string | undefined) => {
    if (!extension) return '';

    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'svg'];
    const videoExtensions = ['mp4', 'webm', 'ogv'];
    const audioExtensions = ['mp3', 'wav', 'ogg'];
    const textExtensions = ['txt', 'csv', 'log'];

    if (imageExtensions.includes(extension.toLowerCase())) return `image/${extension.toLowerCase()}`;
    if (videoExtensions.includes(extension.toLowerCase())) return `video/${extension.toLowerCase()}`;
    if (audioExtensions.includes(extension.toLowerCase())) return `audio/${extension.toLowerCase()}`;
    if (textExtensions.includes(extension.toLowerCase())) return 'text/plain';

    return 'application/octet-stream';
};


export const generateVideoImageThumbnail = async (videoUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = videoUrl;

    video.addEventListener('loadeddata', () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        reject('Canvas 2D context not available');
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      console.log(`Video dimensions: ${canvas.width}x${canvas.height}`);

      try {
        // Draw the video frame on the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the canvas content to a data URI
        const thumbnailDataUri = canvas.toDataURL('image/jpeg');
        
        // Clean up and resolve the promise
        video.pause();
        video.removeAttribute('src');
        video.load();
        resolve(thumbnailDataUri);
      } catch (error) {
        reject(error);
      }
    });

    video.addEventListener('error', (error) => {
      reject(`Video error: ${error}`);
    });

    // Start loading the video
    video.load();
  });
};

  