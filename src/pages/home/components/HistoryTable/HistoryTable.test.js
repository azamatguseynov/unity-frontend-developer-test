import React from 'react';
import {mount} from "enzyme";
import {HistoryTable} from "./HistoryTable";
import {act} from 'react-dom/test-utils';
import {getDateFromTimestamp} from "../../helpers/getDateFromTimestamp";

const flushPromises = () => new Promise(setImmediate);

const COLUMNS = [{
    sortable: true,
    title: 'Date',
    key: 'timestamp',
    render: getDateFromTimestamp
}];

const DATA_SOURCE = [
    {key: 0, timestamp: 1581627600000},
    {key: 1, timestamp: 1581714000000},
    {key: 2, timestamp: 1581800400000},
    {key: 3, timestamp: 1581886800000},
];

const SORTED_DATES = ['2020-02-16', '2020-02-15', '2020-02-14', '2020-02-13'];

const LOAD_MORE_DATES = [
    '2020-02-16',
    '2020-02-16',
    '2020-02-15',
    '2020-02-15',
    '2020-02-14',
    '2020-02-14',
    '2020-02-13',
    '2020-02-13'
];

describe("HistoryTable", () => {
    const createTable = (tableProps) => {
        return <HistoryTable columns={COLUMNS} {...tableProps}/>;
    }

    function renderedDates(wrapper) {
        return wrapper.find('[data-testid="sort-table-row"] .MuiTableCell-root').map(row => row.props().children);
    }

    const getLoadMoreButton = (wrapper) => wrapper.find('[data-testid="load-more-button"]').first();

    const getSuccess = jest.fn(() => Promise.resolve({data: DATA_SOURCE}));
    const getFail = jest.fn(() => Promise.reject(new Error()));

    it('should be sorted descend and by "Date" field by default', async () => {
        const wrapper = mount(createTable({fetchHistory: getSuccess}));

        await act(flushPromises);
        wrapper.update();

        expect(renderedDates(wrapper)).toEqual(SORTED_DATES);
    });

    it('should have error message on data load fails', async () => {
        const wrapper = mount(createTable({fetchHistory: getFail}));
        const getErrorMessage = () => wrapper.find('[data-testid="error-message"]').first().text();

        await act(flushPromises);
        wrapper.update();

        expect(getLoadMoreButton(wrapper).text()).toEqual('Retry');
        expect(getErrorMessage()).toEqual('We had problem fetching your data. Please try again.');
    });

    it('should be re-sorted according to currently selected sorting order after new fetch', async () => {
        const wrapper = mount(createTable({fetchHistory: getSuccess}));

        await act(flushPromises);
        wrapper.update();

        expect(renderedDates(wrapper)).toEqual(SORTED_DATES);

        getLoadMoreButton(wrapper).simulate('click');
        await act(flushPromises);
        wrapper.update();

        expect(renderedDates(wrapper)).toEqual(LOAD_MORE_DATES);
    });

});
