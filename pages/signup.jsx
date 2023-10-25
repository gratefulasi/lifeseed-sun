import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SignUp from '../components/admin/SignUp';

const useStyles = makeStyles((theme) => ({
  ...theme.customTheme,
  signIn: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gridGap: '2rem',
  },
}));

export default function SignInPage() {
  const classes = useStyles();
  return (
    <Box className={classes.signIn}>
      <SignUp />
    </Box>
  );
}
