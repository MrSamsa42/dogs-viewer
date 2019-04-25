import React from 'react';
import { shallow, mount } from 'enzyme';
import { TopNav } from '../TopNav';
import { MemoryRouter, Link } from 'react-router-dom';

describe('TopNav component', () => {
    it('Should render without errors', () => {
        const component = shallow(<TopNav />);
        const wrapper = component.find('.navbar');
        expect(wrapper.length).toBe(1);
    })

    it("includes link to BreedViewScreen (aka '/' )", () => {                                       
        const wrapper = mount(<MemoryRouter><TopNav /></MemoryRouter>);
        expect(wrapper.find(Link).prop('to')).toBe('/');
    });
})