window.addEventListener('load',()=>
    {
        let long;
        let lat;
        let temperatureDescription = document.querySelector(".temperature-description");
        let temperatureDegree = document.querySelector('.temperature-degree');
        let locationTimeZone = document.querySelector(".location-timezone");
        let temperatureSection = document.querySelector(".temperature");
        const temperatureSpan = document.querySelector(".temperature");

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                long = position.coords.longitude;
                lat = position.coords.longitude;


                const proxy = 'https://cors-anywhere.herokuapp.com/';


                const api = `${proxy}https://api.darksky.net/forecast/fdd89b4b7942c3f8f2fe6840e7019585/59.334591,18.063240`;

                fetch(api)
                    .then(response => {
                        return response.json();

                    })
                    .then(data => {
                        console.log(data);


                        locationTimeZone.textContent = data.timezone;
                        const {temperature, icon} = data.currently;
                        temperatureDegree.textContent = temperature;
                        let celcius = (temperatureDegree - 32) * (5/9);

                        const {summary} = data.hourly;
                        temperatureDescription.textContent = summary;



                        setIcon(icon, document.querySelector(".icon"));

                        temperatureSection.addEventListener('click',()=>
                        {
                            if(temperatureSpan.textContent === "F"){
                                temperatureSpan.textContent = "C";
                                temperatureDegree.textContent = celcius;
                            }else{
                                temperatureSpan.textContent = "F";
                            }
                        });

                    })

                function setIcon(icon, iconID) {

                    var skycons = new Skycons({color: "white"});
                    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
                    skycons.play();
                    return skycons.set(iconID,Skycons[currentIcon]);
                }

               /* const axios = require('axios');
                const params = {
                    access_key: '494f862794e5e4c8cc2e4e8f4f700b6f',
                    query: position.toString()
                }

                axios.get('https://api.weatherstack.com/current', {params})
                    .then(response => {
                        const apiResponse = response.data;
                        console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
                    }).catch(error => {
                    console.log(error);
                });*/


            });
     }
     });
