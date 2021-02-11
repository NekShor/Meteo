const baseUrl = "http://172.20.10.2/";
var temp = [];
var hum = [];
var dateA = [];

function dateConverter(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

function GetInfosFromAPI(numberOfRecords) {
    temp = [];
    hum = [];
    dateA = [];
    $.ajax({
        method: 'POST',
        url: baseUrl + "GetInfos",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: 'json',
        data: { nombre: numberOfRecords },
        success: function (data) {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    temp.push(data[i]["DATA_TEMPERATURE"]);
                    hum.push(data[i]["DATA_HUMIDITE"]);
                    dateA.push(new Date(data[i]["DATA_DATE"]));
                };
                LoadChart(dateA, temp, hum);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    })
}

function lastInfo(numberOfRecords) {
    $.ajax({
        method: 'POST',
        url: baseUrl + "GetInfos",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: 'json',
        data: { nombre: numberOfRecords },
        success: function (data) {
            var t = document.getElementById('last-rec-temp');
            var h = document.getElementById('last-rec-hum');
            var dt = document.getElementById('last-rec-time-temp');
            var dh = document.getElementById('last-rec-time-hum');

            t.innerHTML = `${data[0]["DATA_TEMPERATURE"]} °C`;
            h.innerHTML = `${data[0]["DATA_HUMIDITE"]} %`;
            dt.innerHTML = dateConverter(new Date(data[0]["DATA_DATE"]));
            dh.innerHTML = dateConverter(new Date(data[0]["DATA_DATE"]));
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    })
}

function LoadChart(dateA, temp, hum) {
    Highcharts.chart('container', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Weekly Average Temperature'
        },
        subtitle: {
            text: 'Source: notre super sonde'
        },
        xAxis: {
            categories: dateA,
            reversed: true,
            type: 'datetime',
            labels: {
                formatter: function () {
                    return Highcharts.dateFormat('%H:%M:%S',
                        this.value);
                }
            }
        },
        yAxis:
        {
            title:
            {
                text: 'Temperature (°C)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true

            },
            series: {
                animation: false
            }
        },
        series: [{
            name: 'sonde 1',
            data: temp
        }]
    });
    Highcharts.chart('container2', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Weekly Average Humidity'
        },
        subtitle: {
            text: 'Source: notre super sonde'
        },
        xAxis: {
            categories: dateA,
            reversed: true,
            type: 'datetime',
            labels: {
                formatter: function () {
                    return Highcharts.dateFormat('%H:%M:%S',
                        this.value);
                }
            }
        },
        yAxis:
        {
            title:
            {
                text: 'Humidité (%)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true
            },
            series: {
                animation: false
            }
        },
        series: [{
            name: 'sonde 1',
            data: hum
        }]
    });
}

// window.onload = setupRefresh;

// function setupRefresh() {
//   setInterval("refreshFrame();", 1000);
// }
// function refreshFrame() {
//   var loc = document.getElementById('temperature');
//   loc.reload();
// }

function updateDiv() {
    $("#temperature").load(window.location.href + " #temperature");
}

setInterval(() => {
    GetInfosFromAPI(20);
    lastInfo(1);
}, 3000);