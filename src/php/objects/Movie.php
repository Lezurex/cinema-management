<?php

namespace Objects;

use Database\DatabaseConnector;

class Movie {
    public string $uuid;
    public string $title;
    public string $description;
    public array $presentations;

    private function __construct() {

    }

    public static function fromDatabase($uuid) {
        $db = new DatabaseConnector();
        $conn = $db->getConnection();
        $conn->prepare("SELECT * FROM ");
    }
}