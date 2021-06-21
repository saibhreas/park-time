var parks,
  currentPIndex,
  phonenumber,
  email,
  activity,
  fees,
  lat,
  lon = "";

// todo: Global Variables
var MAPQ_API_KEY = "yQcB9Koy5KFxIcWM6GPCjCJ132aiYGhh";
var getParkBtnEl = $("#get-park-names");
var timeDispEl = $("#time-display");
var apiKey = "653094733b20fc02dc6f1e6e6b8bf37e";

// *! COMPLETED time display function
function displayTime() {
  var rightNow = moment().format("MMM DD, YYYY [at] hh:mm: a");
  timeDispEl.text(rightNow);
  var present = rightNow.substring(0, 6);
  console.log(present);
}

//*! LAT & LONGITUDE - Future enhancement
function mapQuestApiCall(x, y) {
  console.log(x, y);
  var mapUrl =
    "https://www.mapquestapi.com/staticmap/v5/map?key=" +
    MAPQ_API_KEY +
    "&center=" +
    x +
    "," +
    y +
    "&zoom=10&type=hyb&size=600,400@2x";
  console.log(mapUrl);
}

//*! Weather Information
function getFiveDayWeatherApi(lat, lon) {
  var fiveDayUrlApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current,alerts&units=imperial&appid=${apiKey}`;
  console.log("fivedayURL: ", fiveDayUrlApi);
  $.ajax({
    url: fiveDayUrlApi,
    success: function (response) {

      $('#list-of-weather-forecast').show();
      $('#list-of-weather-forecast').empty();

      for (let i = 0; i < 5; i++) {
        const elem = response.daily[i];
        var weather = elem.weather[0].description;
        var icon = elem.weather[0].icon;
        var temp = elem.temp.day;
        var uvi = elem.uvi;
        var iconImage = $("<img>").attr(
          "src",
          `http://openweathermap.org/img/wn/${icon}@2x.png`
        );
        $('#list-of-weather-forecast').append(`
          <div class="weather-day col my-5 mr-2 p-2">
           <span class="mb-1"><b>Weather:</b> ${weather}</span>
           <span class="mb-1"><b>Temperature:</b> ${temp}</span>
           <span class="mb-1"><b>UV Index:</b> ${uvi}</span>
           <img src="http://openweathermap.org/img/wn/${icon}@2x.png" />
          </div>
        `);
      }
    },
    error: function (xhr, status, error) {
      console.log("status: ", status);
      console.log("error: ", error);
    }
  });

}


function clickSubmit() {

  $('.park-info-item').hide();
  $('#park-info').hide();

  const currentPark = parks[currentPIndex];

  const contact = $('#contact').is(':checked');
  const activities = $('#activities').is(':checked');
  const fees = $('#fee').is(':checked');
  const weather = $('#weather').is(':checked');
  console.log(currentPark);

  $.post("/api/v1/park", {
    name: currentPark.fullName,
    park_id: currentPark.id,
    contact,
    activities,
    fees,
    weather
  })
    .then(data => {
      console.log('Park was saved', data);
      $('#park-info').show();
      // If weather checkbox is checked
      if (weather) {
        getFiveDayWeatherApi(currentPark.latitude, currentPark.longitude);
      }
      if (contact) {
        $('#contacts').show();
        $('#contacts').empty();
        $('#contacts').append(`<b>Contacts:</b> <br />`);
        $('#contacts').append(`
          <p>${currentPark.contacts.emailAddresses.map(e => e.emailAddress).join(', ')}</p>
          <p>${currentPark.contacts.phoneNumbers.map(e => e.phoneNumber).join(', ')}</p>
        `);
      }
      if (activities) {
        $('#activities-list').show();
        $('#activities-list').empty();
        $('#activities-list').append(`<b>Activities:</b> <br />`);
        $('#activities-list').append(`${currentPark.activities.map(e => `<p>${e.name}</p>`).join('')}`);
      }
      if (fees) {
        $('#fees').show();
        $('#fees').empty();
        $('#fees').append(`<b>Fees:</b> <br />`);
        $('#fees').append(`<p>${currentPark.fees.map(e => e.emailAddress).join(', ')}</p>`);
      }
    })
    .catch(err => {
      handleLoginErr(err.responseJSON)
    });
}

function showListOfParks() {
  // Hide all sections besides list of parks
  $('#park-info-requests').hide();
  $('#where2-go').hide();
  $('#park-info').hide();
  $('.park-info-item').hide();
  $('#list-of-parks').show();
  $('#list-of-parks').html('');

  $.get("/api/v1/park")
    .then(data => {
      for (const elem of data) {
        const checkedInfos = `${elem.activities ? 'Activites, ' : ''}${elem.fees ? 'Fees, ' : ''}${elem.contact ? 'Contact, ' : ''}${elem.weather ? 'Weather, ' : ''}`;
        $('#list-of-parks').append(`
          <div class="card col-md-8 py-1 mb-3">
            <h5 class="card-title">${elem.name}</h5>
            <p class="card-text">
              <span>Date: ${new Date(elem.createdAt).toLocaleString()}</span>
              <span class="ml-3">${checkedInfos}</span>
            </p>
          </div>
        `);
      }
    })
    .catch(err => {
      handleLoginErr(err.responseJSON)
    });
}

$("#hide-weather").click(function () {
  $("#current-weather-container").empty();
});

// Getting Answers from NPS Park API
function getAnswer(e, pIndex) {

  e.preventDefault();
  currentPIndex = pIndex;
  const currentPark = parks[pIndex];

  $('#where2-go').hide();
  $('#park-info-requests').show();
  $('#selected-park').text(currentPark.fullName);
}

// Fetching Data from NPS API
function npsApiCall(parkNJ) {
  var npsKey = "aKdQbl5YRDOdOcAzaiDfbacSBby5NQWEU8s5Mi5D";
  var npsUrl = `https://developer.nps.gov/api/v1/parks?stateCode=${parkNJ}&api_key=${npsKey}`;
  console.log("my park list: ", npsUrl);
  $.ajax({
    url: npsUrl,
    success: function (response) {
      parks = response.data;
      $("#myList").empty();
      for (let i = 0; i < response.data.length; i++) {
        var nameP = response.data[i].fullName;

        $("#myList").append(`<a class='dropdown-item' onclick='getAnswer(event, ${i.toString()})'>${nameP}</a>`);
      }

    },
    error: function (xhr, status, error) {
      console.log("status: ", status);
      console.log("error: ", error);
    },
    complete: function (xhr, status) {
      console.log("complete: ", status);
    },

  });

};

$(document).ready(function () {

  $('#park-info-requests').hide();
  $('#list-of-parks').hide();
  $('.park-info-item').hide();
  $('#park-info').hide();
  npsApiCall('NJ');


  $("#container1").show();
  $("#container2").show();
  $("#container3").hide();
  $("#container4").hide();
  $("#divInformation").hide();
  $("#myList").click(function () {
    $("#container1").hide("slow");
    $("#container2").hide("slow");
    $("#container3").show();
  });
  $("#hide-weather").click(function () {
    $("#container1").hide("slow");
    $("#container2").hide("slow");
    $("#container3").hide("slow");
    $("#container4").show();
  });
  $("#home").click(function () {
    $("#container1").show();
    $("#container2").show();
    $("#container3").hide("slow");
    $("#container4").hide("slow");
    $("#container5").hide("slow");
  });
  $("#getNewPark").click(function () {
    $("#container1").hide("slow");
    $("#container2").hide("slow");
    $("#container3").fadeIn();
    $("#container4").hide("slow");
    $("#container5").hide("slow");
  });
});

setInterval(displayTime, 1000);
