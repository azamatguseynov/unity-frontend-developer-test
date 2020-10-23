import React from 'react';
import {SortTable} from "../../../../components/SortTable";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {useHistoryTableSort} from "./useHistoryTableSort";
import {getDateFromTimestamp} from "../../helpers/getDateFromTimestamp";
import {HistoryTableFooter} from "./HistoryTableFooter";

const DEFAULT_ORDER_BY = 'timestamp';
const DEFAULT_ORDER = 'desc';

export const HistoryTable = ({children, history = [], hasError, isLoading, loadMore, ...tableProps}) => {
    const {handleSort, sortedHistory} = useHistoryTableSort(history, DEFAULT_ORDER_BY, DEFAULT_ORDER);

    return (
        <SortTable
            onSort={handleSort}
            defaultOrder={DEFAULT_ORDER}
            defaultOrderKey={DEFAULT_ORDER_BY}
            footer={<HistoryTableFooter hasError={hasError} isLoading={isLoading} loadMore={loadMore}/>}
            {...tableProps}
        >
            {sortedHistory.map(({id, timestamp, diff: [{oldValue, newValue}]}) => (
                <TableRow key={id}>
                    <TableCell align="left">{getDateFromTimestamp(timestamp)}</TableCell>
                    <TableCell align="left">{id}</TableCell>
                    <TableCell align="left">{oldValue}</TableCell>
                    <TableCell align="left">{newValue}</TableCell>
                </TableRow>
            ))}
        </SortTable>
    );
};
