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
      this.setState({ data: json.message })
      console.log("Here is the data...");
      console.log(this.state.data);
    } catch (error) {
      console.log(error);
    }
  }


  render() {
    const breedList = [];
    for (let breed in this.state.data) {
      breedList.push(<li key={breed}>{breed}</li>)
      if (this.state.data[breed].length > 1) { //check for sub-breeds
        const subBreed = [];
        for (let sub of this.state.data[breed]) {
          subBreed.push(<li key={sub}>{sub}</li>)
        }
        breedList.push(<ul>{subBreed}</ul>)
      }
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1>BreedList</h1>
        </header>
        <div>
          <ul>
            {breedList}
          </ul>

        </div>
      </div>
    );
  }
}

export default App;
