import React, { Component } from 'react';
//import './App.css';

class App extends Component {
  state = {
    data: {}, 
  }

  async componentDidMount() {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      const json = await response.json();
      this.setState({data: json.message})
      console.log("Here is the data...");
      console.log(this.state.data);
    } catch(error) {
      console.log(error);
    }

    try {
      let affenpinscher = Object.keys(this.state.data)[0];
      const response = await fetch(`https://dog.ceo/api/breed/${affenpinscher}/images`);
      const json = await response.json();
      console.log("Pics of a single breed....");
      console.log(json);
    } catch(error) {
      console.log(error);
    }    
  }
  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>blank slate</h1>
        </header>
      </div>
    );
  }
}

export default App;
