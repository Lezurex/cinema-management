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

    public function __construct() {

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

    public static function getAllFromDatabase(): bool|array {
        $db = new DatabaseConnector();
        $conn = $db->getConnection();
        $sql = "SELECT * FROM `movies`";
        $result = $conn->query($sql);
        $movies = array();
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                extract($row);
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
                $movies[] = $movie;
            }
            return $movies;

        }
        return false;
    }

    public function save() {
        $db = new DatabaseConnector();
        $conn = $db->getConnection();
        $presentationUUIDs = array();
        foreach ($this->presentations as $presentation) {
            array_push($presentationUUIDs, $presentation->uuid);
        }
        $presentationUUIDs = json_encode($presentationUUIDs);
        $sql = "INSERT INTO movies (
                    uuid,
                    title,
                    description,
                    presentations
                           ) VALUES (
                              '$this->uuid',
                              '{$this->title}',
                              '{$this->description}',
                              '$presentationUUIDs'
                          )";
        $conn->query($sql);
    }
}