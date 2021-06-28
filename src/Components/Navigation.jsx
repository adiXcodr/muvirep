import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Route, Link, Switch, withRouter } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Dashboard from "../Containers/Dashboard";
import AddMovie from "./AddMovie";
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import logo from "../Resources/Images/feedifyLogo.png";
import MovieFilterIcon from '@material-ui/icons/MovieFilter';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-prevent-tabpanel-${index}`}
            aria-labelledby={`scrollable-prevent-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-prevent-tab-${index}`,
        'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

function MiniDrawer(props) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);





    return (
        <div className={classes.root}>
            <CssBaseline />

            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                color="white"
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => window.location.reload()}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <Avatar alt={"FF"} src={logo} style={{ width: 40, height: 40 }} />
                    </IconButton>
                    <Typography variant="h6" noWrap style={{ fontWeight: "bold" }}>
                        Muvirep
                    </Typography>
                </Toolbar>

                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    scrollButtons="off"
                    aria-label="scrollable prevent tabs example"
                >
                    <Tab icon={<MovieFilterIcon />} label="Movies" {...a11yProps(0)} />
                    <Tab icon={<QueuePlayNextIcon />} label="Create" {...a11yProps(1)} />
                </Tabs>
            </AppBar>




            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
                style={{ marginTop: 150, backgroundColor: "#fafafa" }}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Dashboard />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <AddMovie />
                </TabPanel>
            </SwipeableViews>
        </div >
    );
}


export default withRouter(MiniDrawer);