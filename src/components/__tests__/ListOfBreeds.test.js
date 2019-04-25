import React from 'react';
import { shallow, mount } from 'enzyme';
import { ListOfBreeds } from '../ListOfBreeds';
import { MemoryRouter, Link } from 'react-router-dom';

const fakeList = {
    "affenpinscher": [],
    "bulldog": [
        "boston",
        "english",
        "french"
    ],
    "bullterrier": [
        "staffordshire"
    ]
};

test('given an object containing list of breeds, itparses the object, renders the list, adds subbreeds in parens', () => {
    const wrapper = mount(<MemoryRouter><ListOfBreeds breeds={fakeList}/></MemoryRouter>);
    //fakeList has 5 unique dogs
    expect(wrapper.find(Link).length).toBe(5);

    expect(wrapper.find(Link).at(0).text()).toBe('affenpinscher');
    expect(wrapper.find(Link).at(0).prop('to')).toBe('affenpinscher');

    expect(wrapper.find(Link).at(1).text()).toBe('bulldog (boston)');
    expect(wrapper.find(Link).at(1).prop('to')).toBe('boston%20bulldog');

})