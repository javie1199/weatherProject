// Personal API Key for OpenWeatherMap API -- insert APP ID before using
let apiKey = "3db69fc1dc5bd060dc696500d051caef";
let apiUrl = `http://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;

let zip = document.getElementById("zip");
let feelings = document.getElementById("feelings");

let d = new Date();
let date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

//Add event listener to button
document.querySelector("#generate").addEventListener("click", handleClick);

/* Function called by event listener */
function handleClick() {
  // first get the zip and decide if its a city name or a zip.
  let inputValue = document.querySelector("#zip").value;

  let searchParams = "";
  if (isNaN(inputValue)) {
    // do the logic for a name

    searchParams = `&q=${inputValue}`;
    // apiUrl = apiUrl + searchParams;
  } else {
    // do the logic for a zip
    searchParams = `&zip=${inputValue}`;
    //  apiUrl = apiUrl + searchParams;
  }

  let searchUrl = apiUrl + searchParams;
  getWeather(searchUrl)
    .then((weatherData) => {
      save("/create", {
        temp: weatherData.main.temp,
        name: weatherData.name,
        general: weatherData.weather[0].main,
        icon: weatherData.weather[0].icon,
        windspeed: weatherData.wind.speed,
        feelings: document.querySelector("#feelings").value,
        date: date,
      });
    })
    .then(() => getData("/all"));
}

// QueryWeather Service
async function getWeather(searchUrl) {
  const res = await fetch(searchUrl);
  const weatherData = await res.json();
  return weatherData;
}

// save function,
const save = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  // const saveResult = await res.json();
};

/* Function to GET Project Data */
const getData = async (url) => {
  const request = await fetch(url);
  try {
    let allData = await request.json();

    console.log(allData[0].date);
    //Update the UI
    // as we are getting the cards all over again, we can clear the display off first
    document.querySelector(".cards").innerHTML = "";
    for (let i = 0; i < allData.length; i++) {
      console.log(allData[i]);
      let card = document.createElement("div");
      card.classList.add("card");
      // add the image ; this format : http://openweathermap.org/img/w/10d.png
      // image code is accessible using : data.weather[0].icon
      let image = document.createElement("img");
      image.src = `http://openweathermap.org/img/wn/${allData[i].icon}@2x.png`;
      //image.src = "http://openweathermap.org/img/w/04d.png";
      // add the image to the div
      card.appendChild(image);

      // just a test for text
      let text = document.createElement("div");
      text.innerHTML = ` <div class="place">${allData[i].name} </div>The weather is mainly : <span class="data">${allData[i].general} </span><br> The temp is <span class="data">${allData[i].temp}°c </span><br> The wind speed is <span class="data">${allData[i].windspeed}mph </span><br> Today, on <span class="data">${allData[i].date} </span> I felt <span class="data">${allData[i].feelings} </span>`;
      card.appendChild(text);
      // get parent and append it
      let gridCard = document.querySelector(".cards");
      gridCard.appendChild(card);
    }
  } catch (error) {
    console.log(error);
  }
};
