$( document ).ready(function() {
    $('#zip-submit').submit(function(e){
        e.preventDefault();
        var zip_one = $('#location_one').val();
        var zip_two = $('#location_two').val();
        new WeatherUndergroundLocation(zip_one, function(location) {
            new WeatherView(location, $("#location-one"));
        });
        new WeatherUndergroundLocation(zip_two, function(location) {
            new WeatherView(location, $("#location-two"));
        });
    });
});

var WeatherUndergroundLocation = function(zip, callback){
    var url = 'http://api.wunderground.com/api/625172310aff38a6/geolookup/conditions/q/' + zip + '.json';
    $.ajax({
        url : url,
        dataType : "jsonp",
        success : function(json) {
            var location = json['location']['city'];
            var temp_f = json['current_observation']['temp_f'];
            var weather = json['current_observation']['weather'];
            var icon = json['current_observation']['icon_url'];
            var iconNine = icon.replace('/c/k/','/c/i/');
            var location = new Location(location, temp_f, weather, iconNine);
            callback(location);
        }
    });
};

var Location = function(location, temp_f, weather, iconNine){
    this.location = location;
    this.temp = temp_f;
    this.weather = weather;
    this.icon = iconNine;
};

var WeatherView = function(report, $target){
    var $template = $("#location-template");
    var source = $template.html();
    var template = Handlebars.compile(source);
    var html = template(report);
    $target.html(html);
};