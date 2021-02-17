<?php


namespace Objects;


use DateTime;

class Presentation {
    public string $uuid;
    public DateTime $date;
    public Hall $hall;
    public Movie $movie;
    public array $reservations;
}