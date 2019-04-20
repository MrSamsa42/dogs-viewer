import React from 'react';
import { Link } from 'react-router-dom';

class BreedList extends React.Component {

  state = {
    data: {},
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
    e.preventDefault();
    let breedName = e.target.textContent;
    this.setState({
      //showBreeds: false,
      selectedBreed: breedName
    })
  }

  render() {
    const breeds = this.state.data;
    const breedList = [];
    let breed, sub;
    for (breed in breeds) {
      //breedList.push(<li className="collection-header" onClick={handleClick} key={breed}><h5>{breed}</h5></li>);
      if (breeds[breed].length > 1) { //check for sub-breeds
        //const subBreed = [];
        for (sub of breeds[breed]) {
          //subBreed.push(<li className="collection-item" onClick={handleClick} key={sub}><h5>{`${sub} ${breed}`}</h5></li>);
          breedList.push(<li className="collection-item breed-list-name" onClick={this.handleClick} key={sub + breed}><Link to={sub + "%20" + breed}>{breed} ({sub})</Link></li>);
        }
        //breedList.push(<ul key={`${sub} ${breed}`}>{subBreed}</ul>);
      } else {
        breedList.push(<li className="collection-item breed-list-name" onClick={this.handleClick} key={breed}><Link to={breed}>{breed}</Link></li>);
      }
    }
    return (
        <div className="container">
          <h3 className="center">Choose a breed</h3>
          <div className="breed-list-container">
            <ul>
              {breedList}
            </ul>
          </div>
        </div>
    );
  }
}

  export {BreedList};