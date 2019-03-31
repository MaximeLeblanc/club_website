<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Club;
use App\Entity\HomeImage;

class HomeController extends AbstractController {

    /**
     * @Route("/", name="home")
     */
    public function welcome() {
        // $this->get('security.token_storage')->setToken(NULL);

        $clubsRepository = $this->getDoctrine()->getRepository(Club::class);
        $clubs = $clubsRepository->getAllClubs();

        $homeImagesRepository = $this->getDoctrine()->getRepository(HomeImage::class);
        $images = $homeImagesRepository->getAllImages();
        
        return $this->render('home.html.twig', [
            'images' => $images,
            'clubs' => $clubs
        ]);
    }

    /**
     * @Route("/wip", name="wip")
     */
    public function wip() {
        return $this->render('wip.html.twig');
    }

    // /**
    //  * @Route("/getClubs")
    //  */
    // public function getClubs() {
    //     $this->clubsRepository = $this->getDoctrine()->getRepository(Club::class);

    //     $encoders = [new JsonEncoder()];
    //     $normalizers = [new ObjectNormalizer()];
    //     $serializer = new Serializer($normalizers, $encoders);

    //     $clubs = $this->clubsRepository->getAllClubs();
    //     $jsonContentArray = array();

    //     foreach($clubs as $club) {
    //         $jsonContentArray[] = $serializer->serialize($club, 'json');
    //     }

    //     return new JsonResponse(array($jsonContentArray));
    // }
}
?>