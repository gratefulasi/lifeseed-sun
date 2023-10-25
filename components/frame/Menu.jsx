import Link from 'next/link';
import { Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import TransitEnterexitIcon from '@mui/icons-material/TransitEnterexit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NatureIcon from '@mui/icons-material/Nature';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ForumIcon from '@mui/icons-material/Forum';
import MapIcon from '@mui/icons-material/Map';
import LanguageIcon from '@mui/icons-material/Language';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import ExitToApp from '@mui/icons-material/ExitToApp';
import { useTheme } from '@mui/styles';

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
