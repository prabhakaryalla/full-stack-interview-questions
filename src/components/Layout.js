import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Drawer, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from './Sidebar';
import InterviewQuestions from './InterviewQuestions';
import navigations from '../navigations.json';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Scroll from './Scroll';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: 120,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 120,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function Layout() {
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Full-Stack Interview Questions (.Net + React + SQL + Azure)
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />
                    <Sidebar items={navigations} />
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Scroll showBelow={290} />
                    <Routes>
                        <Route path="/full-stack-interview-questions" element={<InterviewQuestions />} />
                        <Route path="/full-stack-interview-questions/:rootpath/:filename" element={<InterviewQuestions />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default Layout;
