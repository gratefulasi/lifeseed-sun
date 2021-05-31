import { useMutation } from '@apollo/client';
import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import gql from 'graphql-tag';
import Head from 'next/head';
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Card,
  CardActions,
  CardContent,
  Typography,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import { ArrowBack } from '@material-ui/icons';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import useForm from '../../lib/useForm';
import DisplayError from '../utils/ErrorMessage';
import { CURRENT_LIFESEED_QUERY } from '../admin/useLifeseed';
import CloudinaryImage from '../utils/CloudinaryImage';
import { joditConfig } from '../../lib/theme';
import LifetreePosition from './LifetreePosition';

const importJodit = () => import('jodit-react');
const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

const useStyles = makeStyles((theme) => ({
  ...theme.customTheme,
}));

const CREATE_LIFETREE_MUTATION = gql`
  mutation CREATE_LIFETREE_MUTATION(
    $name: String
    $body: String
    $latitude: String
    $longitude: String
    $image: String
  ) {
    createLifetree(
      data: {
        name: $name
        body: $body
        latitude: $latitude
        longitude: $longitude
        status: "ALIVE"
        image: $image
      }
    ) {
      id
      name
      body
      image
      latitude
      longitude
    }
  }
`;

export default function CreateLifetree() {
  const classes = useStyles();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const editor = useRef(null);
  const { inputs, handleChange, clearForm } = useForm({
    name: '',
    body: '',
    image: '',
    latitude: '',
    longitude: '',
  });
  const [createLifetree, { error, planting }] = useMutation(
    CREATE_LIFETREE_MUTATION,
    {
      variables: { ...inputs, image, body: content },
      refetchQueries: [{ query: CURRENT_LIFESEED_QUERY }],
    }
  );
  if (planting || loading) return <CircularProgress />;

  return (
    <>
      <Head>
        <title>Plant lifetree</title>
      </Head>
      <Box className={classes.space}>
        <ValidatorForm
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await createLifetree();
            setLoading(true);
            clearForm();
            Router.push({
              pathname: `/lifetree/${res?.data?.createLifetree?.id}`,
            });
          }}
        >
          <Card className={classes.cardView}>
            <Typography variant="h1" className={classes.cardHeader}>
              {inputs.name || 'Plant a liftree'}
            </Typography>
            <img className={classes.image} src={image} />
            <CardContent>
              <DisplayError error={error} />
              {loading ? (
                <LinearProgress color="secondary" />
              ) : (
                <>
                  <Grid container style={{ position: 'relative' }}>
                    <CloudinaryImage
                      setImage={setImage}
                      style={{ position: 'absolute', top: '-7%', right: '7%' }}
                    />
                    <TextField
                      type="text"
                      id="name"
                      name="name"
                      label="Name"
                      placeholder="Name"
                      value={inputs.name}
                      onChange={handleChange}
                      variant="filled"
                      className={classes.titleField}
                      size="small"
                    />

                    <TextValidator
                      type="text"
                      id="latitude"
                      name="latitude"
                      label="Latitude"
                      placeholder="Latitude"
                      value={inputs.latitude}
                      onChange={handleChange}
                      variant="outlined"
                      className={classes.field}
                      size="small"
                      validators={[
                        'required',
                        'matchRegexp:^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,6})?))$',
                      ]}
                      errorMessages={[
                        'Latitude is required',
                        'Latitude is not valid',
                      ]}
                    />
                    <TextValidator
                      type="text"
                      id="longitude"
                      name="longitude"
                      label="Longitude"
                      placeholder="Longitude"
                      value={inputs.longitude}
                      onChange={handleChange}
                      variant="outlined"
                      className={classes.field}
                      size="small"
                      validators={[
                        'required',
                        'matchRegexp:^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$',
                      ]}
                      errorMessages={[
                        'Longitude is required',
                        'Longitude is not valid',
                      ]}
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
                  <LifetreePosition
                    latitude={inputs.latitude}
                    longitude={inputs.longitude}
                  />
                </>
              )}
            </CardContent>
            <CardActions disableSpacing style={{ position: 'relative' }}>
              <Button
                color="primary"
                onClick={() =>
                  Router.push({
                    pathname: '/',
                  })
                }
                endIcon={<ArrowBack />}
                variant="text"
              >
                Start
              </Button>
              <Button
                type="submit"
                style={{ right: '7%', bottom: '10%', position: 'absolute' }}
              >
                <Box className={classes.growButton}>grow</Box>
              </Button>
            </CardActions>
          </Card>
        </ValidatorForm>
      </Box>
    </>
  );
}
