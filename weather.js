
var search_button = document.getElementById("search");

search_button.addEventListener("click", search_function);

function search_function(){
    var city = document.getElementById("city").value;
    fetch("http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=a1fa6d245b03b290a8f678bb5b15a5bd")
    .then(response => response.json())
    .then(data => handle_city_data(data))

}


function handle_city_data(data){
    //clear div with each search
    document.getElementById("info").innerHTML = "";
    var info_div = document.getElementById("info");
    
    var city_name = document.createElement("P");
    city_name.innerHTML = "City: "+data.name;                
    info_div.appendChild(city_name);

    var country_name = document.createElement("P");
    country_name.innerHTML = "Country: "+data.sys.country; 
    info_div.appendChild(country_name);

    var current_weather = document.createElement("P");
    current_weather.innerHTML = "Current Weather: "+ data.weather[0].description; 
    info_div.appendChild(current_weather);

    fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+data.coord.lat+"&lon="+data.coord.lon+"&units=metric&appid=a1fa6d245b03b290a8f678bb5b15a5bd")
    .then(response => response.json())
    .then(data => handle_daily_data(data))
}



    
function handle_daily_data(data){
    var daily_data = data.daily
    console.log(daily_data)

    var weather_table = document.createElement("table")
    var table_th = document.createElement("tr");
    table_th.innerHTML = "<th>Day</th><th>Max</th><th>Min</th><th>Weather</th>";                
    weather_table.appendChild(table_th);

    for (i=0; i< daily_data.length; i++ ){
        var row_data = document.createElement("tr")
        row_data.innerHTML = "<td>"+i+"</td><td>"+daily_data[i].temp.max+"</td><td>"+daily_data[i].temp.min+"</td><td><img src='http://openweathermap.org/img/wn/"+daily_data[i].weather[0].icon+"@2x.png'></td>"; 
        weather_table.appendChild(row_data);
    }

    var info_div = document.getElementById("info")
    info_div.appendChild(weather_table);
}

