

<?php

function validation($obj){
    if($obj->sum == ''|| $obj->sum <1000 || $obj->sum > 3000000 || $obj->percent == ''|| $obj->percent<3 || $obj->percent > 100 || is_int($obj->percent) || $obj->sumAdd < 0 || $obj->sumAdd > 3000000 || $obj->term < 1 || $obj->term > 60){
        throw new Exception('Некорректные данные');
    }else{
        return true;
    }
}

try{  
    $obj = json_decode($_POST['formData']);
    validation($obj);
    list($day, $month, $year) = explode(".", $obj->startDate);
    $days = cal_days_in_month(CAL_GREGORIAN, $month, $year);
    $daysYear = date('L', mktime(0, 0, 0, $month, $day, $year))?366:365;
    $result[0] = $obj->sum + ($obj->sum + $obj->sumAdd) * $days * ($obj->percent / $daysYear);
    for($i = 1; $i < $obj->term; $i++){
        $result[$i] = $result[$i-1] + ($result[$i-1] + $obj->sumAdd) * $days * ($obj->percent / $daysYear);
    }
    echo json_encode(round($result[$obj->term-1]));
}catch(Exception $e){
    echo $e->getMessage();
}


?>




