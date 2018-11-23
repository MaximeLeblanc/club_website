<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;

class HomeController {
    public function welcome() {
        return new Response('<html><body>Hello buddy !</body></html>');
    }
}
?>