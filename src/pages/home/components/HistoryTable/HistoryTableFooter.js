import React from 'react';
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    tableFooter: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    tableFooterError: {
        marginBottom: 10,
    },
});

export const HistoryTableFooter = ({hasError, isLoading, loadMore}) => {
    const classes = useStyles();

    const buttonText = hasError ? 'Retry' : 'Load more';

    return (
        <div className={classes.tableFooter} data-testid="history-table-footer">
            {hasError && (
                <Typography data-testid="error-message" className={classes.tableFooterError} color='error'>
                    We had problem fetching your data. Please try again.
                </Typography>
            )}

            {isLoading
                ? <CircularProgress data-testid="load-more-spinner"/>
                : (
                    <Button data-testid="load-more-button" variant="contained" color="primary" onClick={loadMore}>
                        {buttonText}
                    </Button>
                )
            }
        </div>
    );
};
