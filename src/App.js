import React, { Component } from 'react';
import { TopNav }  from './components/TopNav';
import { BreedList } from './components/BreedList';
import { BreedView } from './components/BreedView';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <div>
          <TopNav />
          <Route exact path='/' component={BreedList} />
          <Route path='/:breedName' component={BreedView} />
        </div> 
      </BrowserRouter>
    );
  }
}

export default App;
