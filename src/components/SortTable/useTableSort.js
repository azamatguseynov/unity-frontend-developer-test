import {useCallback, useMemo, useState} from "react";

const isAsc = (order) => order === 'asc';

export const useTableSort = (dataSource, defaultOrderBy, defaultOrder) => {
    const [order, setOrder] = useState(defaultOrder);
    const [orderBy, setOrderBy] = useState(defaultOrderBy);

    const handleSort = useCallback((orderBy, order) => {
        setOrder(order);
        setOrderBy(orderBy);
    }, [])

    const sortedData = useMemo(() => {
        return dataSource.sort(({[orderBy]: a}, {[orderBy]: b}) => isAsc(order) ? a - b : b - a);
    }, [dataSource, order, orderBy]);

    return {handleSort, sortedData, order, orderBy};
};
