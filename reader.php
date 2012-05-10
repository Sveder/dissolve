<?php
    $db = mysql_connect('sveder.db', "freshpaint", "f!38xe59t?rEkaB5*pu_");
    mysql_selectdb("freshpaint");
    
    $link_text = $_REQUEST["link_text"];
    $recreate_query = mysql_query("select recreate from sessions where link_text='$link_text';", $db);

    $formula = mysql_fetch_assoc($recreate_query);
    echo base64_decode($formula["recreate"]);
?>