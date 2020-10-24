import React from 'react';
import {SortTable} from "./SortTable";
import {mount} from "enzyme";

const COLUMN = {
    sortable: true,
    title: 'Name',
    key: 'name',
};

const DATA_SOURCE = [
    {key: 0, name: 'Jack'},
    {key: 1, name: 'Lucy'},
    {key: 2, name: 'Tom'},
    {key: 3, name: 'Jerry'},
];

describe("SortTable", () => {
    const createTable = (tableProps, columnProps = {}) => {
        return <SortTable columns={[{...COLUMN, ...columnProps}]} dataSource={DATA_SOURCE} {...tableProps}/>;
    }

    function renderedNames(wrapper) {
        return wrapper.find('[data-testid="sort-table-row"] .MuiTableCell-root').map(row => row.props().children);
    }

    it('default sort order ascend', () => {
        const wrapper = mount(createTable({defaultOrder: 'asc', defaultOrderKey: 'name'}));

        expect(renderedNames(wrapper)).toEqual(['Jack', 'Jerry', 'Lucy', 'Tom']);
    });

    it('default sort order descend', () => {
        const wrapper = mount(createTable({defaultOrder: 'desc', defaultOrderKey: 'name'}));

        expect(renderedNames(wrapper)).toEqual(['Tom', 'Lucy', 'Jerry', 'Jack']);
    });

    it('should toggle sort on click', () => {
        const wrapper = mount(createTable({}));
        const sortButton = () => wrapper.find('[data-testid="sort-table"] .MuiTableSortLabel-root').first();

        sortButton().simulate('click');
        expect(sortButton().hasClass('MuiTableSortLabel-active')).toBeTruthy();
        expect(renderedNames(wrapper)).toEqual(['Jack', 'Jerry', 'Lucy', 'Tom']);

        sortButton().simulate('click');
        expect(sortButton().hasClass('MuiTableSortLabel-active')).toBeTruthy();
        expect(renderedNames(wrapper)).toEqual(['Tom', 'Lucy', 'Jerry', 'Jack']);
    });
});

