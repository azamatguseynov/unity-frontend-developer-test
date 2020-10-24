import React from 'react';
import {SortTable} from "../../../../components/SortTable";
import {HistoryTableFooter} from "./HistoryTableFooter";
import {useHistoryService} from "../../hooks/useHistoryService";

const DEFAULT_ORDER_BY = 'timestamp';
const DEFAULT_ORDER = 'desc';

export const HistoryTable = ({fetchHistory, ...tableProps}) => {
    const {isLoading, hasError, loadMore, history} = useHistoryService(fetchHistory);

    return (
        <SortTable
            defaultOrder={DEFAULT_ORDER}
            defaultOrderKey={DEFAULT_ORDER_BY}
            dataSource={history}
            footer={<HistoryTableFooter hasError={hasError} isLoading={isLoading} loadMore={loadMore}/>}
            {...tableProps}
        />
    );
};
