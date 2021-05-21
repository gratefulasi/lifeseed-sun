import { useMutation } from '@apollo/client';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from '@material-ui/core';
import Router from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useRef } from 'react';
import DisplayError from '../utils/ErrorMessage';
import { perPage } from '../../config';
import { PAGINATION_QUERY } from '../utils/Pagination';
import {
  CREATE_PRESENT_MUTATION,
  ALL_PRESENTS_QUERY,
} from '../common/PresentMutations';

const useStyles = makeStyles((theme) => ({
  ...theme.customTheme,
}));

const importJodit = () => import('jodit-react');
const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

export default function PostCreate() {
  const { t } = useTranslation();
  const classes = useStyles();
  const now = new Date().toISOString();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const [createPresent, { data, error, loading }] = useMutation(
    CREATE_PRESENT_MUTATION,
    {
      variables: {
        name: title,
        body: content,
        creationTime: now,
        type: 'POST',
      },
      refetchQueries: [
        {
          query: ALL_PRESENTS_QUERY,
          variables: {
            skip: 0,
            first: perPage,
            type: 'POST',
          },
        },
        {
          query: PAGINATION_QUERY,
          variables: { type: 'POST' },
        },
      ],
      awaitRefetchQueries: true,
    }
  );

  console.log(createPresent);

  const editor = useRef(null);

  const config = {
    readonly: false,
    height: 400,
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <DisplayError error={error} />
      <Box className={classes.space}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            createPresent();
            Router.push({
              pathname: `/posts`,
            });
          }}
        >
          {loading ? (
            <LinearProgress color="secondary" />
          ) : (
            <Card className={classes.cardView}>
              <Typography variant="h1" className={classes.cardHeader}>
                Create post
              </Typography>
              <CardContent>
                <Grid container style={{ position: 'relative' }}>
                  <TextField
                    aria-label={t('Title')}
                    label={t('Title')}
                    id="title"
                    name="title"
                    size="small"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    variant="outlined"
                    className={classes.field}
                  />
                  <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent) => {}}
                  />
                </Grid>
              </CardContent>
              <CardActions disableSpacing>
                <Button
                  color="primary"
                  onClick={() =>
                    Router.push({
                      pathname: `/posts`,
                    })
                  }
                  variant="contained"
                >
                  List
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  style={{ marginLeft: 'auto' }}
                  variant="contained"
                >
                  Post
                </Button>
              </CardActions>
            </Card>
          )}
        </form>
      </Box>
    </>
  );
}
