import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
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
    const res = await reset().catch(console.error);
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
            <Avatar className={classes.resetImage}>
              <NatureIcon />
            </Avatar>
            <Typography component="h1" variant="h1">
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
