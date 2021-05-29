import Link from 'next/link';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { useRouter } from 'next/router';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import NatureIcon from '@material-ui/icons/NatureOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Error from '../utils/ErrorMessage';
import Version from './Version';
import { CURRENT_LIFESEED_QUERY } from './useLifeseed';
import useForm from '../../lib/useForm';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateLifeseedWithPassword(email: $email, password: $password) {
      ... on LifeseedAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on LifeseedAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  ...theme.customTheme,
  loginImage: {
    backgroundImage:
      'url(https://res.cloudinary.com/lifeseed/image/upload/v1622318391/lifeseed/signin_trezfg.jpg)',
    // 'url(https://res.cloudinary.com/ezimg/image/upload/v1618246418/lifeseed/signin_xzwln8.jpg)',
    // 'url(https://res.cloudinary.com/ezimg/image/upload/ar_1,c_fill,r_max/v1618246418/lifeseed/signin_xzwln8.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const router = useRouter();
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });
  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_LIFESEED_QUERY }],
  });
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(inputs);
    const res = await signin();
    if (res?.data?.authenticateLifeseedWithPassword?.code !== 'FAILURE')
      router.push('/');
    resetForm();
  }
  const error =
    data?.authenticateLifeseedWithPassword.__typename ===
    'LifeseedAuthenticationWithPasswordFailure'
      ? data?.authenticateLifeseedWithPassword
      : undefined;

  return (
    <>
      <Grid container component="main" className={classes.adminRoot}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.loginImage} />
        <Grid item xs={12} sm={8} md={5}>
          <Paper className={classes.adminPaper} elevation={3}>
            <Avatar className={classes.loginImage}>
              <NatureIcon />
            </Avatar>
            <Typography component="h1" variant="h1">
              Welcome!
            </Typography>
            <Error error={error} />
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
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={inputs.password}
                error={!!inputs.password}
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
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/reset">
                    <a style={{ color: 'black', textDecoration: 'none' }}>
                      Forgot password?
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
