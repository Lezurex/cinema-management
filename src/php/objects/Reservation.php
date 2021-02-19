<?php


namespace Objects;

require_once __DIR__ . "/../database/DatabaseConnector.php";

use Database\DatabaseConnector;
use JetBrains\PhpStorm\ArrayShape;

class Reservation {
    public string $uuid;
    public Presentation $presentation;
    public int $seatX;
    public int $seatZ;

    public static function fromDatabase($uuid): bool|Reservation {
        $db = new DatabaseConnector();
        $conn = $db->getConnection();
        $sql = "SELECT * FROM `reservations` WHERE uuid = '$uuid'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $entry = false;
            while ($row = $result->fetch_assoc()) {
                $entry = $row;
            }
            extract($entry);
            $reservation = new Reservation();
            $reservation->uuid = $uuid;
            $reservation->seatX = $seatX;
            $reservation->seatZ = $seatZ;
            return $reservation;
        }
        return false;
    }

    public static function getAllFromPresentation($presentationUUID): bool|array {
        $db = new DatabaseConnector();
        $conn = $db->getConnection();
        $sql = "SELECT * FROM `reservations` WHERE presentation = '$presentationUUID'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $entry = false;
            $array = array();
            while ($row = $result->fetch_assoc()) {
                $entry = $row;
                $newReservation = new Reservation();
                $newReservation->uuid = $entry['uuid'];
                $newReservation->seatX = $entry['seatX'];
                $newReservation->seatZ = $entry['seatZ'];
                $array[] = $newReservation->toArray();
            }
            return $array;

        }
        return array();
    }

    public function save() {
        $db = new DatabaseConnector();
        $conn = $db->getConnection();

        $sql = "INSERT INTO `reservations` (
                    uuid,
                    presentation,
                    seatX,
                    seatZ
                           ) VALUES (
                              '{$this->uuid}',
                              '{$this->presentation->uuid}',
                              '{$this->seatX}',
                              '{$this->seatZ}'
                          )";
        $conn->query($sql);
    }

    #[ArrayShape(["uuid" => "string", "seatX" => "int", "seatZ" => "int"])] public function toArray(): array {
        return array(
            "uuid" => $this->uuid,
            "seatX" => $this->seatX,
            "seatZ" => $this->seatZ
        );
    }
}