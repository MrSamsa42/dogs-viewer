import React from 'react';
import { ErrorScreen } from '../ErrorScreen';
import { shallow } from 'enzyme';

const fakeErrorMessage = 'fake error message'

it('renders without errors', () => {
    const component = shallow(<ErrorScreen errorMessage={fakeErrorMessage}/>);
    const wrapper = component.find('.error-text');
    expect(wrapper.length).toBe(1);
    expect(wrapper.text().includes('fake error message')).toBe(true);
});