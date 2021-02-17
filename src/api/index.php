<?php

require_once '../php/apiHandlers/MovieHandler.php';

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
}

$handler->handle($requestParts);