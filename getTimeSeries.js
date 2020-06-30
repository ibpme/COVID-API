// const url = "https://api.covid19api.com/country/";

let borderColor = 'rgb(255, 99, 132)'
let chartType = 'bar'
let timeSeriesTemplate = {
    confirmed: {
        type: chartType,
        data: {
            labels: [],
            datasets: [{
                label: 'Confirmed Cases',
                backgroundColor: 'goldenrod',
                borderColor: borderColor,
                data: []
            }]
        },
        options:{}
    },
    recovered: {
        type: chartType,
        data: {
            labels: [],
            datasets: [{
                label: 'Recovered Cases',
                backgroundColor: 'forestgreen',
                borderColor: borderColor,
                data: []
            }]
        },
        options: {}
    },
    deaths: {
        type: chartType,
        data: {
            labels: [],
            datasets: [{
                label: 'Deaths',
                backgroundColor: 'crimson',
                borderColor: borderColor,
                data: []
            }]
        },
        options: {}
    },
};

let ctx1 = document.getElementById('chart1').getContext('2d');
let ctx2 = document.getElementById('chart2').getContext('2d');
let ctx3 = document.getElementById('chart3').getContext('2d');

function getTimeSeriesData(country){
    getTimeSeries = fetch('https://api.covid19api.com/country/'+country);
    getTimeSeries
    .then((response)=> response.json())
    .then((data)=>{
        for (var i=0; i<data.length;i++){
            if (data[i].Confirmed !== 0){
                timeSeriesTemplate.confirmed.data.datasets[0].data.push(data[i].Confirmed);
                timeSeriesTemplate.recovered.data.datasets[0].data.push(data[i].Recovered);
                timeSeriesTemplate.deaths.data.datasets[0].data.push(data[i].Deaths);
                timeSeriesTemplate.confirmed.data.labels.push(data[i].Date.split('T')[0])
                timeSeriesTemplate.recovered.data.labels.push(data[i].Date.split('T')[0])
                timeSeriesTemplate.deaths.data.labels.push(data[i].Date.split('T')[0])
            };
        };
        var confirmedChart = new Chart(ctx1, timeSeriesTemplate.confirmed);
        var recoveredChart = new Chart(ctx2, timeSeriesTemplate.recovered);
        var deathsChart = new Chart(ctx3, timeSeriesTemplate.deaths);
    })
    .catch(err=>{
        window.alert("Error Occured Unable to Fetch Data");
        console.error(err)
    });   
}

getTimeSeriesData('india')













