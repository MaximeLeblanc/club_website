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
            'administrators' => $admins
        ]);
    }

    /**
     * @Route("/addAdministrator")
     */
    public function addAdministrator(Request $request) {
        $entityManager = $this->getDoctrine()->getManager();

        $name = $request->get('name');
        $lastName = $request->get('lastName');
        $email = $request->get('email');
        $role = $request->get('role');
        if ($role == "Super administrateur") {
            $role = "ROLE_SUPER_ADMIN";
        } else if ($role == "Administrateur") {
            $role = "ROLE_ADMIN";
        } else {
            $role = "ROLE_USER";
        }
        
        $user = new User();
        $user->setName($name);
        $user->setLastName($lastName);
        $user->setEmail($email);
        $user->setRole($role);

        $entityManager->persist($user);
        $entityManager->flush();

        // Send email to create a password

        return new JsonResponse(array($jsonContentArray));
    }
}
?>