import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import NatureIcon from '@material-ui/icons/NatureOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Error from '../utils/ErrorMessage';
import Version from './Version';
import useForm from '../../lib/useForm';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendLifeseedPasswordResetLink(email: $email) {
      message
      code
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  ...theme.customTheme,
  resetImage: {
    backgroundImage:
      'url(https://res.cloudinary.com/lifeseed/image/upload/v1622322878/lifeseed/607f4ea304aafe986875c777_i6jujd.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

export default function RequestReset() {
  const classes = useStyles();
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });
  const [requestReset, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
      // refetchQueries: [{ query: CURRENT_LIFESEED_QUERY }],
    }
  );
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await requestReset().catch(console.error);
    resetForm();
  }

  return (
    <>
      <Grid container component="main" className={classes.adminRoot}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.resetImage} />
        <Grid item xs={12} sm={8} md={5}>
          <Paper className={classes.adminPaper} elevation={3}>
            <Avatar className={classes.resetImage}>
              <NatureIcon />
            </Avatar>
            <Typography component="h1" variant="h1">
              Request a password reset
            </Typography>
            <Error error={error} />
            {data?.sendLifeseedPasswordResetLink === null && (
              <p>Success! Check your email for a link!</p>
            )}
            {loading && (
              <CircularProgress
                size={24}
                className={classes.circularProgress}
              />
            )}
            <form
              onSubmit={handleSubmit}
              className={classes.adminForm}
              noValidate
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                value={inputs.email}
                error={!!inputs.email}
                onChange={handleChange}
                size="small"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.adminSubmit}
              >
                Password Reset
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/signin">
                    <a style={{ color: 'black', textDecoration: 'none' }}>
                      Sign In
                    </a>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup">
                    <a style={{ color: 'black', textDecoration: 'none' }}>
                      Join
                    </a>
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Version />
              </Box>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
