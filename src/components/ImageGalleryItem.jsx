export const ImageGalleryItem = ({ img, onSelectImg }) => {
  return (
    <li
      className="ImageGalleryItem"
      onClick={() => onSelectImg(img.largeImageURL)}
    >
      <img
        className="ImageGalleryItem-image"
        src={img.previewURL}
        alt="Gallery Item"
      />
    </li>
  );
};
