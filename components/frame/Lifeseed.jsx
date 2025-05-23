import { Avatar, Box, IconButton, Typography } from '@material-ui/core';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import NatureIcon from '@material-ui/icons/NatureOutlined';
import NaturePeopleOutlinedIcon from '@material-ui/icons/NaturePeopleOutlined';
import { useLifeseed } from '../admin/useLifeseed';

const useStyles = makeStyles((theme) => ({
  ...theme.customTheme,
}));

function Lifeseed() {
  const classes = useStyles();
  const lifeseed = useLifeseed();
  return (
    <Link
      href={
        lifeseed?.lifetree?.id
          ? `/lifetree/${lifeseed.lifetree?.id}`
          : '/saveLifetree'
      }
    >
      <Box className={classes.lifeseed}>
        {lifeseed ? (
          <Avatar aria-label="lifetree" className={classes.avatar}>
            {lifeseed?.lifetree?.image ? (
              <img src={lifeseed?.lifetree?.image} style={{ height: '137%' }} />
            ) : (
              <IconButton style={{ backgroundColor: '#fff' }}>
                <NaturePeopleOutlinedIcon />
              </IconButton>
            )}
          </Avatar>
        ) : (
          ''
        )}
        {/* <Typography>{lifeseed?.name}</Typography> */}
      </Box>
    </Link>
  );
}

export default Lifeseed;
