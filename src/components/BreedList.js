import React from 'react';

const BreedList = (props) => {
    const {breeds, handleClick} = props
    const breedList = [];
    let breed, sub;
    for (breed in breeds) {
      breedList.push(<li className="collection-header" onClick={handleClick} key={breed}><h5>{breed}</h5></li>);
      if (breeds[breed].length > 1) { //check for sub-breeds
        const subBreed = [];
        for (sub of breeds[breed]) {
          subBreed.push(<li className="collection-item" onClick={handleClick} key={sub}><h6>{`${sub} ${breed}`}</h6></li>);
        }
        breedList.push(<ul key={`${sub} ${breed}`}>{subBreed}</ul>);
      }
    }
    return (
        <div className="container">
          <h2 className="center">Choose a breed</h2>
          <ul className="collection with-header">
            {breedList}
          </ul>
        </div>
    );
  }

  export {BreedList};