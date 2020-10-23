import React, {useCallback, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from "@material-ui/core/TableSortLabel";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableFooter: {
        padding: 20,
    },
});

export const SortTableHead = ({onSort, defaultOrderKey, defaultOrder = 'asc', headCells}) => {
    const [order, setOrder] = useState(defaultOrder);
    const [orderBy, setOrderBy] = useState(defaultOrderKey);

    const handleSort = useCallback((property) => {
        const isAsc = orderBy === property && order === 'asc';
        const newOrder = isAsc ? 'desc' : 'asc';
        setOrder(newOrder);
        setOrderBy(property);

        if (onSort) {
            onSort(property, newOrder)
        }
    }, [orderBy, order, onSort]);

    return (
        <TableHead>
            <TableRow>
                {headCells.map(({key, label, sortable}) => (
                    <TableCell key={key} sortDirection={orderBy === key ? order : false}>
                        {sortable
                            ? (
                                <TableSortLabel
                                    active={orderBy === key}
                                    direction={orderBy === key ? order : 'asc'}
                                    onClick={handleSort.bind(this, key)}
                                >
                                    {label}
                                </TableSortLabel>
                            )
                            : label
                        }
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};
