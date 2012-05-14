//Open channel to appengine:
channel = new goog.appengine.Channel('start_channel');
socket = channel.open();
socket.onmessage = got_message;

function got_message(data){
    var markers = data["data"];
    document.forms["freshpaint"]["markers"].value = markers;
    document.getElementById("submit-button").click();
}