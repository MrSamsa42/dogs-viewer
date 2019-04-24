import React from 'react';
import { shallow } from 'enzyme';
import { Loader } from '../Loader';

it('renders without errors', () => {
    const component = shallow(<Loader />);
    const wrapper = component.find('#pics-loader');
    expect(wrapper.length).toBe(1);
});