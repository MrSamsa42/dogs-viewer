import React, { Component } from 'react';
import {BreedList} from './components/BreedList';
//import './App.css';

class App extends Component {
  state = {
    data: {},
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>BreedList</h1>
        </header>
        <div>
          <BreedList breeds={this.state.data}/>
        </div>
      </div>
    );
  }
}

export default App;
