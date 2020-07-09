let timeSeriesTemplate = {
  borderColor: "rgb(255, 99, 132)",
  chartType: "bar",
  confirmed: {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "Confirmed Cases",
          backgroundColor: "goldenrod",
          borderColor: "rgb(255, 99, 132)",
          data: [],
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Confirmed Total",
        fontSize: 24,
      },
      layout: {
        padding: {
          left: 50,
          right: 50,
          top: 50,
          bottom: 50,
        },
      },
    },
  },
  recovered: {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "Recovered Cases",
          backgroundColor: "forestgreen",
          borderColor: "rgb(255, 99, 132)",
          data: [],
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Recovered Total",
        fontSize: 24,
      },
      layout: {
        padding: {
          left: 50,
          right: 50,
          top: 50,
          bottom: 50,
        },
      },
    },
  },
  deaths: {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "Deaths",
          backgroundColor: "crimson",
          borderColor: "rgb(255, 99, 132)",
          data: [],
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Deaths Total",
        fontSize: 24,
      },
      layout: {
        padding: {
          left: 50,
          right: 50,
          top: 50,
          bottom: 50,
        },
      },
    },
  },
};

function getTimeSeriesData(country) {
  return new Promise(function (resolve, reject) {
    let getTimeSeries;
    getTimeSeries = fetch("https://api.covid19api.com/country/" + country);
    getTimeSeries
      .then((response) => response.json())
      .then((data) => {
        for (var i = 0; i < data.length; i++) {
          if (data[i].Confirmed !== 0) {
            timeSeriesTemplate.confirmed.data.datasets[0].data.push(
              data[i].Confirmed
            );
            timeSeriesTemplate.recovered.data.datasets[0].data.push(
              data[i].Recovered
            );
            timeSeriesTemplate.deaths.data.datasets[0].data.push(
              data[i].Deaths
            );
            timeSeriesTemplate.confirmed.data.labels.push(
              data[i].Date.split("T")[0]
            );
            timeSeriesTemplate.recovered.data.labels.push(
              data[i].Date.split("T")[0]
            );
            timeSeriesTemplate.deaths.data.labels.push(
              data[i].Date.split("T")[0]
            );
            resolve();
          }
        }
      })
      .catch((err) => {
        window.alert("Error Occured Unable to Fetch Charts Data");
        console.error(err);
        reject();
      });
  });
}

export { getTimeSeriesData, timeSeriesTemplate };
