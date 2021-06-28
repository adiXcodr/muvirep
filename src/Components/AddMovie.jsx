import React, { useState, useEffect } from 'react';
import { useLocation, withRouter } from 'react-router-dom';
import { Card, CardActions, CardContent, Button, Typography, TextField } from '@material-ui/core';
import firebase from "../firebaseHandler";
const db = firebase.firestore();

const AddCourse = (props) => {
    const { history } = props;
    const location = useLocation();
    const params = location.state;
    const [name, setName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [instructorName, setInstructorName] = useState("");
    const [courseCredits, setCourseCredits] = useState("0");
    const [instructorEmail, setInstructorEmail] = useState("");
    const [edit, setEdit] = useState(false);

    const handleAddCourse = () => {


    };


    useEffect(() => {

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
                        Add Course Details
                    </Typography>

                    <TextField
                        id="courseName"
                        label="Course Name"
                        placeholder="Enter the course name"
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            width: "100%",
                            marginTop: 20
                        }}
                        value={name}
                    />
                    {!edit &&
                        <TextField
                            id="courseCode"
                            label="Course Code"
                            placeholder="Enter the course code"
                            variant="outlined"
                            onChange={(e) => setCourseCode(e.target.value)}
                            style={{
                                width: "100%",
                                marginTop: 20
                            }}
                            value={courseCode}
                        />
                    }


                    <TextField
                        id="courseCredits"
                        label="Course Credits"
                        placeholder="Enter the number of credits"
                        variant="outlined"
                        onChange={(e) => setCourseCredits(e.target.value)}
                        style={{
                            width: "100%",
                            marginTop: 20
                        }}
                        value={courseCredits}
                    />


                </CardContent>
                <Button variant="contained" color="primary" style={{ marginBottom: 20, marginTop: 20 }} onClick={handleAddCourse}>
                    {edit ? "Edit" : "Add"} Course
                </Button>
            </Card>
        </div >

    );
}
export default withRouter(AddCourse);