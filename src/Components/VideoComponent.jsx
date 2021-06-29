import React, { useState, useEffect } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import { Card, CardActions, CardContent, Button, Chip, Backdrop, Fade, Modal } from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import {
    Player,
    ControlBar,
    ReplayControl,
    ForwardControl,
    CurrentTimeDisplay,
    TimeDivider,
    PlaybackRateMenuButton,
    VolumeMenuButton
} from 'video-react';

const VideoComponent = (props) => {
    const { movie } = props;

    useEffect(() => {

    }, []);

    return (
        <div style={{
            padding: 10,
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            border: '2px solid #000',
            boxShadow: 5,
            width: isMobile ? "90%" : "70%",
            height: isMobile ? "60%" : "90%"
        }}>
            <Player
                poster={movie.thumbnail}
                fluid={false}
                width={"100%"}
                height={"100%"}
                autoPlay={true}
            >
                <source src={movie.movie} />
                <ControlBar>
                    <ReplayControl seconds={10} order={1.1} />
                    <ForwardControl seconds={30} order={1.2} />
                    <CurrentTimeDisplay order={4.1} />
                    <TimeDivider order={4.2} />
                    <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
                    <VolumeMenuButton disabled />
                </ControlBar>
            </Player>
        </div >

    );
}
export default withRouter(VideoComponent);