import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import { Box, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { makeStyles } from '@mui/styles';
import Presents from '../components/present/Presents';
import Pagination from '../components/utils/Pagination';
import { useApp } from '../lib/appState';

const useStyles = makeStyles((theme) => ({
    ...theme.customTheme,
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        height: 'fit-content',
    },
}));

export default function MainPage() {
    const classes = useStyles();
    const { query } = useRouter();
    const { setTitle } = useApp();
    setTitle("lifeseed");
    const page = parseInt(query.page);
    return (
        <Box style={{ paddingRight: '.7rem' }}>
            <Box className={classes.toolbar}>
                <Pagination page={page || 1} type="presents" />
                <Link href="/present">
                    <IconButton>
                        <AddCircleIcon className={classes.addIcon} />
                    </IconButton>
                </Link>
            </Box>
            <Presents page={page || 1} />
            <Pagination page={page || 1} type="presents" />
        </Box>
    );
}
