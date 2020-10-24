import React, {useCallback} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from "@material-ui/core/TableSortLabel";

const useStyles = makeStyles({
    tableHeader: {},
});

export const SortTableHead = ({onSort, order, orderBy, headCells}) => {
    const handleSort = useCallback((newOrderBy) => {
        const isAsc = orderBy === newOrderBy && order === 'asc';
        const newOrder = isAsc ? 'desc' : 'asc';

        if (onSort) {
            onSort(newOrderBy, newOrder)
        }
    }, [orderBy, order, onSort]);

    return (
        <TableHead>
            <TableRow>
                {headCells.map(({key, title, sortable}) => (
                    <TableCell key={key} sortDirection={orderBy === key ? order : false}>
                        {sortable
                            ? (
                                <TableSortLabel
                                    active={orderBy === key}
                                    direction={orderBy === key ? order : 'asc'}
                                    onClick={handleSort.bind(this, key)}
                                >
                                    {title}
                                </TableSortLabel>
                            )
                            : title
                        }
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};
