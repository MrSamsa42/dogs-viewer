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
      <div>
          <h2>{this.props.breedName}</h2>
          <img src={pics[picIndex]} alt=""/>
          <div>
            <button onClick={reset}>Reset</button>
            <button onClick={this.handleNextClick}>Next</button>
          </div>          
      </div> 
    );
  }
}

export {BreedView};
