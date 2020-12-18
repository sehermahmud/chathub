import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import {
  Divider,
  IconButton,
  SwipeableDrawer,
  Button,
  useMediaQuery,
  Grid,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';

const drawerWidth = 275;

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: '2em',
    color: '#f06292',
    fontFamily: 'Merienda One',
    [theme.breakpoints.down('md')]: {
      fontSize: '2em',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '2em',
    },
  },

  link: {
    fontFamily: 'Handlee',
    textTransform: 'none',
    fontSize: '1.2em',
    fontWeight: 600,
    background: '#FFCCE6',
    borderRadius: 0,
    '&:hover': {
      background: '#FFCCE6',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.2em',
    },
  },
  appbar: {
    background: '#40c4ff',
    height: '4em',
    [theme.breakpoints.down('md')]: {
      height: '4em',
    },
    [theme.breakpoints.down('sm')]: {
      height: '4em',
    },
    [theme.breakpoints.down('xs')]: {
      height: '3.7em',
    },
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  drawerIcon: {
    height: '40px',
    width: '40px',
    color: 'white',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  toolbar: theme.mixins.toolbar,
}));

export default function ElevateAppBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const [open, setOpen] = React.useState(false);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  /* ------ Header ------ */
  const headerLinks = [
    { label: 'Home', href: '/' },
    { label: 'Chating-room', href: '/chat' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <Button
          key={href}
          style={{ color: 'white', textTransform: 'none', fontSize: '1.3em' }}
        >
          <a
            href={href}
            style={{
              textDecoration: 'none',
              textTransform: 'none',
              color: 'white',
              fontFamily: 'Handlee',
              fontWeight: 'bold',
              fontSize: '1.4rem',
            }}
          >
            {label}
          </a>
        </Button>
      );
    });

  const header = (
    <Grid container direction="row" justify="flex-end">
      {headerLinks}
    </Grid>
  );

  /* ------ Drawer ------ */
  const drawerLinks = [
    {
      label: 'Home',
      href: '/',
      icon: <HomeIcon style={{ color: '#651fff' }} />,
    },
    {
      label: 'Chating-room',
      href: '/chat',
      icon: <ChatIcon style={{ color: '#651fff' }} />,
    },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href, icon }) => {
      return (
        <a
          href={href}
          underline="none"
          className="padding: 0"
          style={{
            color: '#e91e63',
            textDecoration: 'none',
          }}
        >
          <ListItem
            key={href}
            button
            color="inherit"
            className={classes.link}
            style={{ background: 'none', color: '#e91e63' }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{label}</ListItemText>
          </ListItem>
        </a>
      );
    });

  const drawer = (
    <SwipeableDrawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      anchor="left"
      open={open}
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.toolbarMargin} />
      <div className={classes.drawerHeader}>
        <a
          href="/"
          style={{
            color: '#ec407a',
            textDecoration: 'none',
            fontFamily: 'Merienda One',
          }}
        >
          {' '}
          <Typography
            style={{ fontFamily: 'Merienda One', color: '#651fff' }}
            variant="h4"
          >
            Chathub
          </Typography>
        </a>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>{drawerLinks}</List>
    </SwipeableDrawer>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar elevation={3} className={classes.appbar}>
          <Toolbar style={{ height: 0 }}>
            <IconButton onClick={() => setOpen(!open)} disableRipple>
              <MenuIcon className={classes.drawerIcon} />
            </IconButton>
            <div></div>

            <a
              href="/"
              style={{
                color: '#ec407a',
                textDecoration: 'none',
                fontFamily: 'Merienda One',
              }}
            >
              {' '}
              <Typography
                variant="h4"
                style={{ fontFamily: 'Merienda One', color: '#651fff' }}
              >
                ChathubSquad
              </Typography>
            </a>
            {matches ? <div></div> : header}
            {drawer}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
