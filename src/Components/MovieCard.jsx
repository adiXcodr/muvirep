import React, { useState, useEffect } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import { Card, CardActions, CardContent, Button, Chip, Backdrop, Fade, Modal } from '@material-ui/core';
import { isMobile } from 'react-device-detect';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import VideoComponent from './VideoComponent';

const MovieCard = (props) => {
    const { movie } = props;
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {

    }, []);

    return (
        <div>
            <Card style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 30,
                marginBottom: 50,
                transition: "0.3s",
                boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                "&:hover": {
                    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
                },
                borderRadius: 30,
                padding: 0
            }} >

                <CardContent style={{ padding: 0 }}>

                    <img
                        style={{
                            maxWidth: "100%",
                            height: "auto"
                        }}
                        src={movie.thumbnail}
                    ></img>
                </CardContent>
                <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <p style={{ textAlign: "left" }}>{movie.name}</p>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: "row",
                            marginTop: -5
                        }}
                    >
                        <Chip
                            size="medium"
                            label={movie.language}
                            clickable
                            color="primary"
                            style={{ color: "white", marginLeft: 3, marginRight: 3 }}
                        />
                        <Chip
                            size="medium"
                            label={movie.year}
                            clickable
                            color="primary"
                            style={{ color: "white", marginLeft: 3, marginRight: 3 }}
                        />
                    </div>

                </CardContent>
                <Button startIcon={<PlayArrowIcon style={{ color: "gray" }} />} style={{ marginBottom: 20, marginTop: 20, color: "gray" }} onClick={handleOpen}>
                    Watch
                </Button>
            </Card>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Fade in={open}>
                    <VideoComponent movie={movie} />
                </Fade>
            </Modal>
        </div >

    );
}
export default withRouter(MovieCard);