$(document).ready(function(){
  var longitude;
  var latitude;
  var temp;
  
  function getInfo() {
    var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;
    //console.log(url);
    $.getJSON(url, function(data){
      var city = data.name;
      /* var icon = data.weather[0].icon; */
      var description = data.weather[0].description;
      temp = Math.round(data.main.temp);    
      $("#temp").text(temp);
      $("#city").text(city);
      /* $("#icon").html("<img src='" + icon + "'>"); */
      $("#description").text(description);
    
    });
  }
   function geoFindMe() {
  var output = document.getElementById("city");
  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }
  function success(position) {
    latitude  = position.coords.latitude;
    longitude = position.coords.longitude;
    getInfo(); 
  }
  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }
  output.innerHTML = "<p>Locating…</p>";
  navigator.geolocation.getCurrentPosition(success, error);   
}
   
  $("#unit").on("click", function(){
    if($("#unit").html() === "°C"){
      $(this).text("°F");
      $("#temp").text((temp * 9/5) + 32);
    } else {
      $(this).text("°C");
      $("#temp").text(temp);
  
    }
  })
 
  geoFindMe();
});

  
