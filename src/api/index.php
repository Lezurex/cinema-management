<?php

require_once '../php/apiHandlers/MovieHandler.php';
require_once '../php/apiHandlers/HallHandler.php';

use APIHandlers\HallHandler;
use APIHandlers\MovieHandler;

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
        break;
    case "halls":
        $handler = new HallHandler();
        break;
}

$handler->handle($requestParts);