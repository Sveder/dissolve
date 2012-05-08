<?php
    $db = mysql_connect('sveder.db', "ssoft", "c?uW4\$ta6AhUgU6*bRax");
    mysql_selectdb("freshpaint");
    
    //Get the last id:
    $last_id_query = mysql_query("select max(id) from sessions;", $db);

    $last_id_row = mysql_fetch_assoc($last_id_query);
    $last_id = $last_id_row[0];
    $new_id = intval($last_id) + 1;
    
    //Convert it to a number in base 36 which basically adds the letters to get
    //a shorther alphanumeric representation:
    $link_text = base_convert($new_id, 10, 36);
    $recreate = $_POST["data"];

    $recreate = base64_encode(mysql_real_escape_string($recreate));
    
    echo "INSERT INTO freshpaint.sessions (link, desc) VALUES ('$link_text', '$recreate')";
    echo "\n\n</br>";
    mysql_query('INSERT INTO freshpaint.sessions (link, desc) VALUES ("123", "abs")', $db);
    echo mysql_error($db);
    echo $link_text;
?>