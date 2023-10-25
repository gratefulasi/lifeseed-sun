import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Button } from '@mui/material';
import ExitToApp from '@mui/icons-material/ExitToApp';
import { makeStyles } from '@mui/styles';
import { CURRENT_LIFESEED_QUERY } from './useLifeseed';

const SIGNOUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

const useStyles = makeStyles((theme) => ({
  ...theme.customTheme,
}));

export default function SignOut() {
  const classes = useStyles();
  const [signout] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_LIFESEED_QUERY }],
  });
  return (
    <Button
      className={classes.menuButton}
      type="button"
      onClick={signout}
      endIcon={<ExitToApp />}
    >
      Sign Out
    </Button>
  );
}
