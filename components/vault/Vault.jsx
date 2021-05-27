import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  CircularProgress,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  ...theme.customTheme,
  cta: {
    display: 'inline-block',
    background: theme.palette.primary.main,
    padding: '.3em 1em',
    // fontWeight: 'bold',
    borderRadius: '4px',
    margin: '.5em',
    fontFamily: 'Playfair Display',
  },
  vaultHeader: {
    color: 'red',
  },
  vaultData: {
    fontFamily: 'Playfair Display',
    fontWeight: 'bold',
  },
}));

export default function Vault() {
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>Vault</title>
      </Head>

      <Box className={classes.space}>
        <Card className={classes.cardView}>
          <Box display="flex" justifyContent="flex-start" alignContent="center">
            <AccountBalanceWalletIcon
              fontSize="large"
              color="secondary"
              style={{ margin: '1rem' }}
            />
            <Typography variant="h1" className={classes.vaultHeader}>
              Vault
            </Typography>
          </Box>

          <CardContent>
            <Grid
              container
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <Typography variant="h1" className={classes.vaultData}>
                Balance
              </Typography>
              <Box padding=".25rem" marginBottom="1rem">
                <Typography>
                  To be able to use your available leaves you need to validate
                  your lifetree. Contact the person who you've heard of lifeseed
                  from.
                </Typography>
              </Box>
            </Grid>
          </CardContent>
          <CardActions disableSpacing>
            <Button color="primary" variant="contained" className={classes.cta}>
              Send money
            </Button>
            <Button color="primary" variant="contained" className={classes.cta}>
              Transactions
            </Button>
            <Button color="primary" variant="contained" className={classes.cta}>
              Fund
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
