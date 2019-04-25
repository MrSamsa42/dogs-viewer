
import React from 'react';
import { BreedViewScreen } from '../BreedViewScreen';
import { shallow } from 'enzyme';

const fakeData = {
    status: "success",
    message: [
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10147.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10185.jpg",
        "https://images.dog.ceo/breeds/affenpinscher/n02110627_10225.jpg",
    ]
}

describe('BreedViewScreen', () => {

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

            global.fetch.mockClear();
            done();
        });
    });

});