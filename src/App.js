import React, { Component } from 'react';
import {BreedList} from './components/BreedList';
//import './App.css';

class App extends Component {
  state = {
    data: {},
    showBreeds: true,
    selectedBreed: ''
  }

  async componentDidMount() {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      const json = await response.json();
      this.setState({ data: json.message });
      console.log("Here is the data...");
      console.log(this.state.data);
    } catch (error) {
      console.log(error);
    }
  }

  handleClick = (e) => {
    let breedName = e.target.innerHTML;
    console.log(breedName);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>BreedList</h1>
        </header>
        <div>
          <BreedList handleClick={this.handleClick} breeds={this.state.data}/>
        </div>
      </div>
    );
  }
}

export default App;
