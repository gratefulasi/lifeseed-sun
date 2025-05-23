import { createMuiTheme } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

export function joditConfig({ readonly }) {
  return {
    readonly,
    height: 300,
    activeButtonsInReadOnly: ['fullsize'],
    toolbarButtonSize: 'small',
    showWordsCounter: 'false',
    toolbarAdaptive: 'false',
    buttons: [
      // 'source',
      '|',
      'bold',
      'strikethrough',
      'underline',
      'italic',
      '|',
      'ul',
      'ol',
      '|',
      'outdent',
      'indent',
      '|',
      'font',
      'fontsize',
      'brush',
      'paragraph',
      '|',
      'image',
      'video',
      'table',
      'link',
      '|',
      'align',
      'undo',
      'redo',
      '|',
      'hr',
      'eraser',
      'copyformat',
      '|',
      'symbol',
      'fullsize',
      'print',
      'about',
      // 'dots',
    ],
    buttonsMD: ['bold'],
    buttonsLG: ['bold'],
    buttonsXS: [
      'bold',
      'image',
      '|',
      // 'brush',
      'paragraph',
      // '|',
      'align',
      '|',
      'undo',
      'redo',
      '|',
      // 'eraser',
      'dots',
    ],
  };
}

// https://coolors.co/#0e4749-#00a484-#379393-#7f3fe9-#fb5012
// White label theme
const defaultTheme = createMuiTheme({
  /* By convention, MUI uses dark variant on hover */
  palette: {
    primary: {
      main: '#0e4749',
      contrastText: '#f1f1f1',
      hover: '#00a484',
      active: '#379393',
      // focus: '#7f3fe9',
      background: '#fb5012',
      border: '#777777',
      get dark() {
        return this.hover;
      },
    },
    secondary: {
      main: '#D9DDE3',
      contrastText: '#21252C',
      hover: '#EEEFF2',
      active: '#BFC6CF',
      get dark() {
        return this.hover;
      },
    },
    terciary: {
      main: '#404955',
      contrastText: '#fff',
      hover: '#677589',
      active: '#21252C',
      get dark() {
        return this.hover;
      },
    },
    inverted: {
      main: '#fff',
      contrastText: '#21252C',
      hover: '#F6F7F8',
      active: '#BFC6CF',
      get dark() {
        return this.hover;
      },
    },
    mainText: '#21252C',
    backgroundWave: '#dfe5e9',
    white: '#fff',
    success: green,
    silver: '#DFE5E9',
    highlightsAndDividers: '#DFE5E9',
    elementBackground: '#F6F7F8',
    border: '#D9DDE3',
  },
  props: {
    MuiTextField: {
      variant: 'outlined',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 768,
      lg: 1024,
      xl: 1600,
      xxl: 1920,
      xxxl: 2560,
    },
  },
});
const theme = createMuiTheme({
  ...defaultTheme,
  typography: {
    h1: {
      fontSize: '2.25rem',
      fontWeight: '500',
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: '450',
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: '450',
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
    },
    h4: {
      fontSize: '1rem',
      fontWeight: '450',
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
    },
    h5: {
      fontSize: '.5rem',
      fontWeight: '100',
      marginTop: '0.1rem',
      marginBottom: '0.1rem',
    },
    button: {
      height: '2.75rem',
      textTransform: 'none',
      fontSize: '1rem',
    },
  },
  customTheme: {
    addIcon: {
      color: defaultTheme.palette.primary.background,
    },
    root: {
      backgroundColor: defaultTheme.palette.backgroundWave,
      position: 'static',
      paddingTop: '0.5rem',
      paddingBottom: '0.5rem',
    },
    mainTitle: {
      fontFamily: 'Lobster, cursive',
      color: '#fafafa',
      display: "none",
      textAlign: 'center',
      fontSize: '2rem',
      [defaultTheme.breakpoints.up('sm')]: {
        fontSize: '1.4rem',
        textAlign: 'end',
        lineHeight: '4rem',
        whiteSpace: 'nowrap',
        display: "block",
      },
      [defaultTheme.breakpoints.up('md')]: {
        fontSize: '2.5rem',
        textAlign: 'center',
        position: 'absolute',
        paddingTop: '1rem',
        width: '100%',
        top: "-.5rem",
        display: "block",
        zIndex: '-1',
      },
      textShadow: '2px 2px 7px #0d5711',
    },
    responsive: {
      display: 'block',
      [defaultTheme.breakpoints.up('sm')]: {
        display: 'flex',
      },
    },
    visuallyHidden: {
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: '1px',
      overflow: 'hidden',
      position: 'absolute',
      whiteSpace: 'nowrap',
      width: '1px',
    },
    content: {
      paddingTop: '24px',
      paddingBottom: '16px',
    },
    hidden: {
      display: 'none',
    },
    menuButton: {
      backgroundColor: defaultTheme.palette.primary.main,
      color: 'white',
      marginRight: defaultTheme.spacing(2),
      padding: '1rem',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: defaultTheme.transitions.create('transform', {
        duration: defaultTheme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    field: {
      width: '100%',
      margin: '1rem',
    },
    titleField: {
      color: 'red',
      margin: '1rem',
      // marginBottom: '.5rem',
      width: '100%',
    },
    fieldset: {
      margin: '1rem',
      padding: '2rem',
      minInlineSize: 'min-content',
      borderWidth: '1px',
      borderStyle: 'groove',
      borderRadius: '4px',
      display: 'flex',
    },
    adminRoot: {
      height: '90vh',
    },
    image: {
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        defaultTheme.palette.type === 'light'
          ? defaultTheme.palette.grey[50]
          : defaultTheme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    adminImage: {
      backgroundImage:
        'url(https://res.cloudinary.com/ezimg/image/upload/v1618246418/lifeseed/signin_xzwln8.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        defaultTheme.palette.type === 'light'
          ? defaultTheme.palette.grey[50]
          : defaultTheme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    adminPaper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      [defaultTheme.breakpoints.up('md')]: {
        position: 'relative',
        left: '-7rem',
        margin: defaultTheme.spacing(8, 4),
        backgroundColor: 'rgba(256,256,256,0.9)',
        borderRadius: '8px',
      },
    },
    adminAvatar: {
      margin: defaultTheme.spacing(1),
      // color: 'yellow',
      backgroundColor: defaultTheme.palette.secondary.main,
    },
    adminForm: {
      width: '100%', // Fix IE 11 issue.
      marginTop: defaultTheme.spacing(1),
    },
    adminSubmit: {
      margin: defaultTheme.spacing(3, 0, 2),
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    space: {
      backgroundImage: "url('../_next/image?url=%2Fstatic%2Fharmony.svg&w=128&q=75')",
      backgroundRepeat: "repeat",
      backgroundSize: "96px",
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
    contentSpace: {
      backgroundImage: "url('../_next/image?url=%2Fstatic%2Fharmony.svg&w=128&q=75')",
      backgroundRepeat: "repeat",
      backgroundSize: "96px",
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
    radialYellow: {
      backgroundImage: 'radial-gradient(yellow, yellow, lightyellow, #fafafa, #fafafa)',
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
    cardView: {
      margin: '1rem',
      width: 'fit-content',
      minWidth: '320px',
      maxWidth: '30rem',
      alignItems: 'top',
      justifyContent: 'center',
      gap: '2rem',
      '& img': {
        width: '100%',
        maxWidth: '30rem',
        objectFit: 'contain',
      },
    },
    cardHeader: {
      margin: '1rem',
      marginBottom: '.5rem',
      textAlign: 'center',
      color: '#272727',
    },
    growButton: {
      fontFamily: 'Lobster, cursive',
      color: '#fafafa',
      position: 'absolute',
      right: '7%',
      bottom: '10%',
      cursor: 'pointer',
      textAlign: 'center',
      fontSize: '3rem',
      textShadow: '2px 2px 7px #004943',
    },
    card: {
      maxWidth: 340,
      minWidth: 320,
      margin: '1.2rem',
    },
    singleCard: {
      maxWidth: 640,
      minWidth: 320,
      margin: '1.2rem',
      marginBottom: '12rem',
      [defaultTheme.breakpoints.up('md')]: {
        width: defaultTheme.breakpoints.values.md,
      },
      [defaultTheme.breakpoints.up('lg')]: {
        width: defaultTheme.breakpoints.values.xl,
      },
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: 'violet',
      border: '1px solid lightgrey',
    },
    presentList: {
      display: 'flex',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    lifeseed: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      justifyContent: 'space-between',
      [defaultTheme.breakpoints.up('md')]: {
        marginLeft: '1.7rem',
      },
      padding: '.7rem',
    },  
  },
});

export default theme;
