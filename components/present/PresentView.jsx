import React from 'react';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import { makeStyles } from '@mui/styles';
import { Box, LinearProgress } from '@mui/material';
import { useLifeseed } from '../admin/useLifeseed';
import { SINGLE_PRESENT_QUERY, SINGLE_PRESENT_QUERY_LIGHT } from '../common/PresentMutations';
import Present from './Present';

const useStyles = makeStyles((theme) => ({
  ...theme.customTheme,
}));

export default function PresentView({ id }) {
  const classes = useStyles();
  const lifeseed = useLifeseed();
  const { data, loading, error } = useQuery(lifeseed ? SINGLE_PRESENT_QUERY : SINGLE_PRESENT_QUERY_LIGHT, {
    variables: { id },
  });
  if (loading) return <LinearProgress color="secondary" />;
  // if (error) return <Box className={classes.error} error={error} />;
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
