import { useMutation, useQuery } from '@apollo/client';
import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import gql from 'graphql-tag';
import Head from 'next/head';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  LinearProgress,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import { ArrowBack } from '@material-ui/icons';
import moment from 'moment';
import useForm from '../../lib/useForm';
import DisplayError from '../utils/ErrorMessage';
import CloudinaryImage from '../utils/CloudinaryImage';
import { joditConfig } from '../../lib/theme';

const importJodit = () => import('jodit-react');
const JoditEditor = dynamic(importJodit, {
  ssr: false,
});

const SINGLE_PRESENT_QUERY = gql`
  query SINGLE_PRESENT_QUERY($id: ID!) {
    Present(where: { id: $id }) {
      body
      comments {
        id
        creationTime
        body
        lifeseed {
          id
          lifetree {
            image
          }
        }
      }
      image
      price
      value
      loves {
        id
        lifeseed {
          id
        }
      }
      creationTime
      id
      lifeseed {
        lifetree {
          image
        }
      }
      name
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  ...theme.customTheme,
}));

const UPDATE_PRESENT_MUTATION = gql`
  mutation UPDATE_PRESENT_MUTATION(
    $body: String
    $id: ID!
    $image: String
    $name: String
    $price: Int
    $value: Int
  ) {
    updatePresent(
      data: {
        body: $body
        image: $image
        name: $name
        price: $price
        value: $value
      }
      id: $id
    ) {
      body
      id
      image
      name
      price
      value
    }
  }
`;

export default function PresentUpdate({ id }) {
  const classes = useStyles();
  const [image, setImage] = useState();
  const editor = useRef(null);
  const { data = {}, loading } = useQuery(SINGLE_PRESENT_QUERY, {
    variables: {
      id,
    },
  });
  const { inputs, handleChange } = useForm(
    data.Present || { name: '', price: '', value: '', body: '', image: '' }
  );
  const [content, setContent] = useState(inputs.body);
  const [updatePresent, { loading: updating, error }] = useMutation(
    UPDATE_PRESENT_MUTATION
  );
  if (updating)
    return (
      <Backdrop className={classes.backdrop} open={updating}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  return (
    <>
      <Head>
        <title>{inputs.name}</title>
      </Head>
      <Box className={classes.space}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await updatePresent({
              variables: {
                body: content,
                id,
                image,
                name: inputs.name,
                price: inputs.price,
                value: inputs.value,
              },
            }).catch(console.error);
            Router.push({
              pathname: `/present/${res.data.updatePresent.id}`,
            });
          }}
        >
          <Card className={classes.cardView}>
            <CardHeader
              avatar={
                <Avatar aria-label="lifetree" className={classes.avatar}>
                  <img
                    src={data.Present?.lifeseed?.lifetree?.image}
                    style={{ height: '100%' }}
                  />
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={inputs.name}
              style={{ cursor: 'pointer' }}
              subheader={moment(data.Present?.creationTime).fromNow()}
            />
            <CardContent>
              <img
                className={classes.image}
                src={image || data.Present?.image}
              />
              <DisplayError error={error} />
              {loading ? (
                <LinearProgress color="secondary" />
              ) : (
                <>
                  <Grid container style={{ position: 'relative' }}>
                    <CloudinaryImage setImage={setImage} />
                    <TextField
                      type="text"
                      id="name"
                      name="name"
                      label="Title"
                      placeholder="Title"
                      value={inputs.name}
                      onChange={handleChange}
                      variant="filled"
                      className={classes.field}
                      size="small"
                    />
                    <TextField
                      type="number"
                      id="value"
                      name="value"
                      label="Value"
                      placeholder="Value"
                      value={inputs.value}
                      onChange={handleChange}
                      variant="outlined"
                      className={classes.field}
                      size="small"
                    />
                    <TextField
                      type="number"
                      id="price"
                      name="price"
                      label="Price"
                      placeholder="Price"
                      value={inputs.price}
                      onChange={handleChange}
                      variant="outlined"
                      className={classes.field}
                      size="small"
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
            <CardActions disableSpacing>
              <Button
                color="primary"
                onClick={() =>
                  Router.push({
                    pathname: `/presents`,
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
                Update
              </Button>
            </CardActions>
          </Card>
        </form>
      </Box>
    </>
  );
}
