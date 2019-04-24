
import React from 'react';
import { BreedSelectScreen } from '../BreedSelectScreen';
import { shallow } from 'enzyme';

const fakeData = {
    "status": "success",
    "message": {
        "affenpinscher": [],
        "african": [],
        "airedale": [],
    }
}

describe('BreedSelectScreen', () => {
    it('fetches breed list from dog api and sets state appropriately', done => {
        const mockSuccessResponse = fakeData;
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

        const wrapper = shallow(<BreedSelectScreen />);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith('https://dog.ceo/api/breeds/list/all');

        process.nextTick(() => {
            expect(wrapper.state()).toEqual({
                data: fakeData.message,
                selectedBreed: '',
                status: 'done'
            });

            global.fetch.mockClear();
            done();
        });
    });
});