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
  };

  componentDidMount() {
    const { search, page } = this.state;
    this.fetchImages(search, page);
  }

  fetchImages = (query, page) => {
    this.setState({ loading: true });
    fetchImg(query, page)
      .then(data => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
        }));
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  onSubmit = query => {
    this.setState({ images: [], search: query, page: 1 }, () => {
      const { search, page } = this.state;
      this.fetchImages(search, page);
    });
  };

  loadMore = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        const { search, page } = this.state;
        this.fetchImages(search, page);
      }
    );
  };

  handleImageClick = imageURL => {
    this.setState({ selectedImage: imageURL });
  };

  closeModal = () => {
    this.setState({ selectedImage: '' });
  };

  render() {
    const { images, selectedImage, loading } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={images} onSelectImg={this.handleImageClick} />
        {loading && <span className="loader"></span>}
        {images.length > 0 && <Button loadMore={this.loadMore} />}
        {selectedImage && (
          <Modal srcImg={selectedImage} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
