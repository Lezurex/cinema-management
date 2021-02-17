<?php


namespace Objects;

require_once __DIR__ . "/../database/DatabaseConnector.php";
require_once __DIR__ . "/../objects/Hall.php";

use Database\DatabaseConnector;

class Hall {
    public string $uuid;
    public int $number;
    public int $seatsX;
    public int $seatsZ;

    public static function fromDatabase($uuid): Hall|false {
        $db = new DatabaseConnector();
        $conn = $db->getConnection();
        $sql = "SELECT * FROM `halls` WHERE uuid = '$uuid'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $entry = false;
            while ($row = $result->fetch_assoc()) {
                $entry = $row;
            }
            extract($entry);
            $hall = new Hall();
            $hall->uuid = $uuid;
            $hall->number = $number;
            $hall->seatsX = $seatsX;
            $hall->seatsZ = $seatsZ;
            return $hall;
        }
        return false;
    }
}