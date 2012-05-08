//Constants:  
var MAX_VISUALS = 2;
var MAX_SOUNDS = 6;

var BLUE_MARKER_A = "images/blue_MarkerA.png";
var BLUE_MARKER_B = "images/blue_MarkerB.png";
var BLUE_MARKER_C = "images/blue_MarkerC.png";

var MAHNE_YEHUDA_MARKER = {
    lat: 31.784674,
    lng: 35.210751,
    name: "Mahne Yehuda -> Aristobolus Street",
    selected: false,
    sound : "audio/mahne.mp3"
};

var JAFFA_GATE_MARKER = {
    lat: 31.776484,
    lng: 35.227650,
    name: "Jaffa Gate -> Martin Buber boulevard",
    selected: false,
    sound : "audio/jaffa.mp3"
};

var EIN_KEREM_MARKER = {
    lat: 31.767071,
    lng: 35.159855,
    name: "Ein Kerem -> Mount Scopus panorama",
    selected: false,
    sound : "audio/german_colony.mp3"
};

var PRAYER_MARKER = {
    lat: 31.779327,
    lng: 35.242638,
    name: "Mount of Olivess",
    selected: false,
    sound : "audio/prayer.mp3"
};

var INDUSTRY_MARKER = {
    lat: 31.795160,
    lng: 35.188351,
    name: "Saharov Gardens -> Talpiot",
    selected: false,
    sound : "audio/industry.mp3"
};

var COUNT_TO_MARKER = new Object();
COUNT_TO_MARKER[1] = BLUE_MARKER_A
COUNT_TO_MARKER[2] = BLUE_MARKER_B
COUNT_TO_MARKER[3] = BLUE_MARKER_C

var MARKER_LOC_LIST = new Object();
MARKER_LOC_LIST[0] = MAHNE_YEHUDA_MARKER;
MARKER_LOC_LIST[1] = JAFFA_GATE_MARKER;
MARKER_LOC_LIST[2] = EIN_KEREM_MARKER;
MARKER_LOC_LIST[3] = PRAYER_MARKER;
MARKER_LOC_LIST[4] = INDUSTRY_MARKER;


var marker_list = new Array();

var visuals_count = 0;
var is_audio_shown = false;
var map;
var canvas;
var ctx;

//Import web font:
WebFontConfig = {
  google: { families: [ 'Gorditas::latin' ] }
};
(function() {
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})(); 


function initialize() {
  canvas = document.getElementById("map-canvas");
  ctx = canvas.getContext("2d");
  
  //Create map:
  var center = new google.maps.LatLng(31.778602,35.213671);
  var myOptions = {
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: false,
    streetViewControl: false,
    disableDefaultUI: true,
    center: center,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  
  map = new google.maps.Map(document.getElementById("map-div"),
      myOptions);
  
  
  //Put markers on the map:
  var cur_pos = 0;
  for (var key in MARKER_LOC_LIST){
    var tour = MARKER_LOC_LIST[key];
    var location = new google.maps.LatLng(tour.lat, tour.lng);
    var marker = new google.maps.Marker({
                  position: location,
                  map: map,
                  title: tour.name
                  });
    marker.selected = false;
    
    //Add a tag that tells us which marker it is logically - index in our global list:
    marker.tag = cur_pos;
    cur_pos += 1;
    
    google.maps.event.addListener(marker, 'click', function() {
      onMarkerClick(this);
      
      });
    marker_list.push(marker);
  }
  
  //Set error text:
  var txt = document.createTextNode("You can't choose more then " + MAX_VISUALS + " visuals.");
  document.querySelector('#error-div').appendChild(txt);
  
  //Show instructions:
  $("a#inline").fancybox({
		'hideOnContentClick': true,
                'transitionIn'	:	'fade',
		'transitionOut'	:	'fade',
		'speedIn'	:	600, 
		'speedOut'	:	200,
                'padding'       :       0,
                'title'         : "Welcome to Dissolving Localities",
	});
  $("a#inline").click();
}


function onMarkerClick(marker){
  var tour = MARKER_LOC_LIST[marker.tag]
  var is_selected = tour.selected;
  
  ctx.font = "bold 50px Gorditas";
  ctx.fillStyle="#ff0000";
  ctx.fillText(tour.name, 148, 43);
  
  //If the marker is selected, deselect it:
  if (is_selected){
    marker.setIcon();
    visuals_count -= 1;
  
  } else {
    //Check that the number of chosen videos doesn't exceed the maximum:
    if (visuals_count >= MAX_VISUALS){
      $("a#error").fancybox({
		'hideOnContentClick': true,
                'transitionIn'	:	'fade',
		'transitionOut'	:	'fade',
		'speedIn'	:	600, 
		'speedOut'	:	200,
                'padding'       :       0,
	});
      $("a#error").click();      
      return;
    }
    //Make the marker selected:
    visuals_count += 1;
    marker.setIcon(COUNT_TO_MARKER[visuals_count]);
  }
  
  //if (visuals_count == 1){
  //  $("#first-audio").fadeIn('slow');
  //  document.querySelector('#first-audio').setAttribute('src', tour.sound);
  //} else if (visuals_count == 0){
  //  $("#first-audio").fadeOut('slow');
  //  document.querySelector('#first-audio').pause();
  //}
  
  animate_marker(marker);
  tour.selected = !is_selected;
}

function animate_marker(marker){
  if (marker.getAnimation() != null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    
    var stopit = setTimeout(function(){
        marker.setAnimation(null);
        }, 1484);
  }
}

function update_markers(){
  var chosen = "";
  for (var key in MARKER_LOC_LIST){
    var obj = MARKER_LOC_LIST[key];
    if (obj.selected){
      chosen += "V";
    }
    else {
      chosen += "N";
    }
  }
  
  document.forms["freshpaint"]["markers"].value = chosen;
}