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
    imageStatus: 'loading'
  };

  async componentDidMount() {
    //get breed and subbreed names from path parameters
    let breedName = this.props.match.params.breedName;
    let subBreed = '';

    //build correct url from breed and subbreed names
    let url = 'https://dog.ceo/api/breed/';
    if(breedName.indexOf(' ') > -1){
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
      if(json.status === 'success') {
        this.setState({
          pics: json.message, 
          isLoading: false,
        });
      } else if(json.status === 'error') { //e.g. misspelled breed name in path
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

  handleImageLoaded = () => {
    document.getElementById("nextButton").classList.remove('disabled');
  }

  handleImageErrored = () => {
    document.getElementById("nextButton").classList.remove('disabled');
  }

  handleNextClick = (e) => {
    document.getElementById("nextButton").classList.add('disabled');
      let len = this.state.pics.length;
      let next;
      this.state.picIndex === len - 1 ? next = 0 : next = this.state.picIndex + 1;
      this.setState({picIndex: next});
  }

  handlePrevClick = (e) => {
    document.getElementById("nextButton").classList.add('disabled');
    let prev;
    this.state.picIndex === 0 ? prev = 0 : prev = this.state.picIndex - 1;
    this.setState({picIndex: prev});
}
  
  render() {
    const { breedName, subBreed, pics, picIndex } = this.state;
    return !this.state.errorMessage  ?
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
                <p>Image {picIndex + 1} of {pics.length}</p>
              </div>
              <div className="card-action center">
                <Link
                  className="btn"
                  to="/"
                >
                  Back to Breeds
              </Link>
                <button id="prevButton" className={this.state.picIndex === 0 ? "btn disabled" : "btn"} onClick={this.handlePrevClick}>Previous</button>
                <button id="nextButton" className="btn disabled" onClick={this.handleNextClick}>Next</button>
              </div>
            </div>
          </div>
        </div>
      )
      :
      <ErrorScreen errorMessage={this.state.errorMessage}/>
  }
}

export {BreedViewScreen};
