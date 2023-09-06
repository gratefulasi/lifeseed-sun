import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useApp } from '../../lib/appState';

const useStyles = makeStyles((theme) => ({
    ...theme.customTheme,
}));

export default function Title() {
    const classes = useStyles();
    const {title} = useApp();
    return (<Box className={classes.mainTitle}>{title}</Box>)
}