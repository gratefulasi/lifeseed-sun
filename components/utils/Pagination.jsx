import Head from 'next/head';
import Link from 'next/link';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { Box, CircularProgress, Divider, IconButton } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import DisplayError from './ErrorMessage';
import { perPage } from '../../config';

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY($type: String!) {
    _allPresentsMeta(where: { type: $type }) {
      count
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  ...theme.customTheme,
  pagination: {
    textAlign: 'center',
    display: 'inline-grid',
    gridTemplateColumns: 'repeat(4, auto)',
    alignItems: 'stretch',
    justifyContent: 'right',
    alignContent: 'left',
  },
}));

export default function Pagination({ page, type }) {
  const classes = useStyles();
  const { error, loading, data } = useQuery(PAGINATION_QUERY, {
    variables: { type: type === 'posts' ? 'POST' : 'OFFER' },
  });
  if (loading) return <CircularProgress />;
  if (error) return <DisplayError error={error} />;
  const { count } = data._allPresentsMeta;
  const pageCount = Math.ceil(count / perPage);
  return (
    <>
      {count !== 0 ? (
        <Box className={classes.pagination}>
          <Head>
            <title>
              {type} - Page {page} of {pageCount}
            </title>
          </Head>

          <Link href={`/${type}/${page - 1}`}>
            <IconButton disabled={page <= 1}>
              <NavigateBeforeIcon color={page <= 1 ? 'secondary' : 'primary'} />
            </IconButton>
          </Link>
          <Box style={{ alignSelf: 'center' }}>
            Page <b>{page}</b>/{pageCount} of <b>{count}</b> items
          </Box>
          <Link href={`/${type}/${page + 1}`}>
            <IconButton disabled={page >= pageCount}>
              <NavigateNextIcon
                color={page >= pageCount ? 'secondary' : 'primary'}
              />
            </IconButton>
          </Link>
        </Box>
      ) : (
        <Divider />
      )}
    </>
  );
}
