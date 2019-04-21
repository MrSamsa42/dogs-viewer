import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BreedView extends Component {
  state = {
    pics: [], 
    picIndex: 0,
    breedName: '',
    subBreed: ''
  }

  async componentDidMount() {
    
    let breedName = this.props.match.params.breedName;
    let subBreed = '';

    let url = 'https://dog.ceo/api/breed/';

    if(breedName.indexOf(' ') > -1){
        const names = breedName.split(' ');
        breedName = names[1];
        subBreed = names[0];
    }
    url += `${breedName}/`
    subBreed ? url += `${subBreed}/images` : url += 'images';

    this.setState({
      breedName: breedName,
      subBreed: subBreed
    })

    try {
      const response = await fetch(url);
      const json = await response.json();
      this.setState({ pics: json.message });
      console.log(`There are ${this.state.pics.length} pics`);
    } catch (error) {
      console.log(error);
    }
  }

  handleNextClick = (e) => {
      let len = this.state.pics.length;
      let next;
      this.state.picIndex === len - 1 ? next = 0 : next = this.state.picIndex + 1;
      this.setState({picIndex: next});
  }

  handlePrevClick = (e) => {
    let prev;
    this.state.picIndex === 0 ? prev = 0 : prev = this.state.picIndex - 1;
    this.setState({picIndex: prev});
}
  
  render() {
    console.log(this.props);
    const {breedName, subBreed, pics, picIndex} = this.state;
    return (
      <div className="row">
        <div className="col s12">
          <h4 className="breed-name center">{subBreed + ' ' + breedName}</h4>
          <div className="card">
            <div className="card-image">
              <img className="responsive-img" alt={this.state.breedName} src={pics[picIndex]} />
            </div>
            <div className="center">
              <p>Image {this.state.picIndex + 1} of {this.state.pics.length}</p>
            </div>
            <div className="card-action center">
              <Link
              className="btn"
              to="/"
              >
              Back to Breeds
              </Link>
              <button className="btn" onClick={this.handlePrevClick}>Previous</button>
              <button className="btn" onClick={this.handleNextClick}>Next</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export {BreedView};
