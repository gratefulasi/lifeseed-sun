import Link from 'next/link';
import { Badge, IconButton } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StorefrontIcon from '@material-ui/icons/Storefront';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NatureIcon from '@material-ui/icons/Nature';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ForumIcon from '@material-ui/icons/Forum';
import MapIcon from '@material-ui/icons/Map';
import LanguageIcon from '@material-ui/icons/Language';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { useTheme } from '@material-ui/core/styles';

export default function Menu({ lifeseed, openBasket, toggleSearch, signout }) {
  const theme = useTheme();
  const selectedColor = theme.palette.primary.background;

  return (
    <>
      <Link href="/presents">
        <IconButton
          style={{
            color:
              window.location.pathname.includes('/presents') && selectedColor,
          }}
        >
          <StorefrontIcon />
        </IconButton>
      </Link>
      {/* <IconButton onClick={toggleSearch}>
        <SearchIcon />
      </IconButton> */}
      {lifeseed && (
        <>
          <Link href="/posts">
            <IconButton
              style={{
                color:
                  window.location.pathname.includes('/posts') && selectedColor,
              }}
            >
              <ForumIcon />
            </IconButton>
          </Link>
          {/* <Link href="/present">
            <IconButton>
              <AddCircleIcon />
            </IconButton>
          </Link> */}
          {/* <Link href="/packages">
            <IconButton>
              <AllInboxIcon />
            </IconButton>
          </Link> */}
          {/* <Link href="/account">
            <IconButton>
              <AccountCircleIcon />
            </IconButton>
          </Link> */}
          {/* <Link
            href={
              lifeseed.lifetree?.id
                ? `/lifetree/${lifeseed.lifetree?.id}`
                : '/saveLifetree'
            }
          >
            <IconButton>
              <NatureIcon />
            </IconButton>
          </Link> */}
          <Link href="/map">
            <IconButton
              style={{
                color:
                  window.location.pathname.includes('/map') && selectedColor,
              }}
            >
              <MapIcon />
            </IconButton>
          </Link>
          {/* <Link href="/lang">
            <IconButton>
              <LanguageIcon />
            </IconButton>
          </Link> */}
          <Link href="/vault">
            <IconButton
              style={{
                color:
                  window.location.pathname.includes('/vault') && selectedColor,
              }}
            >
              <AccountBalanceWalletIcon />
            </IconButton>
          </Link>
          <IconButton onClick={openBasket}>
            <Badge
              badgeContent={lifeseed.basket.reduce(
                (tally, basketItem) =>
                  tally + (basketItem.present ? basketItem.quantity : 0),
                0
              )}
              color="secondary"
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={signout}>
            <ExitToApp />
          </IconButton>
        </>
      )}
      {!lifeseed && (
        <>
          <Link href="/signin">
            <IconButton onClick={signout}>
              <TransitEnterexitIcon />
            </IconButton>
          </Link>
        </>
      )}
    </>
  );
}
