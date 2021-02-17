<?php


namespace Objects;

require_once __DIR__ . "/../database/DatabaseConnector.php";
require_once __DIR__ . "/../objects/Hall.php";
require_once __DIR__ . "/../objects/Movie.php";


use Database\DatabaseConnector;
use DateTime;

class Presentation {
    public string $uuid;
    public DateTime $date;
    public Hall $hall;
    public Movie $movie;
    public array $reservations;

    public static function fromDatabase($uuid): Presentation|false {
        $db = new DatabaseConnector();
        $conn = $db->getConnection();
        $sql = "SELECT * FROM `presentations` WHERE uuid = '$uuid'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $entry = false;
            while ($row = $result->fetch_assoc()) {
                $entry = $row;
            }
            extract($entry);
            $presentation = new Presentation();
            $presentation->uuid = $uuid;
            $presentation->reservations = json_decode($reservations);
            $presentation->hall = Hall::fromDatabase($hall);
            return $presentation;
        }
        return false;
    }
}