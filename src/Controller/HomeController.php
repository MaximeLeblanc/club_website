<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use App\Entity\Club;

class HomeController extends AbstractController {

    private $clubsRepository;

    /**
     * @Route("/")
     */
    public function welcome() {
        $this->clubsRepository = $this->getDoctrine()->getRepository(Club::class);

        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $clubs = $this->clubsRepository->getAllClubs();
        
        return $this->render('home.html.twig', ['clubs' => $clubs]);
    }

    /**
     * @Route("/wip")
     */
    public function wip() {
        return $this->render('wip.html.twig');
    }

    /**
     * @Route("/getClubs")
     */
    public function getClubs() {
        $this->clubsRepository = $this->getDoctrine()->getRepository(Club::class);

        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $clubs = $this->clubsRepository->getAllClubs();
        $jsonContentArray = array();

        foreach($clubs as $club) {
            $jsonContentArray[] = $serializer->serialize($club, 'json');
        }

        return new JsonResponse(array($jsonContentArray));
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