import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from './Loader';
import { ErrorScreen } from './ErrorScreen'

class BreedViewScreen extends Component {
  state = {
    pics: [],
    picIndex: 0,
    breedName: '',
    subBreed: '',
    isLoading: true,
    errorMessage: '',
    imageIsLoading: true,
    imageLoadError: false
  };

  async componentDidMount() {
    //get breed and subbreed names from path parameters
    let breedName = this.props.match.params.breedName;
    let subBreed = '';

    //build correct url from breed and subbreed names
    let url = 'https://dog.ceo/api/breed/';
    if (breedName.indexOf(' ') > -1) {
      const names = breedName.split(' ');
      breedName = names[1];
      subBreed = names[0];
    }
    url += `${breedName}/`;
    subBreed ? url += `${subBreed}/images` : url += 'images';

    //set state here to show name while fetching pics
    this.setState({
      breedName: breedName,
      subBreed: subBreed,
    });

    await this.handleFetch(url);
  }

  handleFetch = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      if (json.status === 'success') {
        this.setState({
          pics: json.message,
          isLoading: false,
        });
      } else if (json.status === 'error') { //e.g. misspelled breed name in path
        this.setState({
          isLoading: false,
          errorMessage: 'Invalid breed name'
        });
      }
    } catch (error) {
      this.setState({
        errorMessage: 'Network or API error'
      });
      console.log(error);
    }
  }

  /*
    Disable 'next' button after each click to prevent clicking faster than the images load.
    Increment picIndex counter to load the next image
  */
  handleNextClick = (e) => {
    let len = this.state.pics.length;
    let next;
    this.state.picIndex === len - 1 ? next = 0 : next = this.state.picIndex + 1;
    this.setState({ picIndex: next, imageIsLoading: true });
  }

  /*
    Disable 'previous' button after each click to prevent clicking faster than the images load.
    (Note: may be unnessary, as images are cached by the browser)
    Decrement picIndex counter to load previous image
  */
  handlePrevClick = (e) => {
    let prev;
    this.state.picIndex === 0 ? prev = 0 : prev = this.state.picIndex - 1;
    this.setState({ picIndex: prev, imageIsLoading: true});
  }

  /*
    Once image has loaded, set imageIsLoading to 'false' so as to re-enable 'next' button and allow user to proceed to the next image
  */
  handleImageLoaded = () => {
    this.setState({imageIsLoading: false})
  }

  /*
    If the image fails to load, set imageIsLoading to 'false' so as to re-enable 'next' button and allow user to move past it
  */
  handleImageErrored = () => {
    this.setState({imageIsLoading: false})
  }



  render() {
    const { breedName, subBreed, pics, picIndex } = this.state;
    return !this.state.errorMessage ?
      (
        <div className="row">
          <div className="col s12">
            <h4 className="breed-name center">{subBreed + ' ' + breedName}</h4>
            <div className="card">
              <div className="card-image">

                {this.state.isLoading ? (
                  <Loader />
                )
                  : (
                    <img
                      className="responsive-img"
                      alt={subBreed + ' ' + breedName}
                      src={pics[picIndex]}
                      onLoad={this.handleImageLoaded}
                      onError={this.handleImageErrored}
                    />
                  )
                }

              </div>
              <div className="center">
                <p>Image <span id="pic-number">{picIndex + 1}</span> of <span id="number-of-pics">{pics.length}</span></p>
              </div>
              <div className="card-action center">
                <Link
                  className="btn"
                  to="/"
                >
                  Back to Breeds
              </Link>
                <button id="prev-button" className={picIndex === 0 ? "btn disabled" : "btn"} onClick={this.handlePrevClick}>Previous</button>
                <button id="next-button" className={this.state.imageIsLoading ? "btn disabled" : "btn"} onClick={this.handleNextClick}>Next</button>
              </div>
            </div>
          </div>
        </div>
      )
      :
      <ErrorScreen errorMessage={this.state.errorMessage} />
  }
}

export { BreedViewScreen };
