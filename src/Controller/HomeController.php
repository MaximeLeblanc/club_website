<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class HomeController extends AbstractController {

    /**
     * @Route("/")
     */
    public function welcome() {
        return $this->render('home.html.twig');
    }

    /**
     * @Route("/", name="connect")
     */
    public function connect(AuthenticationUtils $authenticationUtils) {
        // get the login error if there is one
        // $error = $authenticationUtils->getLastAuthenticationError();
        
        return $this->render('administration/administrationHome.html.twig');
    }
}
?>