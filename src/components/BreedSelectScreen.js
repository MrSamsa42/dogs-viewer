import React from 'react';
import { ListOfBreeds } from './ListOfBreeds';
import { ErrorScreen } from './ErrorScreen';


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
        status: 'Network or API error'
      });
      console.log(error);
    }
  }

  render() {
    return this.state.status === 'Network or API error' ? (
      <ErrorScreen errorMessage={this.state.status}/>
    )
    : (
      <div className="container">
        <h4 className="center">Select a breed to view photos</h4>
        <div className="card">  
          <div className="breed-list-container">
            <ListOfBreeds breeds={this.state.data} />
          </div>
        </div>

      </div>
    );
  }
}

export { BreedSelectScreen };