import React, { Component } from 'react';

class BreedView extends Component {
  state = {
    pics: [], 
    picIndex: 0
  }

  async componentDidMount() {
    let {breedName} = this.props;
    let subBreed = '';
    let url = 'https://dog.ceo/api/breed/';
    if(breedName.indexOf(' ') > -1){
        const names = breedName.split(' ');
        breedName = names[1];
        subBreed = names[0];
    }
    url += `${breedName}/`
    subBreed ? url += `${subBreed}/images` : url += 'images';

    try {
      const response = await fetch(url);
      const json = await response.json();
      this.setState({ pics: json.message });
      //console.log("Here are the pics");
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
  
  render() {
    const {pics, picIndex} = this.state;
    const {reset} = this.props;

    return (
      <div className="row">
        <div className="col s12">
          <h1 className="breed-name center">{this.props.breedName}</h1>
          <div className="card">
            <div className="card-image">
              <img class="responsive-img" alt={this.props.breedName} src={pics[picIndex]} />
            </div>
            <div className="card-content">
              <p>Image {this.state.picIndex + 1} of {this.state.pics.length}</p>
            </div>
            <div className="card-action center">
       
                <button class="btn" onClick={reset}>Back to Breeds</button>
                <button class="btn" onClick={this.handleNextClick}>Next {this.props.breedName} pic</button>
        

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export {BreedView};
