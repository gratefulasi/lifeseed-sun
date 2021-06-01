import { useMutation, useQuery } from '@apollo/client';
import React, { useRef, useState } from 'react';
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
  IconButton,
  Typography,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import { ArrowBack } from '@material-ui/icons';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import NatureIcon from '@material-ui/icons/Nature';
import useForm from '../../lib/useForm';
import DisplayError from '../utils/ErrorMessage';
import CloudinaryImage from '../utils/CloudinaryImage';
import { CURRENT_LIFESEED_QUERY } from '../admin/useLifeseed';
import { joditConfig } from '../../lib/theme';

const importJodit = () => import('jodit-react');
const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

const SINGLE_LIFETREE_QUERY = gql`
  query SINGLE_LIFETREE_QUERY($id: ID!) {
    Lifetree(where: { id: $id }) {
      id
      name
      image
      body
      status
      latitude
      longitude
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  ...theme.customTheme,
}));

const UPDATE_LIFETREE_MUTATION = gql`
  mutation UPDATE_LIFETREE_MUTATION(
    $id: ID!
    $name: String
    $image: String
    $body: String
    $latitude: String
    $longitude: String
  ) {
    updateLifetree(
      id: $id
      data: {
        name: $name
        body: $body
        image: $image
        latitude: $latitude
        longitude: $longitude
      }
    ) {
      id
      name
      image
      body
      latitude
      longitude
    }
  }
`;

export default function UpdateLifetree({ id }) {
  const classes = useStyles();
  const [image, setImage] = useState();
  const editor = useRef(null);

  const { data = {}, loading } = useQuery(SINGLE_LIFETREE_QUERY, {
    variables: {
      id,
    },
  });
  const { inputs, handleChange } = useForm(
    data.Lifetree || {
      name: '',
      image: '',
      body: '',
      latitude: '',
      longitude: '',
    }
  );
  const [content, setContent] = useState(inputs.body);
  const [updateLifetree, { loading: updating, error }] = useMutation(
    UPDATE_LIFETREE_MUTATION,
    {
      variables: {
        id,
        ...inputs,
        image,
      },
      refetchQueries: [
        { query: SINGLE_LIFETREE_QUERY, variables: { id } },
        { query: CURRENT_LIFESEED_QUERY },
      ],
    }
  );
  if (error) return <DisplayError error={error} />;
  return (
    <>
      <Head>
        <title>{inputs.name}</title>
      </Head>

      <Box className={classes.space}>
        <ValidatorForm
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await updateLifetree({
              variables: {
                id,
                name: inputs.name,
                image,
                body: content,
                latitude: inputs.latitude,
                longitude: inputs.longitude,
              },
            }).catch(console.error);
            Router.push({
              pathname: `/lifetree/${res?.data?.updateLifetree?.id}`,
            });
          }}
        >
          <Card className={classes.cardView}>
            <Box display="flex" justifyContent="space-between">
              <Box margin="1rem" marginRight="0">
                <IconButton style={{ padding: '.5rem' }}>
                  <NatureIcon />
                </IconButton>
              </Box>
              <Typography variant="h1" className={classes.cardHeader}>
                {inputs.name}
              </Typography>
              {!data.Lifetree?.image ? (
                <CloudinaryImage
                  setImage={setImage}
                  style={{ padding: '.5rem' }}
                />
              ) : (
                ''
              )}
            </Box>

            {(loading || updating) && <LinearProgress color="secondary" />}
            <img
              className={classes.image}
              src={image || data.Lifetree?.image}
            />
            {loading || updating ? (
              <LinearProgress color="secondary" />
            ) : (
              <>
                <CardContent>
                  <DisplayError error={error} />
                  {loading ? (
                    <LinearProgress color="secondary" />
                  ) : (
                    <>
                      <Grid container style={{ position: 'relative' }}>
                        {data.Lifetree?.image && (
                          <CloudinaryImage setImage={setImage} />
                        )}
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
                        value={inputs.body}
                        config={joditConfig({ readonly: false })}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={(newContent) => setContent(newContent)}
                        onChange={(newContent) => {}}
                      />
                    </>
                  )}
                </CardContent>
                <CardActions disableSpacing style={{ position: 'relative' }}>
                  <Button
                    color="primary"
                    onClick={() =>
                      Router.push({
                        pathname: `/lifetree/${id}`,
                      })
                    }
                    endIcon={<ArrowBack />}
                    variant="text"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    style={{ right: '7%', bottom: '10%', position: 'absolute' }}
                  >
                    <Box className={classes.growButton}>grow</Box>
                  </Button>
                </CardActions>
              </>
            )}
          </Card>
        </ValidatorForm>
      </Box>
    </>
  );
}
