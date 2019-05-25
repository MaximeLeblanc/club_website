<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
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

        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $name = $request->get('name');
        $lastName = $request->get('lastName');
        $email = $request->get('email');
        $role = $request->get('role');
        if ($role == "Administrateur") {
            $role = "ROLE_SUPER_ADMIN";
        } else if ($role == "Coach") {
            $role = "ROLE_ADMIN";
        } else {
            $role = "ROLE_USER";
        }
        
        $user = new User();
        $user->setName($name);
        $user->setLastName($lastName);
        $user->setEmail($email);
        $user->setPassword(uniqid());
        $user->addRole($role);

        try {
            $entityManager->persist($user);
            $entityManager->flush();
        } catch (\Exception $e) {
            return new Response($e);
        }
        
        $jsonUser[] = $serializer->serialize($user, 'json');

        // Send email to create a password
        return new JsonResponse($jsonUser);
    }

    /**
     * @Route("/editAdministrator")
     */
    public function editAdministrator(Request $request) {
        $entityManager = $this->getDoctrine()->getManager();
        $userRepository = $this->getDoctrine()->getRepository(User::class);

        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $id = $request->get('id');
        $name = $request->get('name');
        $lastName = $request->get('lastName');
        $email = $request->get('email');
        $role = $request->get('role');
        if ($role === "Administrateur") {
            $role = "ROLE_SUPER_ADMIN";
        } else if ($role === "Coach") {
            $role = "ROLE_ADMIN";
        } else {
            $role = "ROLE_USER";
        }
        
        $user = $userRepository->find($id);
        $user->setName($name);
        $user->setLastName($lastName);
        $user->setEmail($email);
        $user->setPassword(uniqid());
        $user->setRole($role);

        try {
            $entityManager->flush();
        } catch (\Exception $e) {
            return new Response($e);
        }
        
        $jsonUser[] = $serializer->serialize($user, 'json');

        // Send email to create a password
        return new JsonResponse($jsonUser);
    }

    /**
     * @Route("/deleteAdministrator")
     */
    public function deleteAdministrator(Request $request) {
        $entityManager = $this->getDoctrine()->getManager();
        $userRepository = $this->getDoctrine()->getRepository(User::class);

        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $id = $request->get('id');

        $user = $userRepository->find($id);

        $entityManager->remove($user);
        $entityManager->flush();

        $jsonUser[] = $serializer->serialize($user, 'json');
        return new JsonResponse($jsonUser);
    }
}
?>