import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import LinearProgress from '@material-ui/core/CircularProgress';
import { perPage } from '../../config';
import Present from './Present';
import { useLifeseed } from '../admin/useLifeseed';
import {
  ALL_PRESENTS_QUERY,
  ALL_PRESENTS_QUERY_LIGHT,
} from '../common/PresentMutations';

const useStyles = makeStyles((theme) => ({
  ...theme.customTheme,
}));

export default function Presents({ page }) {
  const lifeseed = useLifeseed();
  const classes = useStyles();
  const { data, error, loading } = useQuery(
    lifeseed ? ALL_PRESENTS_QUERY : ALL_PRESENTS_QUERY_LIGHT,
    {
      variables: {
        skip: page * perPage - perPage,
        first: perPage,
        type: 'OFFER',
      },
    }
  );
  if (loading) return <LinearProgress color="secondary" />;
  if (error) return <Box>Error: {error.message}</Box>;
  return (
    <Box className={classes.space}>
      <Grid container spacing={1} display="flex" justifyContent="center">
        {data?.allPresents.map((present) => (
          <Present key={present.id} present={present} />
        ))}
      </Grid>
    </Box>
  );
}
