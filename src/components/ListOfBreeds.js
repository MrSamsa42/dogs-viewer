import React from 'react';
import { Link } from 'react-router-dom';

const ListOfBreeds = ({breeds}) => {
    const breedList = [];
    let breed, sub;
    for (breed in breeds) {
      if (breeds[breed].length > 0) { //check for sub-breeds
        for (sub of breeds[breed]) {
          breedList.push(<li className="collection-item breed-list-name" key={sub + breed}><Link to={sub + "%20" + breed}>{breed} ({sub})</Link></li>);
        }
      } else {
        breedList.push(<li className="collection-item breed-list-name" key={breed}><Link to={breed}>{breed}</Link></li>);
      }
    }
    return (
      <ul>
        {breedList}
      </ul>
    )
  }

  export {ListOfBreeds}