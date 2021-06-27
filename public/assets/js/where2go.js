var phonenumber,
  email,
  activity,
  fees,
  lat,
  lon = "";
console.log("ready");
// todo: Global Variables
var MAPQ_API_KEY = "yQcB9Koy5KFxIcWM6GPCjCJ132aiYGhh";
var getParkBtnEl = $("#get-park-names");
var timeDispEl = $("#time-display");
var appendDiv = document.querySelector('.appending-div');
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
      console.log("object extracted: ", response);
      console.log(response.daily[0].dt);
      //for (var i = 0; i < 6; i++) {
      // set to local storage
      var i = 0;
      var weather = response.daily[i].weather[0].description;
      var icon = response.daily[i].weather[0].icon;
      var temp = response.daily[i].temp.day;
      var uvi = response.daily[i].uvi;
      var iconImage = $("<img>").attr(
        "src",
        `http://openweathermap.org/img/wn/${icon}@2x.png`
      );
      console.log(`the daily temp is ${temp}`);
      $("div" + '[data-index="' + i + '"]').append(
        " weather: " + weather,
        iconImage,
        "<br>",
        " temp: " + temp,
        "<br>",
        " uv index: " + uvi
      );
      console.log(uvi);
      const storeObj = {
        weather: weather,
        icon: icon,
        temp: temp,
        uvi: uvi,
      };
      console.log("this is the storeobj variable:", storeObj);
      //*! Must store value entered by userinput to user storage
      localStorage.setItem('weather', JSON.stringify(storeObj));
    },
    error: function (xhr, status, error) {
      console.log("status: ", status);
      console.log("error: ", error);
    },
    complete: function (xhr, status) {
      console.log("complete: ", status);
    },
  });
}
// Calls all information needed for the User
function clickSubmit() {
  $("#park-info-requestsdivInformation").show();
  if ($("#admission").is(":checked")) {
    $("#spancontact").show();
    $("#spanphoneNumber").text(phonenumber);
    $("#spanEmail").text(email);
  } else {
    $("#spancontact").hide();
  }
  if ($("#activities").is(":checked")) {
    $("#spanActivity").text(activity);
  }
  if ($("#fees").is(":checked")) {
    $("#spanFees").text(fees);
  }
  if ($("#weather").is(":checked")) {
    getFiveDayWeatherApi(lat, lon);
  }

}
$("#hide-weather").click(function () {
  $("#current-weather-container").empty();
});
// Getting Answers from NPS Park API
function getAnswer(e, pIndex) {
  console.log('getAnswer e:', e)
  console.log('getAnswer pIndex or chosen park:', pIndex)
  e.preventDefault();
  var data = JSON.parse(sessionStorage.getItem(pIndex.toString()));
  var contactP = data.contacts;
  if (contactP != null && contactP.phoneNumbers.length > 0) {
    phonenumber = contactP.phoneNumbers[0].phoneNumber;
  }
  // Check if we want keep email info
  if (contactP != null && contactP.emailAddresses.length > 0) {
    email = contactP.emailAddresses[0].emailAddresses;
  };
  activity = data.activities[0].name;
  fees = data.entranceFees[0].cost;
  lat = data.latitude;
  lon = data.longitude;
  $("#spanphoneNumber").text("");
  $("#spanEmail").text("");
  $("#spanActivity").text("");
  $("#spanFees").text("");
  $("#divInformation").hide();
  console.log("lat:, Lon:", lat, lon);
  getFiveDayWeatherApi(lat, lon);
  console.log("redirect to apiLandingPage");
  location.href="/parkWeather.html";
};
// Fetching Data from NPS API
function npsApiCall(parkNJ) {
  var npsKey = "aKdQbl5YRDOdOcAzaiDfbacSBby5NQWEU8s5Mi5D";
  var npsUrl = `https://developer.nps.gov/api/v1/parks?stateCode=${parkNJ}&api_key=${npsKey}`;
  console.log("my park list: ", npsUrl);
  $.ajax({
    url: npsUrl,
    success: function (response) {
      console.log(response.data);
      $("#myList").empty();
      for (let i = 0; i < response.data.length; i++) {
        var nameP = response.data[i].fullName;
        var latP = response.data[i].latitude;
        var longP = response.data[i].longitude;
        sessionStorage.removeItem(i.toString());
        sessionStorage.setItem(i.toString(), JSON.stringify(response.data[i]));
        $("#myList").append(
          "<button class='dropdown-item' onclick='getAnswer(event," +
          i.toString() +
          ")'>" +
          nameP +
          "</button>"
        );
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
