<?php


namespace APIHandlers;


interface APIHandlerInterface {
    public function handle($requestParts);
}