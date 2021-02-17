<?php


namespace APIHandlers;

require_once 'APIHandlerInterface.php';
require_once 'APIHandler.php';
require_once __DIR__ . '/../objects/Movie.php';

use APIHandlers\APIHandlerInterface;
use DateTime;
use Objects\Hall;
use Objects\Movie;
use Objects\Presentation;

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
            print json_encode(array('data' => array($movie)));
        } else {
            print json_encode(array('data' => Movie::getAllFromDatabase()));
        }
    }

    private function handlePost($requestParts) {
        $data = json_decode(file_get_contents('php://input'), true)['data'];
        $newMovies = array();
        foreach ($data as $movieData) {
            $uuid = uniqid("mov", true);
            $movie = new Movie();
            $movie->uuid = $uuid;
            $movie->title = $movieData['title'];
            $movie->description = $movieData['description'];
            $movie->presentations = array();
            foreach ($movieData['presentations'] as $presentationData) {
                $presentation = new Presentation();
                $presentation->uuid = uniqid("pre", true);
                $presentation->movie = $movie;
                $presentation->hall = Hall::fromDatabase($presentationData['hall']);
                $presentation->date = new DateTime($presentationData['date']);
                $presentation->reservations = array();
                array_push($movie->presentations, $presentation);
            }
            $movie->save();
            foreach ($movie->presentations as $presentation) {
                $presentation->save();
            }
            $newMovies[] = $movie;
        }
        print json_encode(array('data' => $newMovies));

    }

    private function handlePut($requestParts) {

    }

    private function handleDelete($requestParts) {

    }
}