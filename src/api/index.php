<?php

header("content-type: application/json");

$requestParts = explode("/", $_SERVER['REQUEST_URI']);
foreach ($requestParts as $key => $requestPart) {
    if ($requestPart == "") {
        unset($requestParts[$key]);
    }
}
$requestParts = array_values($requestParts);

switch ($requestParts) {
    case "movies":

}