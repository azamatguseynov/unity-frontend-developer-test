import {useCallback, useMemo, useState} from "react";

const defaultSorter = (a, b, order) => {
    if (a === b) return 0;

    if (order === 'asc') {
        return a < b ? -1 : 1
    }

    if (order === 'desc') {
        return a < b ? 1 : -1
    }
}


export const useTableSort = (dataSource, defaultOrderBy, defaultOrder, columns = []) => {
    const [order, setOrder] = useState(defaultOrder);
    const [orderBy, setOrderBy] = useState(defaultOrderBy);

    const handleSort = useCallback((orderBy, order) => {
        setOrder(order);
        setOrderBy(orderBy);
    }, [])

    const sortFunction = columns.find(({key}) => key === orderBy)?.sorter || defaultSorter;

    const sortedData = useMemo(() => {
        return dataSource.sort(({[orderBy]: a}, {[orderBy]: b}) => sortFunction(a, b, order));
    }, [dataSource, order, orderBy]);

    return {handleSort, sortedData, order, orderBy};
};
