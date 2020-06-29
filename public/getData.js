const url = "https://covid19.mathdro.id/api";
let getCountry;
let countryInput;
const searchButton = document.forms;


function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function getCountryData(country) {
    if (country !== 'Worldwide'){
        getCountry = fetch(url + `/countries/${country}`);
    }
    else{
        getCountry = fetch(url)
    }
    getCountry
    .then((response)=> response.json())
    .then((data)=>{
      document.getElementById("confirmed-value").innerHTML = formatNumber(data.confirmed.value);
      document.getElementById("deaths-value").innerHTML = formatNumber(data.deaths.value);
      document.getElementById("recovered-value").innerHTML = formatNumber(data.recovered.value);
      document.getElementById("county-name").innerHTML = country;
    })
    .catch(err=>{
        window.alert("Error Occured Unable to Fetch Data");
        console.error(err)
    });
}


getCountryData("Worldwide");

function submitFunction(event){
  event.preventDefault();
  countryInput = document.getElementById("country-field").value
  getCountryData(countryInput)
  return false;
}







