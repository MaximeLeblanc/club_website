<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass="App\Repository\AthleteRepository")
 */
class Athlete {
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"athlete"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50, unique=false, nullable=false)
     * @Groups({"athlete"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=50, unique=false, nullable=false)
     * @Groups({"athlete"})
     */
    private $lastName;

    /**
     * @ORM\Column(type="date", unique=false, nullable=false)
     * @Groups({"athlete"})
     */
    private $birthDate;
    
    /**
     * @ORM\Column(type="string", length=10, unique=false, nullable=false)
     * @Groups({"athlete"})
     */
    private $phoneNumber1;
    
    /**
     * @ORM\Column(type="string", length=10, unique=false, nullable=true)
     * @Groups({"athlete"})
     */
    private $phoneNumber2;
    
    /**
     * @ORM\Column(type="string", length=180, unique=false, nullable=true)
     * @Groups({"athlete"})
     */
    private $email;
    
    /**
     * @ORM\Column(type="string", length=180, unique=false, nullable=false)
     * @Groups({"athlete"})
     */
    private $address;
    
    /**
     * @ORM\Column(type="boolean", unique=false, nullable=false)
     * @Groups({"athlete"})
     */
    private $insurance;

    /**
     * @ORM\Column(type="string", length=255, unique=false, nullable=true)
     * @Groups({"user"})
     */
    private $photo;
    // historique des poids
    // historique de la taille
    // -> catégorie calculée à partir de l'âge et du poids

    public function getId(): ?int {
        return $this->id;
    }

    public function getName(): ?string {
        return $this->name;
    }

    public function setName($name): self {
        $this->name = $name;

        return $this;
    }

    public function getLastName(): ?string {
        return $this->lastName;
    }

    public function setLastName($lastName): self {
        $this->lastName = $lastName;

        return $this;
    }

    public function getBirthDate(): ?string {
        return $this->birthDate;
    }

    public function setBirthDate($birthDate): self {
        $this->birthDate = $birthDate;

        return $this;
    }

    public function getPhoneNumber1(): ?string {
        return $this->phoneNumber1;
    }

    public function setPhoneNumber1($phoneNumber): self {
        $this->phoneNumber1 = $phoneNumber;

        return $this;
    }

    public function getPhoneNumber2(): ?string {
        return $this->phoneNumber2;
    }

    public function setPhoneNumber2($phoneNumber): self {
        $this->phoneNumber2 = $phoneNumber;

        return $this;
    }

    public function getEmail(): ?string {
        return $this->email;
    }

    public function setEmail($email): self {
        $this->email = $email;

        return $this;
    }
    public function getAddress(): ?string {
        return $this->address;
    }

    public function setAddress($address): self {
        $this->address = $address;

        return $this;
    }
    public function getInsurance(): ?string {
        return $this->insurance;
    }

    public function setInsurance($insurance): self {
        $this->insurance = $insurance;

        return $this;
    }

    public function getPhoto(): ?string {
        return $this->photo;
    }

    public function setPhoto(string $photo): self {
        $this->photo = $photo;

        return $this;
    }
}
?>