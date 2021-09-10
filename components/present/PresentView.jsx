import React from 'react';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import { Box, LinearProgress } from '@material-ui/core';
import { SINGLE_PRESENT_QUERY } from '../common/PresentMutations';
import Present from './Present';

const useStyles = makeStyles((theme) => ({
  ...theme.customTheme,
}));

export default function PresentView({ id }) {
  const classes = useStyles();
  const { data, loading, error } = useQuery(SINGLE_PRESENT_QUERY, {
    variables: { id },
  });
  if (loading) return <LinearProgress color="secondary" />;
  if (error) return <Box className={classes.error} error={error} />;
  const { present } = data;
  return (
    <>
      <Head>
        <title>{present?.name}</title>
      </Head>
      <Box className={classes.space}>
        <Present present={present} singleView />
      </Box>
    </>
  );
}
