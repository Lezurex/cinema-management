<?php


namespace APIHandlers;

require_once 'APIHandlerInterface.php';
require_once 'APIHandler.php';
require_once __DIR__ . '/../objects/Movie.php';

use APIHandlers\APIHandlerInterface;
use Objects\Movie;

class MovieHandler extends APIHandler {

    /**
     * MovieHandler constructor.
     */
    public function __construct() {

    }

    public function handle($requestParts) {
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                $this->handleGet($requestParts);
                break;
            case 'POST':
                $this->handlePost($requestParts);
                break;
            case 'PUT':
                $this->handlePut($requestParts);
                break;
            case 'DELETE':
                $this->handleDelete($requestParts);
                break;
        }
    }

    private function handleGet($requestParts) {
        if (isset($requestParts[2])) {
            $uuid = $requestParts[2];
            $movie = Movie::fromDatabase($uuid);
            print json_encode($movie);
        } else {

        }
    }

    private function handlePost($requestParts) {

    }

    private function handlePut($requestParts) {

    }

    private function handleDelete($requestParts) {

    }
}