<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class AdministrationController extends AbstractController {

    /**
     * @Route("/administration", name="administrationHome")
     */
    public function welcome() {
        return $this->render('administration/administrationHome.html.twig');
    }
}
?>