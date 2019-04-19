import React, { Component } from 'react';
import { BreedList } from './components/BreedList';
import { BreedView } from './components/BreedView';
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
      //console.log("Here is the data...");
      //console.log(this.state.data);
    } catch (error) {
      console.log(error);
    }
  }

  handleClick = (e) => {
    let breedName = e.target.textContent;
    this.setState({
      showBreeds: false,
      selectedBreed: breedName
    })
  }

  handleReset = (e) => {
    this.setState({ showBreeds: true });
  }

  render() {


    return (
      <div>
        <div class="navbar">
          <nav>
            <div class="nav-wrapper">
              <a href="#!" class="brand-logo">Logo</a>
              <ul class="right hide-on-med-and-down">
                <li><a href="sass.html">Sass</a></li>
                <li><a href="badges.html">Components</a></li>
              </ul>
            </div>
          </nav>
        </div>
        <div> 
          {this.state.showBreeds ? (
            <BreedList handleClick={this.handleClick} breeds={this.state.data} />
          ) : (
              <div>
                <BreedView
                  breedName={this.state.selectedBreed}
                  reset={this.handleReset}
                />

              </div>
            )}
        </div>
      </div> //close parent div
    );
  }
}

export default App;
