import {useCallback, useMemo, useState} from "react";

const isAsc = (order) => order === 'asc';

export const useHistoryTableSort = (history, defaultOrderBy, defaultOrder) => {
    const [order, setOrder] = useState(defaultOrder);
    const [orderBy, setOrderBy] = useState(defaultOrderBy);

    const handleSort = useCallback((orderBy, order) => {
        setOrder(order);
        setOrderBy(orderBy);
    }, [])

    const sortedHistory = useMemo(() => {
        return history.sort(({[orderBy]: a}, {[orderBy]: b}) => isAsc(order) ? a - b : b - a);
    }, [history, order, orderBy]);

    return {handleSort, sortedHistory};
};
