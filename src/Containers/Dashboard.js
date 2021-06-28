import React, { useEffect, useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Card, CardActions, CardContent, Button, Typography, Badge, TextField, InputAdornment } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import SearchIcon from '@material-ui/icons/Search';
import moment from "moment";
import { isMobile } from "react-device-detect";
import { getAllMovies, getPagedMovies } from "../api/movieLinks";
import firebase from "../firebaseHandler";

const PAGE_LIMIT = 5;

const Dashboard = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.media.movies);
  const [orgMovies, setOrgMovies] = useState([]);
  const [Movies, setMovies] = useState([]);
  const [onPage, setOnPage] = useState(1);

  const handleSearch = (e) => {
    let query = e.target.value;
    console.log("Search Movies Value", query);
    if (query != "") {
      query = query.toLowerCase();
      let result = Movies.filter(item => (
        item.name + item.courseCode + item.instructorName + item.instructorEmail
      ).toLowerCase().indexOf(query) > -1);
      console.log("Result is", result)
      setMovies(result);
    }
    else {
      setMovies(orgMovies);
    }

  };


  useEffect(() => {
    getPagedMovies(onPage, PAGE_LIMIT);
  }, []);


  return (
    <div style={{ width: isMobile ? "100%" : "80%", marginLeft: "auto", marginRight: "auto", marginTop: 20 }}>

      <div style={{}}>

        <Card className="dashboardTopBar"
          style={{
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 50,
            padding: 20,
            paddingBottom: 50,
            transition: "0.3s",
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
            "&:hover": {
              boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
            },
            borderRadius: 30
          }}>

          <Typography variant="h6" component="h4" style={{ marginBottom: 20 }}>
            Welcome
          </Typography>

          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row"
            }}>
            <TextField
              id="searchField"
              label="Search"
              placeholder="Search Course"
              variant="outlined"
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              style={{
                width: "80%",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: isMobile ? 20 : 0
              }}
            />
            <Button size="small" variant="contained" color="primary" onClick={() => console.log("Filter pressed")}>Filter</Button>

          </div>
        </Card>

        {Movies.map((course) =>
          <Card style={{
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
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
              <Badge badgeContent={course.courseCredits} color="primary" style={{ float: "right" }}>
                <MonetizationOnIcon />
              </Badge>
              <Typography color="textSecondary" gutterBottom>
                {course.courseCode}
              </Typography>
              <Typography variant="h5" component="h2">
                {course.name}
              </Typography>

              <Typography variant="h6" component="h4" color="textSecondary">
                Posted By
              </Typography>
              <Typography >
                {course.instructorName} - {course.instructorEmail}
              </Typography>

              <Typography >
                {moment(course.datePosted).fromNow()}
              </Typography>

            </CardContent>

            <CardActions>
              <Button size="small" onClick={() => history.push({
                pathname: "/dashboard/giveFeedback",
                state: { courseDetails: course }
              })}>Give Feedback</Button>
            </CardActions>


          </Card>
        )}
      </div>

    </div>

  );

}
export default withRouter(Dashboard);