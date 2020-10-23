import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import {SortTableHead} from "./SortTableHead";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableFooter: {
        padding: 20,
    },
});

export const SortTable = (props) => {
    const {children, footer, headCells = [], onSort, defaultOrderKey, defaultOrder, ...tableProps} = props;
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} {...tableProps}>
                <SortTableHead
                    headCells={headCells}
                    defaultOrderKey={defaultOrderKey}
                    defaultOrder={defaultOrder}
                    onSort={onSort}/>

                <TableBody>{children}</TableBody>
            </Table>
            <div className={classes.tableFooter}>
                {footer}
            </div>
        </TableContainer>
    );
};
