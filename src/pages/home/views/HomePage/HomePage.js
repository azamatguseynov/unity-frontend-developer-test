import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {HistoryTable} from "../../components/HistoryTable";
import {useHistoryService} from "../../hooks/useHistoryService";
import api from "../../../../lib/api";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    heading: {
        margin: "50px 0"
    }
});

const USERS_HEAD_CELLS = [
    {key: 'timestamp', label: 'Date', sortable: true},
    {key: 'id', label: 'User ID', sortable: false},
    {key: 'oldValue', label: 'Old Value', sortable: false},
    {key: 'newValue', label: 'New Value', sortable: false}
];

const PROJECTS_HEAD_CELLS = [
    {key: 'timestamp', label: 'Date', sortable: true},
    {key: 'id', label: 'Project ID', sortable: false},
    {key: 'oldValue', label: 'Old Value', sortable: false},
    {key: 'newValue', label: 'New Value', sortable: false}
];

const {getUsersDiff, getProjectsDiff} = api;

export const HomePage = () => {
    const classes = useStyles();
    const {
        isLoading: isUsersLoading,
        hasError: hasUsersError,
        loadMore: loadMoreUsers,
        history: usersHistory
    } = useHistoryService(getUsersDiff);

    const {
        isLoading: isProjectsLoading,
        hasError: hasProjectsError,
        loadMore: loadMoreProjects,
        history: projectsHistory
    } = useHistoryService(getProjectsDiff);

    return (
        <>
            <Typography className={classes.heading} variant="h3">Users History</Typography>

            <HistoryTable
                headCells={USERS_HEAD_CELLS}
                isLoading={isUsersLoading}
                loadMore={loadMoreUsers}
                hasError={hasUsersError}
                history={usersHistory}
            />

            <Typography className={classes.heading} variant="h3">Projects History</Typography>

            <HistoryTable
                headCells={PROJECTS_HEAD_CELLS}
                isLoading={isProjectsLoading}
                loadMore={loadMoreProjects}
                hasError={hasProjectsError}
                history={projectsHistory}
            />
        </>
    );
};
