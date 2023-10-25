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
} from '@mui/material';
import Router from 'next/router';
import { makeStyles } from '@mui/styles';
import React, { useState, useRef } from 'react';
import { ArrowBack } from '@mui/icons-material';
import DisplayError from '../utils/ErrorMessage';
import { perPage } from '../../config';
import useForm from '../../lib/useForm';
import { joditConfig } from '../../lib/theme';
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
  const { inputs, handleChange } = useForm({});

  const [createPresent, { data, error, loading }] = useMutation(
    CREATE_PRESENT_MUTATION,
    {
      variables: {
        name: inputs.title,
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
  const editor = useRef(null);

  return (
    <>
      <Head>
        <title>{inputs.title ? inputs.title : 'Create post'}</title>
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
          style={{ margin: 0 }}
        >
          {loading ? (
            <LinearProgress color="secondary" />
          ) : (
            <Card className={classes.cardView}>
              <CardContent>
                <Grid container style={{ position: 'relative' }}>
                  <TextField
                    aria-label={t('Title')}
                    label={t('Title')}
                    id="title"
                    name="title"
                    size="small"
                    value={inputs.title}
                    onChange={handleChange}
                    variant="filled"
                    className={classes.titleField}
                  />
                </Grid>
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={joditConfig({ readonly: false })}
                  tabIndex={1} // tabIndex of textarea
                  onBlur={(newContent) => setContent(newContent)}
                  onChange={(newContent) => {}}
                />
              </CardContent>
              <CardActions disableSpacing>
                <Button
                  color="primary"
                  onClick={() =>
                    Router.push({
                      pathname: `/posts`,
                    })
                  }
                  endIcon={<ArrowBack />}
                  variant="text"
                >
                  Back
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
