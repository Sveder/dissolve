function check(){
    if (visuals_count > 0){
        var url = "start_web_app";
        var data = encodeURIComponent(document.forms["freshpaint"]["markers"].value);
        var params = "&data=" + data;
        var http = new XMLHttpRequest();
        http.open("POST", url, true);
        
        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        http.onreadystatechange = function() {//Call a function when the state changes.
                if(http.readyState == 4 && http.status == 200) {
                }
        }
        http.send(params);
        window.location.href = "tcontrols.html";
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