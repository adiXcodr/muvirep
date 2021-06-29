import React, { useEffect, useState } from 'react';
import Home from './Containers/Home';
import classes from './App.module.css';
import { HashRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import store from "./redux/store";
import { setAuth, saveUserData } from "./redux/actions";
import axios from "axios";
import "video-react/dist/video-react.css";
import { colors, baseUrl } from "./constants";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.primary
    },
    secondary: {
      main: colors.secondary
    }
  }
});

const App = () => {

  const [loading, setLoading] = useState(true);

  const startServer = async () => {
    try {
      let response = await axios.get(baseUrl);
      if (response && response.status == 200) {
        setLoading(false);
      }
      else {
        alert("Could not start server");
      }
    }
    catch (err) {
      alert("Could not start server " + String(err));
    }
  };

  useEffect(() => {
    startServer();
  }, []);

  return (
    <HashRouter>
      <React.Fragment>
        <div className={classes.App}>
          <Provider store={store}>
            {loading ?
              <div class="loader"></div>
              :
              <MuiThemeProvider theme={theme}>
                <Home />
              </MuiThemeProvider>
            }
          </Provider>
        </div>
      </React.Fragment>
    </HashRouter>
  );

}

export default App;
