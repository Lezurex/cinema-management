<?php
namespace Database;

use mysqli;
use mysqli_sql_exception;

class DatabaseConnector {

    private $connection = null;

    /**
     * DatabaseConnector constructor.
     */
    public function __construct() {
        $host = "db";
        $port = 3306;
        $db = "cinema";
        $user = "root";
        $password = "root";

        try {
            $this->connection = new mysqli($host, $user, $password, $db, $port);
        } catch (mysqli_sql_exception $exception) {
            exit($exception->getMessage());
        }
    }

    public function getConnection() {
        return $this->connection;
    }


}