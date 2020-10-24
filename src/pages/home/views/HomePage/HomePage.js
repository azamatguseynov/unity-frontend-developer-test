import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {HistoryTable} from "../../components/HistoryTable";
import api from "../../../../lib/api";
import Typography from "@material-ui/core/Typography";
import {getDateFromTimestamp} from "../../helpers/getDateFromTimestamp";

const useStyles = makeStyles({
    heading: {
        margin: "50px 0"
    }
});

const USERS_COLUMNS = [
    {key: 'timestamp', title: 'Date', sortable: true, render: getDateFromTimestamp},
    {key: 'id', title: 'User ID'},
    {key: 'diff[0].oldValue', title: 'Old Value'},
    {key: 'diff[0].newValue', title: 'New Value'}
];

const PROJECTS_COLUMNS = [
    {key: 'timestamp', title: 'Date', sortable: true, render: getDateFromTimestamp},
    {key: 'id', title: 'Project ID'},
    {key: 'diff[0].oldValue', title: 'Old Value'},
    {key: 'diff[0].newValue', title: 'New Value'}
];

const {getUsersDiff, getProjectsDiff} = api;

export const HomePage = () => {
    const classes = useStyles();

    return (
        <>
            <Typography className={classes.heading} variant="h3">Users History</Typography>
            <HistoryTable columns={USERS_COLUMNS} fetchHistory={getUsersDiff}/>

            <Typography className={classes.heading} variant="h3">Projects History</Typography>
            <HistoryTable columns={PROJECTS_COLUMNS} fetchHistory={getProjectsDiff}/>
        </>
    );
};
