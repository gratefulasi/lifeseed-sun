import { useMutation } from '@apollo/client';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import React, { useRef, useState } from 'react';
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
} from '@mui/material';
import gql from 'graphql-tag';
import Router from 'next/router';
import { makeStyles } from '@mui/styles';
import useForm from '../../lib/useForm';
import CloudinaryImage from '../utils/CloudinaryImage';
import DisplayError from '../utils/ErrorMessage';
import {
  ALL_PRESENTS_QUERY,
  CREATE_PRESENT_MUTATION,
} from '../common/PresentMutations';
import { PAGINATION_QUERY } from '../utils/Pagination';
import { perPage } from '../../config';
import { joditConfig } from '../../lib/theme';

const importJodit = () => import('jodit-react');
const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

const useStyles = makeStyles((theme) => ({
  ...theme.customTheme,
}));

export default function PresentCreate() {
  const { t } = useTranslation();
  const classes = useStyles();
  const [image, setImage] = useState();
  const editor = useRef(null);
  const now = new Date().toISOString();
  const [content, setContent] = useState('');
  
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: '',
    image: '',
    price: 0,
    value: 0,
    body: '',
  });

  const [createPresent, { data, error, loading }] = useMutation(
    CREATE_PRESENT_MUTATION,
    {
      variables: { ...inputs, image, body: content, creationTime: now, type: 'OFFER' },
      refetchQueries: [
        {
          query: ALL_PRESENTS_QUERY,
          variables: {
            skip: 0,
            first: perPage,
            type: 'OFFER',
          },
        },
        {
          query: PAGINATION_QUERY,
          variables: { type: 'OFFER' },
        },
      ],
      awaitRefetchQueries: true,
    }
  );

  return (
    <>
      <Head>
        <title>{inputs.name}</title>
      </Head>
      <DisplayError error={error} />
      <Box className={classes.space}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            createPresent();
            clearForm();
            Router.push({
              pathname: '/presents',
            });
          }}
        >
          {loading ? (
            <LinearProgress color="secondary" />
          ) : (
            <Card className={classes.cardView}>
              <Typography variant="h1" className={classes.cardHeader}>
                Create present
              </Typography>
              <img className={classes.image} src={image} />
              <CardContent>
                <Grid container style={{ position: 'relative' }}>
                  <CloudinaryImage setImage={setImage} />
                  <TextField
                    aria-label={t('Name')}
                    label={t('Name')}
                    id="name"
                    name="name"
                    size="small"
                    value={inputs.name}
                    onChange={handleChange}
                    variant="outlined"
                    className={classes.field}
                  />
                  <TextField
                    aria-label={t('Value')}
                    label={t('Value')}
                    id="value"
                    name="value"
                    size="small"
                    value={inputs.value}
                    onChange={handleChange}
                    type="number"
                    variant="outlined"
                    className={classes.field}
                  />
                  <TextField
                    aria-label={t('Price')}
                    label={t('Price')}
                    id="price"
                    name="price"
                    size="small"
                    value={inputs.price}
                    onChange={handleChange}
                    type="number"
                    variant="outlined"
                    className={classes.field}
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
                      pathname: `/presents`,
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
                  Create
                </Button>
              </CardActions>
            </Card>
          )}
        </form>
      </Box>
    </>
  );
}
