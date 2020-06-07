import React from "react";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";

import coronaImage from "./images/covid-logo.png";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Comfortaa",
    fontSize: 14,
  },
});

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData, country: country });

    //set the state
  };

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <ThemeProvider theme={theme}>
          <img className={styles.logo} src={coronaImage} alt="COVID-19 Logo" />
          <Cards data={data} />
          <CountryPicker handleCountryChange={this.handleCountryChange} />
          <Chart data={data} country={country} />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
