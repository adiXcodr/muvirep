import React, { useEffect, useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Card, CardActions, CardContent, Button, Typography, Badge, TextField, InputAdornment, Paper, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";
import SearchIcon from '@material-ui/icons/Search';
import { isMobile } from "react-device-detect";
import { getAllMovies, getPagedMovies } from "../api/movieLinks";
import MovieCard from '../Components/MovieCard';

const PAGE_LIMIT = 5;

const Dashboard = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.media.movies);
  const [orgMovies, setOrgMovies] = useState([]);
  const [tempMovies, setTempMovies] = useState([]);
  const [onPage, setOnPage] = useState(1);

  const handleSearch = (e) => {
    let query = e.target.value;
    console.log("Search Movies Value", query);
    if (query != "") {
      query = query.toLowerCase();
      let result = tempMovies.filter(item => (
        item.name
      ).toLowerCase().indexOf(query) > -1);
      console.log("Result is", result)
      setTempMovies(result);
    }
    else {
      setTempMovies(orgMovies);
    }

  };


  useEffect(() => {
    getPagedMovies(onPage, PAGE_LIMIT);
  }, []);

  useEffect(() => {
    if (movies && movies.length > 0) {
      let toSet = movies;
      setTempMovies(toSet);
      setOrgMovies(toSet);
    }
  }, [movies]);


  return (
    <div style={{ width: isMobile ? "95%" : "80%", marginLeft: "auto", marginRight: "auto", marginTop: 20 }}>

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
                width: isMobile ? "100%" : "80%",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: isMobile ? 20 : 0
              }}
            />
            <Button size="small" variant="contained" color="primary" onClick={() => console.log("Filter pressed")}>Filter</Button>

          </div>
        </Card>


        <Grid container spacing={2} justify="center" >
          <Grid item xs={12} >
            <Grid container justify="center" spacing={isMobile ? 0 : 5}>

              {tempMovies.map((movie) =>
                <Grid item xs={12} lg={3}>
                  <MovieCard movie={movie} />
                </Grid>
              )}

            </Grid>
          </Grid>

        </Grid>

      </div>

    </div>

  );

}
export default withRouter(Dashboard);