import React, { useState, useEffect } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import { Card, CardActions, CardContent, Button, Typography, TextField, Select, MenuItem } from '@material-ui/core';
import firebase from "../firebaseHandler";
// const storage = firebase.storage();

const AddCourse = (props) => {
    const { history } = props;
    const location = useLocation();
    const params = location.state;
    const [name, setName] = useState("");
    const [language, setLanguage] = useState("");
    const [year, setYear] = useState("2021");
    const [yearList, setYearList] = useState([]);
    const [courseCredits, setCourseCredits] = useState("0");
    const [instructorEmail, setInstructorEmail] = useState("");
    const [edit, setEdit] = useState(false);

    const handleAddMovie = () => {


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
                width: "80%",
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
                    <Typography variant="h5" component="h2">
                        Add a movie
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



                </CardContent>
                <Button variant="contained" color="primary" style={{ marginBottom: 20, marginTop: 20 }} onClick={handleAddMovie}>
                    Add Movie
                </Button>
            </Card>
        </div >

    );
}
export default withRouter(AddCourse);