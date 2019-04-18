import React from 'react';

const BreedList = (props) => {
    const {breeds, handleClick} = props
    const breedList = [];
    let breed, sub;
    for (breed in breeds) {
      breedList.push(<li onClick={handleClick} key={breed}>{breed}</li>);
      if (breeds[breed].length > 1) { //check for sub-breeds
        const subBreed = [];
        for (sub of breeds[breed]) {
          subBreed.push(<li onClick={handleClick} key={sub}>{sub}</li>);
        }
        breedList.push(<ul key={breed + " " + sub}>{subBreed}</ul>);
      }
    }
    return (
        <ul>
          {breedList}
        </ul>
    );
  }

  export {BreedList};