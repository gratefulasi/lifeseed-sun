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

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    createLifeseed(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  ...theme.customTheme,
  signupImage: {
    backgroundImage:
      'url(https://res.cloudinary.com/lifeseed/image/upload/v1622322226/lifeseed/lifeseed-4_aqjuhc.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const router = useRouter();

  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_LIFESEED_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signup().catch(
      console.log("res in catch:", res)
    );

    if (res?.data?.authenticateLifeseedWithPassword?.code !== 'FAILURE') {
      router.push('/signin');
    }
    //resetForm();
    
  }
  //console.dir(error?.graphQLErrors[0].message.contains('E11000'))

  return (
    <>
      <Grid container component="main" className={classes.adminRoot}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.signupImage} />
        <Grid item xs={12} sm={8} md={5}>
          <Paper className={classes.adminPaper} elevation={3}>
            {data?.createLifeseed && (
              <p>Signed up with {data.createLifeseed.email} - Please sign in</p>
            )}
            <Avatar className={classes.signupImage}>
              <NatureIcon />
            </Avatar>
            <Typography component="h1" variant="h1">
              Join
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
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={inputs.name}
                error={!!inputs.name}
                onChange={handleChange}
                size="small"
              />
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
                minLength="12"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={inputs.confirmPassword}
                error={!!inputs.confirmPassword}
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
                Sign Up
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
                  <Link href="/signin">
                    <a style={{ color: 'black', textDecoration: 'none' }}>
                      Sign in
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
