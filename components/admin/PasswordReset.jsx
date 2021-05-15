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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Error from '../utils/ErrorMessage';
import Version from './Version';
import useForm from '../../lib/useForm';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemLifeseedPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      message
      code
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  ...theme.customTheme,
  resetImage: {
    backgroundImage:
      'url(https://res.cloudinary.com/ezimg/image/upload/v1618617873/lifeseed/59b3485be0f19.image_jnn6tx.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

export default function Reset({ token }) {
  const classes = useStyles();

  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });
  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(inputs);
    const res = await reset().catch(console.error);
    console.log(res);
    console.log({ data, loading });
    resetForm();
  }
  const goodError = data?.redeemLifeseedPasswordResetToken?.code
    ? data?.redeemLifeseedPasswordResetToken
    : undefined;
  return (
    <>
      <Grid container component="main" className={classes.adminRoot}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.resetImage} />
        <Grid item xs={12} sm={8} md={5}>
          <Paper className={classes.adminPaper} elevation={3}>
            <Avatar className={classes.adminAvatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset password
            </Typography>
            <Error error={error || goodError} />
            {loading && (
              <CircularProgress
                size={24}
                className={classes.circularProgress}
              />
            )}
            {data?.redeemLifeseedPasswordResetToken === null && (
              <p>Success! You can now sign in.</p>
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
              {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.adminSubmit}
              >
                Reset password
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/signin">
                    <a style={{ color: 'black', textDecoration: 'none' }}>
                      Sign in
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
