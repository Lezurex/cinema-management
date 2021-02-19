<?php


namespace APIHandlers;

require_once 'APIHandlerInterface.php';
require_once 'APIHandler.php';
require_once __DIR__ . '/../objects/Reservation.php';

use Objects\Presentation;
use Objects\Reservation;

class ReservationHandler extends APIHandler {

    public function handle($requestParts) {
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                $this->handleGet($requestParts);
                break;
            case 'POST':
                $this->handlePost($requestParts);
                break;
            case 'PUT':
                $this->handlePut($requestParts);
                break;
            case 'DELETE':
                $this->handleDelete($requestParts);
                break;
        }
    }

    private function handleGet($requestParts) {
        if (isset($requestParts[2])) {
            if ($requestParts[2] === "fromPresentation") {
                if (isset($requestParts[3])) {
                    $data = Reservation::getAllFromPresentation($requestParts[3]);
                    print json_encode(array('data' => $data));
                }
            } else {
                $uuid = $requestParts[2];
                $reservation = Reservation::fromDatabase($uuid);
                print json_encode(array('data' => array($reservation)));
            }
        } else {
        }
    }

    private function handlePost($requestParts) {
        $data = json_decode(file_get_contents('php://input'), true)['data'];
        $newReservations = array();
        foreach ($data as $reservationData) {
            $uuid = uniqid("res", true);
            $reservation = new Reservation();
            $reservation->uuid = $uuid;
            $reservation->presentation = Presentation::fromDatabase($reservationData['presentation'], "");
            $reservation->seatX = $reservationData['seatX'];
            $reservation->seatZ = $reservationData['seatZ'];
            $reservation->save();
            $newReservations[] = $reservation;
        }
        print json_encode(array('data' => $newReservations));

    }

    private function handlePut($requestParts) {

    }

    private function handleDelete($requestParts) {

    }

}