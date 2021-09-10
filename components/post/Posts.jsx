import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import LinearProgress from '@material-ui/core/CircularProgress';
import { perPage } from '../../config';
import Post from './Post';
import { ALL_PRESENTS_QUERY } from '../common/PresentMutations';

const useStyles = makeStyles((theme) => ({
  ...theme.customTheme,
}));

export default function Presents({ page }) {
  const classes = useStyles();
  const { data, error, loading } = useQuery(ALL_PRESENTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
      type: 'POST',
    },
  });
  if (loading) return <LinearProgress color="secondary" />;
  if (error) return <Box>Error: {error.message}</Box>;
  return (
    <Box className={classes.space}>
      <Grid container spacing={1} className={classes.presentList}>
        {data?.allPresents.map((present) => (
          <Post key={present.id} present={present} />
        ))}
      </Grid>
    </Box>
  );
}
