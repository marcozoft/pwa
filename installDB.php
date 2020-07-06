<?php


    $isdb = false;
    if(is_file('DB.sqlite')){$isdb = true;}
    try{
        $db = new PDO('sqlite:DB.sqlite');
    }
    catch(PDOException $e){
        exit($e->getMessage());
    }
    if($isdb == false){
        $tables = array();
        $tables['subscribers'] = array('id'=>'INTEGER PRIMARY KEY AUTOINCREMENT','endpoint'=>'TEXT','auth'=>'TEXT','p256dh'=>'TEXT');
        foreach($tables as $ke => $val){

            $sql = "CREATE TABLE IF NOT EXISTS ".$ke." (";
                foreach($val as $k => $v){
                    $sql .= $k." ".$v.", ";
                }
                $sql = rtrim($sql, ", ");
                $sql .= ")";
                $db->exec($sql);
        }
    }




