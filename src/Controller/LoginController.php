<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class LoginController extends AbstractController {
    /**
     * @Route("/login", name="app_login")
     */
    public function login(AuthenticationUtils $authenticationUtils): Response {
        if ($this->getUser() != null) {
            return $this->redirectToRoute('administrationHome');
        }
        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $email = $authenticationUtils->getLastUsername();

        return $this->render('login.html.twig', [
            'email' => $email,
            'error' => $error
        ]);
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout() {
    }
}

?>