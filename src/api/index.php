<?php

require_once '../php/apiHandlers/MovieHandler.php';
require_once '../php/apiHandlers/HallHandler.php';
require_once '../php/apiHandlers/ReservationHandler.php';

use APIHandlers\HallHandler;
use APIHandlers\MovieHandler;
use APIHandlers\ReservationHandler;

header("content-type: application/json");

$requestParts = explode("/", $_SERVER['REQUEST_URI']);
foreach ($requestParts as $key => $requestPart) {
    if ($requestPart == "") {
        unset($requestParts[$key]);
    }
}
$requestParts = array_values($requestParts);
$handler = null;
switch ($requestParts[1]) {
    case "movies":
        $handler = new MovieHandler();
        break;
    case "reservations":
        $handler = new ReservationHandler();
        break;
    case "halls":
        $handler = new HallHandler();
        break;
    default:
        $handler = null;
        break;
}
if ($handler !== null)
    $handler->handle($requestParts);
else {
    print json_encode(array(
        "version" => "1.0.0"
    ));
}