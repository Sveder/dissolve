//Constants:  
var MAX_VISUALS = 2;
var MAX_SOUNDS = 6;

var BLUE_MARKER_A = "images/blue_MarkerA.png";
var BLUE_MARKER_B = "images/blue_MarkerB.png";
var BLUE_MARKER_C = "images/blue_MarkerC.png";

var COUNT_TO_MARKER = new Object();
COUNT_TO_MARKER[1] = BLUE_MARKER_A
COUNT_TO_MARKER[2] = BLUE_MARKER_B
COUNT_TO_MARKER[3] = BLUE_MARKER_C

var marker_list = new Array();

var visuals_count = 0;
var is_audio_shown = false;
var map;

var windows = new Array();


function check(){
    if (visuals_count > 0){
        document.getElementById("submit-button").click();
    }
    else {
        $("a#select-more").fancybox({
		'hideOnContentClick': true,
                'transitionIn'	:	'fade',
		'transitionOut'	:	'fade',
		'speedIn'	:	600, 
		'speedOut'	:	200,
                'padding'       :       0
	});
      $("a#select-more").click(); 
    }
}

function initialize() {
  
  //Create map:
  var center = new google.maps.LatLng(31.788602,35.193671);
  var myOptions = {
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
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
    
    google.maps.event.addListener(marker, 'mouseover', function() {
          var tour = MARKER_LOC_LIST[this.tag]
          var content_string = tour.name + "</br><img style='margin=10px; height: 150px; width:150px;' src='" + tour.preview + "'/>";
          
          var infowindow = new google.maps.InfoWindow({
            content: content_string
            });
          infowindow.open(map, this);
          this.window=infowindow;
          windows.push(infowindow);
      });
    
    google.maps.event.addListener(marker, 'mouseout', function() {
        for (var i in windows){
            windows[i].close();
        }
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
                'onClosed'      : function(){  setTimeout(reminder, 1500);}
	});
  $("a#inline").click();
}

function reminder(){
    $("#floatMess").fadeIn("fast");
}

function onMarkerClick(marker){
  var tour = MARKER_LOC_LIST[marker.tag]
  var is_selected = tour.selected;
  
 
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