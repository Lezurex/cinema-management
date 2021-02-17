<?php

namespace Objects;

require_once __DIR__ . '/../database/DatabaseConnector.php';
require_once __DIR__ . '/../objects/Presentation.php';


use Database\DatabaseConnector;
use Objects\Presentation;

class Movie {
    public string $uuid;
    public string $title;
    public string $description;
    public array $presentations;

    private function __construct() {

    }

    public static function fromDatabase($uuid): bool|Movie {
        $db = new DatabaseConnector();
        $conn = $db->getConnection();
        $sql = "SELECT * FROM `movies` WHERE uuid = '$uuid'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $entry = false;
            while ($row = $result->fetch_assoc()) {
                $entry = $row;
            }
            extract($entry);
            $movie = new Movie();
            $movie->uuid = $uuid;
            $movie->title = $title;
            $movie->description = $description;
            $presentations = json_decode($presentations, true);
            $movie->presentations = array();
            foreach ($presentations as $presentationUUID) {
                $presentation = Presentation::fromDatabase($presentationUUID);
                if ($presentation != false) {
                    array_push($movie->presentations, $presentation);
                }
            }
            return $movie;
        }
        return false;
    }
}