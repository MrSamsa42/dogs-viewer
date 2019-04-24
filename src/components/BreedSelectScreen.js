import React from 'react';
import {ListOfBreeds} from './ListOfBreeds';


class BreedSelectScreen extends React.Component {

  state = {
    data: {},
    selectedBreed: '',
    status: 'fetching'
  };

  async componentDidMount() {
    const url = 'https://dog.ceo/api/breeds/list/all'
    await this.handleFetch(url);
  }

  handleFetch = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      this.setState({ 
        data: json.message, 
        status: 'done' 
      });
    } catch (error) {
      this.setState({
        status: 'error'
      });
      console.log(error);
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    let breedName = e.target.textContent;
    this.setState({
      selectedBreed: breedName
    })
  }

  render() {
    return (
        <div className="container">
          <h3 className="center">Select a breed to view photos</h3>
          <div className="breed-list-container">
            <ListOfBreeds breeds={this.state.data} />
          </div>
        </div>
    );
  }
}

  export {BreedSelectScreen};