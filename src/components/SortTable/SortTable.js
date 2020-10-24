import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import {SortTableHead} from "./SortTableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import get from 'lodash.get';
import {useTableSort} from "./useTableSort";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableFooter: {
        padding: 20,
    },
});

export const SortTable = (props) => {
    const {footer, columns = [], dataSource = [], defaultOrderKey, defaultOrder, ...tableProps} = props;
    const {handleSort, sortedData, order, orderBy} = useTableSort(dataSource, defaultOrderKey, defaultOrder);
    const classes = useStyles();

    const renderRow = (el, index) => {
        const columnCells = columns.map(({key, render}) => {
            const value = get(el, key, null);
            return render ? render(value) : value;
        });

        return (
            <TableRow data-testid="sort-table-row" key={index}>
                {columnCells.map((value, index) => <TableCell key={index} align="left">{value}</TableCell>)}
            </TableRow>
        )
    };

    return (
        <TableContainer component={Paper} data-testid="sort-table">
            <Table className={classes.table} {...tableProps}>
                <SortTableHead
                    headCells={columns}
                    order={order}
                    orderBy={orderBy}
                    defaultOrderKey={defaultOrderKey}
                    defaultOrder={defaultOrder}
                    onSort={handleSort}/>

                <TableBody>
                    {sortedData.map((el, index) => renderRow(el, index))}
                </TableBody>
            </Table>

            <div className={classes.tableFooter}>
                {footer}
            </div>
        </TableContainer>
    );
};

