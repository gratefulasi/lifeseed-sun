import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ExtensionIcon from '@material-ui/icons/Extension';
import ReceiptIcon from '@material-ui/icons/Receipt';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import NaturePeopleOutlinedIcon from '@material-ui/icons/NaturePeopleOutlined';
import moment from 'moment';
import { useLifeseed } from '../admin/useLifeseed';

const useStyles = makeStyles((theme) => ({
  ...theme.customTheme,
  cta: {
    display: 'inline-block',
    background: theme.palette.primary.main,
    padding: '.3em 1em',
    // fontWeight: 'bold',
    borderRadius: '4px',
    margin: '.5em',
  },
  vaultHeader: {
    color: 'red',
  },
  vaultData: {
    marginRight: '.3em',
  },
}));

export default function Vault() {
  const classes = useStyles();
  const lifeseed = useLifeseed();
  const [availableBalance, setAvailableBalance] = useState('');
  const now = new Date().getTime();

  useEffect(() => {
    const interval = setInterval(
      () => setAvailableBalance(new Date().getTime() - now),
      1000
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Vault</title>
      </Head>

      <Box className={classes.space}>
        <Card className={classes.singleCard}>
          <CardHeader
            avatar={
              <Avatar aria-label="lifetree">
                <AccountBalanceWalletIcon color="primary" />
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="The vault of your leaves"
            style={{ cursor: 'pointer' }}
            subheader={`Updated: ${moment(new Date()).fromNow()}`}
          />
          <CardContent>
            <Grid
              container
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <Typography variant="h2" className={classes.vaultData}>
                Starting balance:
              </Typography>
              <Typography variant="h5" className={classes.vaultData}>
                Based on lifetrees planted
              </Typography>
              <Grid
                container
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <Typography variant="h4" className={classes.vaultData}>
                  {(1 / 7) * 1000000}
                </Typography>
                <Box>
                  <IconButton
                    aria-label="settings"
                    size="small"
                    style={{
                      backgroundColor: 'yellow',
                      padding: '.3rem',
                      marginTop: '.1rem',
                      border: '1px solid grey',
                    }}
                  >
                    |=|
                  </IconButton>
                </Box>
              </Grid>
              <Typography variant="h2" className={classes.vaultData}>
                Available balance:
              </Typography>
              <Typography variant="h5" className={classes.vaultData}>
                Based on the time of planting and flow
              </Typography>
              <Grid
                container
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <Typography variant="h4" className={classes.vaultData}>
                  {availableBalance}
                </Typography>
                <Box>
                  <IconButton
                    aria-label="settings"
                    size="small"
                    style={{
                      backgroundColor: 'yellow',
                      padding: '.3rem',
                      marginTop: '.1rem',
                      border: '1px solid grey',
                    }}
                  >
                    |=|
                  </IconButton>
                </Box>
              </Grid>

              <Box padding=".25rem" marginBottom="1rem">
                <Typography variant="h5">
                  To be able to use your available leaves you need to validate
                  your lifetree.
                </Typography>
                <Typography variant="h5">
                  Contact the person who you've heard of lifeseed from.
                </Typography>
              </Box>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              variant="text"
              endIcon={<SendIcon />}
              size="small"
            >
              Send
            </Button>
            <Button
              color="primary"
              variant="text"
              endIcon={<ReceiptIcon />}
              size="small"
            >
              Exchanges
            </Button>
            <Button
              color="primary"
              variant="text"
              endIcon={<ExtensionIcon />}
              size="small"
            >
              Support
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
