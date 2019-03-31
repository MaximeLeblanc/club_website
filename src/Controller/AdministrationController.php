<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\User;

class AdministrationController extends AbstractController {

    /**
     * @Route("/administration", name="administrationHome")
     */
    public function administrationHome() {
        if (!$this->isGranted('ROLE_ADMIN')) {
            return $this->redirectToRoute('home');
        }
        return $this->render('administration/administrationHome.html.twig');        
    }

    /**
     * @Route("/administration/admin", name="administrationAdmin")
     */
    public function administrationAdmin() {
        if (!$this->isGranted('ROLE_ADMIN')) {
            return $this->redirectToRoute('home');
        }

        $adminRepository = $this->getDoctrine()->getRepository(User::class);
        $admins = $adminRepository->getAllUsers();

        return $this->render('administration/administrationAdmin.html.twig', [
            'administrateurs' => $admins
        ]);
    }
}
?>