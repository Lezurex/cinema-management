<?php


namespace APIHandlers;

use Objects\Hall;
use Objects\Reservation;

require_once 'APIHandlerInterface.php';
require_once 'APIHandler.php';
require_once __DIR__ . '/../objects/Reservation.php';

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
        $newHalls = array();
        foreach ($data as $hallData) {
            $uuid = uniqid("ha", true);
            $hall = new Hall();
            $hall->uuid = $uuid;
            $hall->number = $hallData['number'];
            $hall->seatsX = $hallData['seatsX'];
            $hall->seatsZ = $hallData['seatsZ'];
            $hall->save();
            $newHalls[] = $hall;
        }
        print json_encode(array('data' => $newHalls));

    }

    private function handlePut($requestParts) {

    }

    private function handleDelete($requestParts) {

    }

}