<?php


namespace Objects;


class Reservation {
    public string $uuid;
    public Presentation $presentation;
    public int $seatX;
    public int $seatZ;
}