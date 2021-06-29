import React, { useState, useEffect } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import { Card, CardActions, CardContent, Button, Typography, TextField, Select, MenuItem, Modal } from '@material-ui/core';
import firebase from "../firebaseHandler";
import { isMobile } from 'react-device-detect';
import { createMovie } from "../api/movieLinks";
const images = firebase.storage().ref("images");
const videos = firebase.storage().ref("videos");

const AddCourse = (props) => {
    const [name, setName] = useState("");
    const [language, setLanguage] = useState("");
    const [year, setYear] = useState("2021");
    const [yearList, setYearList] = useState([]);
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [progress, setProgress] = useState(0);

    const validated = () => {
        if (!name || name == "") {
            alert("Name should not be empty");
            return false;
        }
        else if (!language || language == "") {
            alert("Language should not be empty");
            return false;
        }
        else if (!year || year == "") {
            alert("Year should not be empty");
            return false;
        }
        else if (!image) {
            alert("Empty Thumbnail");
            return false;
        }
        // else if (!video) {
        //     alert("Empty Video");
        //     return false;
        // }
        else {
            return true;
        }
    };

    const upload = async (file, type) => {
        return new Promise(function (resolve, reject) {
            let uploadTask = null;
            if (type == "image") {
                uploadTask = images.child(file.name).put(file);
            }
            else {
                uploadTask = videos.child(file.name).put(file);
            }
            uploadTask.on('state_changed',
                function (snapshot) {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log('Upload is ' + progress + '% done')
                    setProgress(progress);
                },
                function error(err) {
                    console.log('error', err)
                    setProgress(0);
                    reject()
                },
                function complete() {
                    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        setProgress(0);
                        resolve(downloadURL)
                    })
                }
            )
        })
    }

    const handleAddMovie = async () => {
        if (validated()) {
            let thumbnail = await upload(image, "image");
            let videoUrl = await upload(video, "video");
            if (thumbnail && videoUrl) {
                await createMovie({
                    name,
                    language,
                    year,
                    thumbnail,
                    movie: videoUrl
                });
            }
            else {
                alert("Thumbnail or Video Error");
            }
        }
    };

    const onImageChange = (e) => {
        const reader = new FileReader();
        let file = e.target.files[0]; // get the supplied file
        // if there is a file, set image to that file
        if (file) {
            reader.onload = () => {
                if (reader.readyState === 2) {
                    console.log(file);
                    setImage(file);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
            // if there is no file, set image back to null
        } else {
            setImage(null);
        }
    };

    const onVideoChange = (e) => {
        const reader = new FileReader();
        let file = e.target.files[0]; // get the supplied file
        // if there is a file, set image to that file
        if (file) {
            reader.onload = () => {
                if (reader.readyState === 2) {
                    console.log(file);
                    setVideo(file);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
            // if there is no file, set image back to null
        } else {
            setVideo(null);
        }
    };

    const handleYearList = () => {
        let currentYear = new Date().getFullYear(), years = [];
        let startYear = 1895;
        while (startYear <= currentYear) {
            years.push(String(startYear++));
        }
        setYearList(years);
    };


    useEffect(() => {
        handleYearList();
    }, []);

    return (
        <div>
            <Card style={{
                width: isMobile ? "95%" : "80%",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 30,
                padding: 20,
                marginBottom: 50,
                transition: "0.3s",
                boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                "&:hover": {
                    boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
                },
                borderRadius: 30,
                padding: 20,
                paddingTop: 30
            }} >

                <CardContent>
                    <Typography variant="h5" component="h2" style={{ fontWeight: "bold" }}>
                        Uploader
                    </Typography>

                    <TextField
                        id="name"
                        label="Name"
                        placeholder="Enter the movie name"
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            width: "100%",
                            marginTop: 20
                        }}
                        value={name}
                    />
                    <TextField
                        id="language"
                        label="Language"
                        placeholder="Enter the movie language"
                        variant="outlined"
                        onChange={(e) => setLanguage(e.target.value)}
                        style={{
                            width: "100%",
                            marginTop: 20
                        }}
                        value={language}
                    />

                    <Select
                        labelId="year-select-label"
                        id="year-select"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        variant="outlined"
                        style={{ width: "100%", marginBottom: 30, textAlign: "left", marginTop: 20 }}
                    >
                        {yearList.map((val) => <MenuItem value={val}>{val}</MenuItem>)}
                    </Select>

                    <div style={{
                        borderWidth: 1,
                        borderColor: "black",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center"
                    }}>
                        <input
                            accept="image/x-png,image/jpeg,image/jpg"
                            // className={classes.input}
                            style={{ display: 'none' }}
                            id="raised-button-file-image"
                            type="file"
                            onChange={onImageChange}
                        />
                        <label htmlFor="raised-button-file-image">
                            <Button variant="raised" component="span">
                                {image ? image.name.slice(0, 5) + image.name.slice(image.name.length - 4) : "Thumbnail"}
                            </Button>
                        </label>

                        <input
                            accept="video/mp4,video/x-m4v,video/*"
                            // className={classes.input}
                            style={{ display: 'none' }}
                            id="raised-button-file-video"
                            type="file"
                            onChange={onVideoChange}
                        />
                        <label htmlFor="raised-button-file-video">
                            <Button variant="raised" component="span">
                                {video ? video.name.slice(0, 5) + video.name.slice(video.name.length - 4) : "Video"}
                            </Button>
                        </label>
                    </div>




                </CardContent>
                <Button variant="contained" color="primary" style={{ marginBottom: 20, marginTop: 20, color: "white" }} onClick={handleAddMovie}>
                    Add Movie
                </Button>
            </Card>
        </div >

    );
}
export default withRouter(AddCourse);