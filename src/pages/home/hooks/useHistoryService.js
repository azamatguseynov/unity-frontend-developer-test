import {useCallback, useState} from "react";
import {useMountEffect} from "../../../hooks/useMountEffect";

export const useHistoryService = (fetchHistory) => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [history, setHistory] = useState([]);

    useMountEffect(() => {
        loadHistory();
    });

    const loadHistory = useCallback(() => {
        setIsLoading(true);
        setHasError(false);

        fetchHistory()
            .then(({data}) => setHistory(prev => [...prev, ...data]))
            .catch(() => setHasError(true))
            .finally(() => setIsLoading(false))
    }, [fetchHistory]);

    const loadMore = useCallback(() => {
        loadHistory();
    }, [loadHistory])

    return {isLoading, hasError, loadMore, history};
};
