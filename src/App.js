import React, { Component } from 'react';
import { TopNav }  from './components/TopNav';
import { BreedSelectScreen } from './components/BreedSelectScreen';
import { BreedViewScreen } from './components/BreedViewScreen';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <div>
          <TopNav />
          <Route exact path='/' component={BreedSelectScreen} />
          <Route path='/:breedName' component={BreedViewScreen} />
        </div> 
      </BrowserRouter>
    );
  }
}

export default App;
