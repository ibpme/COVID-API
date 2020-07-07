import {
  getTimeSeriesData,
  timeSeriesTemplate,
} from "./script/getTimeSeries.js";
import getCountryData from "./script/getData.js";

let ctx1 = document.getElementById("chart1").getContext("2d");
let ctx2 = document.getElementById("chart2").getContext("2d");
let ctx3 = document.getElementById("chart3").getContext("2d");

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

let params = new URL(document.location).searchParams;
let country = params.get("country");
if (country == null) {
  getCountryData(country);
  document.getElementById("country-name").innerHTML = "Worldwide";
} else {
  document.getElementById("country-name").innerHTML = capitalize(country);
  let countryInput = country.toLowerCase();
  getCountryData(countryInput);
  getTimeSeriesData(countryInput)
    .then(() => {
      new Chart(ctx1, timeSeriesTemplate.confirmed);
      new Chart(ctx2, timeSeriesTemplate.recovered);
      new Chart(ctx3, timeSeriesTemplate.deaths);
    })
    .catch((err) => {
      console.log(err);
      window.alert("Cant Display Charts");
    });
}
