let inputCity = document.querySelector('#city-input');
let inputCityForm = document.querySelector('.input-city');
let submitBtn = document.querySelector('#submit-btn');
let weatherImg = document.querySelector('#weather-img');
let humidityPercentText = document.querySelector('#humidity-percent');
let windSpeedText = document.querySelector('#wind-speed');
let tempText = document.querySelector('#temp');
let cityText = document.querySelector('#city-name');
console.log(inputCity.value);
const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e07b951bdcmshd908cd3cc21ca39p17f168jsn568348ff7d4f',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};

inputCityForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    let cityName = inputCity.value.toLowerCase();
    getWeather(cityName);
    event.target.reset();
    
})

let getWeather = async (cityName)=>{
    try {
        let newUrl = url+cityName
        const response = await fetch(newUrl, options);
        if(response.status==400){
            alert("Enter a valid city name.");
        }else{
            const result = await response.json();
            console.log(result);
            displayWeather(result,cityName);
        }
        
    } catch (error) {
        console.error(error);
    }
};

const displayWeather = (result,cityName)=>{
    cityText.innerText = cityName.toUpperCase();
    tempText.innerText = `${result["temp"]}\u00B0 c`;
    windSpeedText.innerText = `${result["wind_speed"]} KM/H`;
    humidityPercentText.innerText = `${result["humidity"]} %`;
    if(result["cloud_pct"]>=75 && result["humidity"]>=60){
        weatherImg.src="./images/drizzle.png";
    }else if(result["cloud_pct"]>65){
        weatherImg.src="./images/clouds.png";
    }else if(result["cloud_pct"]>40 && result["humidity"]>50){
        weatherImg.src="./images/mist.png"
    }else{
        weatherImg.src="./images/clear.png";
    }
}
