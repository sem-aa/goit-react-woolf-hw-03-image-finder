import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ images, onSelectImg }) => {
  return (
    <ul className="ImageGallery">
      {images.map((img, i) => (
        <ImageGalleryItem key={i} img={img} onSelectImg={onSelectImg} />
      ))}
    </ul>
  );
};
