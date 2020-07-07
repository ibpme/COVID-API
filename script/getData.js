function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function getCountryData(country) {
  let getCountry;
  if (country !== null) {
    getCountry = fetch(
      "https://covid19.mathdro.id/api" + `/countries/${country}`
    );
  } else {
    getCountry = fetch("https://covid19.mathdro.id/api");
  }
  getCountry
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("confirmed-value").innerHTML = formatNumber(
        data.confirmed.value
      );
      document.getElementById("deaths-value").innerHTML = formatNumber(
        data.deaths.value
      );
      document.getElementById("recovered-value").innerHTML = formatNumber(
        data.recovered.value
      );
      return data;
    })
    .catch((err) => {
      window.alert("Error Occured Unable to Fetch Data");
      console.error(err);
    });
}

export default getCountryData;
