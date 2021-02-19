<?php


namespace Objects;

require_once __DIR__ . "/../database/DatabaseConnector.php";
require_once __DIR__ . "/../objects/Hall.php";
require_once __DIR__ . "/../objects/Movie.php";
require_once __DIR__ . "/../objects/Reservation.php";


use Cassandra\Date;
use Database\DatabaseConnector;
use DateTime;
use Objects\Reservation;

class Presentation {
    public string $uuid;
    public DateTime $date;
    public Hall $hall;
    public Movie $movie;
    public array $reservations;

    public static function fromDatabase($uuid, $movieUUID): Presentation|false {
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
            $presentation->date = new DateTime();
            $presentation->date->setTimestamp($time);
            return $presentation;
        }
        return false;
    }

    public function save() {
        $db = new DatabaseConnector();
        $conn = $db->getConnection();
        $reservationJSON = json_encode($this->reservations);
        $sql = "INSERT INTO presentations (
                               uuid,
                               time,
                               movie,
                               reservations,
                               hall
                           ) VALUES (
                              '$this->uuid',
                              '{$this->date->getTimestamp()}',
                              '{$this->movie->uuid}',
                              '$reservationJSON',
                              '{$this->hall->uuid}'
                          )";
        $result = $conn->query($sql);
    }

    public function toArray() {
        $movie = "";
        if (isset($this->movie)) {
            $movie = $this->movie->uuid;
        }
        $reservations = array();
        foreach ($this->reservations as $reservation) {
            $reservations[] = $reservation->toArray();
        }
        return array(
            "uuid" => $this->uuid,
            "date" => $this->date->getTimestamp(),
            "movie" => $movie,
            "reservations" => $reservations,
            "hall" => $this->hall
        );
    }
}