import React, { Component } from 'react';
import Searchbar from './Searchbar';
import Modal from './Modal';
import { ImageGallery } from './ImageGallery';
import { fetchImg } from 'services/apiPixaby';
import { Button } from './Button';

class App extends Component {
  state = {
    images: [],
    search: '',
    page: 1,
    selectedImage: '',
    loading: false,
    totalPages: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fetchImages(search, page);
    }
  }

  fetchImages = (query, page) => {
    this.setState({ loading: true });
    fetchImg(query, page)
      .then(data => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          totalPages: Math.ceil(data.total / 12),
        }));
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  onSubmit = query => {
    this.setState({ images: [], search: query, page: 1 });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleImageClick = imageURL => {
    this.setState({ selectedImage: imageURL });
  };

  closeModal = () => {
    this.setState({ selectedImage: '' });
  };

  render() {
    const { images, selectedImage, loading, totalPages, page } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={images} onSelectImg={this.handleImageClick} />
        {loading && <span className="loader"></span>}
        {images.length > 0 && totalPages !== page && (
          <Button loadMore={this.loadMore} />
        )}
        {selectedImage && (
          <Modal srcImg={selectedImage} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
