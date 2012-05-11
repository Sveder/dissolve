<?php
    $db = mysql_connect('sveder.db', "freshpaint", "f!38xe59t?rEkaB5*pu_");
    mysql_selectdb("freshpaint");
    
    //Get the last id:
    $last_id_query = mysql_query("select max(id) as last from sessions;", $db);

    $last_id_row = mysql_fetch_assoc($last_id_query);
    $last_id = $last_id_row["last"];
    $new_id = intval($last_id) + 1;
    
    //Convert it to a number in base 36 which basically adds the letters to get
    //a shorther alphanumeric representation:
    $link_text = base_convert($new_id, 10, 36);
    $recreate = $_REQUEST["data"];
    
    $recreate = base64_encode(mysql_real_escape_string($recreate));
    
    mysql_query("INSERT INTO freshpaint.sessions (link_text, recreate) VALUES ('$link_text', '$recreate')", $db);
    echo $link_text;
?>