
import React from 'react';
import { BreedViewScreen } from '../BreedViewScreen';
import { MemoryRouter, Link } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

const fakeData = {
    status: "success",
    message: [
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10147.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10185.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10225.jpg",
    ]
}

describe('BreedViewScreen', () => {

    it('displays a back button that links to the BreedSelectScreen (root path)', () => {
        const wrapper = mount(<MemoryRouter><BreedViewScreen /></MemoryRouter>);
        expect(wrapper.find(Link).prop('to')).toBe('/');
    })

    it('fetches list of photos for a given breed and sets state appropriately', done => {
        const mockSuccessResponse = fakeData;
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

        //fake navigation props
        const FakeNavProps = {
            params: {
                breedName: 'affenpinscher'
            }
        }
        const wrapper = shallow(<BreedViewScreen match={FakeNavProps} />);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        //confirms that breed name was correctly parsed from navigation path and added to URL
        expect(global.fetch).toHaveBeenCalledWith('https://dog.ceo/api/breed/affenpinscher/images');

        process.nextTick(() => {
            expect(wrapper.state()).toEqual({
                pics: fakeData.message,
                picIndex: 0,
                breedName: 'affenpinscher',
                subBreed: '',
                isLoading: false,
                errorMessage: ''
            });

            //buttons should be disabled when page first loads
            expect(wrapper.find('#next-button').hasClass('disabled')).toBe(true)
            expect(wrapper.find('#prev-button').hasClass('disabled')).toBe(true)

            //count should display number pics equivalent to the length of the array of pics received from API
            expect(wrapper.find('#number-of-pics').text()).toEqual('3')

            //start pic count on 1
            expect(wrapper.find('#pic-number').text()).toEqual('1')

            //image source should be first pic in array of pics received from API
            expect(wrapper.find('img').prop("src")).toEqual('https://images.dog.ceo/breeds/affenpinscher/n02110627_10147.jpg');

            global.fetch.mockClear();
            done();
        });
    });
});