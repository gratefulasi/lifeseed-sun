import Link from 'next/link';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import { makeStyles } from '@mui/styles';
import {
  Box,
  Dialog,
  Button,
  Card,
  Avatar,
  Badge,
  Tooltip,
} from '@mui/material';
import React, { useState } from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import ForumIcon from '@mui/icons-material/Forum';
import AddCommentSharp from '@mui/icons-material/AddCommentSharp';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import moment from 'moment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import clsx from 'clsx';
import { CURRENT_LIFESEED_QUERY, useLifeseed } from '../admin/useLifeseed';
import CommentPresent from '../common/CommentPresent';
import {
  LOVE_MUTATION,
  SINGLE_PRESENT_QUERY,
  DELETE_PRESENT_MUTATION,
  update,
} from '../common/PresentMutations';

const useStyles = makeStyles((theme) => ({
  ...theme.customTheme,
}));

export default function Post({ present, singleView }) {
  const { id } = present;
  const lifeseed = useLifeseed();
  const classes = useStyles();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [addCommentExpanded, setAddCommentExpanded] = useState(false);
  const [commentsExpanded, setCommentsExpanded] = useState(false);

  const handleAddCommentClick = () => {
    setAddCommentExpanded(!addCommentExpanded);
    setCommentsExpanded(!addCommentExpanded);
  };

  const handleExpandCommentsClick = () => {
    setCommentsExpanded(!commentsExpanded);
  };

  const [deletePresent, { loading }] = useMutation(DELETE_PRESENT_MUTATION, {
    variables: {
      id,
    },
    update,
  });

  const [love] = useMutation(LOVE_MUTATION, {
    variables: {
      id,
    },
    refetchQueries: [
      {
        query: SINGLE_PRESENT_QUERY,
        variables: {
          id,
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  return (
    <>
      <Box style={{ position: 'relative' }}>
        <Card className={singleView ? classes.singleCard : classes.card}>
          <Link href={`/post/${present.id}`}>
            <CardHeader
              avatar={
                <Avatar aria-label="lifetree" className={classes.avatar}>
                  <img
                    src={present.lifeseed?.lifetree?.image}
                    style={{ height: '137%' }}
                  />
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={present.name}
              titleTypographyProps={singleView ? { variant: 'h3' } : {}}
              style={{ cursor: 'pointer' }}
              subheader={moment(present.creationTime).fromNow()}
            />
          </Link>
          <CardContent>
            <Box
              height={singleView ? '100%' : '5rem'}
              style={{ overflow: 'hidden' }}
              dangerouslySetInnerHTML={{
                __html: present.body,
              }}
            />
          </CardContent>
          <CardActions disableSpacing>
            {singleView && (
              <IconButton
                aria-label="back"
                variant="outlined"
                onClick={() =>
                  Router.push({
                    pathname: `/posts`,
                  })
                }
              >
                <ArrowBackIosIcon />
              </IconButton>
            )}
            <IconButton
              aria-label="love"
              onClick={() => {
                love().catch((err) => alert(err.message));
              }}
            >
              <Badge badgeContent={present.loves?.length} color="secondary">
                {lifeseed &&
                present.loves?.find(
                  (love) => love.lifeseed?.id === lifeseed.id
                ) ? (
                  <FavoriteIcon color="secondary" style={{ color: 'red' }} />
                ) : (
                  <FavoriteIcon />
                )}
              </Badge>
            </IconButton>
            <Tooltip title="Comment on post">
              <IconButton
                aria-label="Comment"
                onClick={handleExpandCommentsClick}
              >
                <Badge
                  badgeContent={present.comments?.length}
                  color="secondary"
                >
                  <ForumIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <IconButton aria-label="Comment" onClick={handleAddCommentClick}>
              <AddCommentSharp />
            </IconButton>
            {lifeseed && present?.lifeseed?.id === lifeseed.id && (
              <IconButton
                aria-label="delete"
                disabled={loading}
                variant="outlined"
                onClick={() => {
                  setConfirmOpen(true);
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            )}
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: commentsExpanded,
              })}
              onClick={handleExpandCommentsClick}
              aria-expanded={commentsExpanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <CommentPresent
            commentsExpanded={singleView || commentsExpanded}
            addCommentExpanded={addCommentExpanded}
            present={present}
            lifeseed={lifeseed}
          />
        </Card>
      </Box>
      <Dialog open={confirmOpen} fullWidth>
        <Box p={4}>
          <Box m={4}>
            <Typography variant="h4">
              Would you like to delete post <b>{present.name}</b> ?
            </Typography>
          </Box>

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              color="primary"
              id="cancel"
              onClick={() => setConfirmOpen(false)}
              style={{ marginRight: '7px' }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              id="post"
              type="submit"
              onClick={() => {
                deletePresent().catch((err) => alert(err.message));
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
