// components/Gallery.tsx
import React from 'react';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

interface ImageGalleryProps {
  images: { original: string; thumbnail: string }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return <Gallery items={images} />;
};

export default ImageGallery;
