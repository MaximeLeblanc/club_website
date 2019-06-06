<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ClubRepository")
 */
class Club {
    
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, unique=true, nullable=false)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $address;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $facebook;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $instagram;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $twitter;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $logo;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="clubs")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

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

    public function getAddress(): ?string {
        return $this->address;
    }

    public function setAddress($address): self {
        $this->address = $address;

        return $this;
    }

    public function getCity(): ?string {
        return $this->city;
    }

    public function setCity($city): self {
        $this->city = $city;

        return $this;
    }

    public function getEmail(): ?string {
        return $this->email;
    }

    public function setEmail($email): self {
        $this->email = $email;

        return $this;
    }

    public function getFacebook(): ?string {
        return $this->facebook;
    }

    public function setFacebook($facebook): self {
        $this->facebook = $facebook;

        return $this;
    }

    public function getInstagram(): ?string {
        return $this->instagram;
    }

    public function setInstagram($instagram): self {
        $this->instagram = $instagram;

        return $this;
    }

    public function getTwitter(): ?string {
        return $this->twitter;
    }

    public function setTwitter($twitter): self {
        $this->twitter = $twitter;

        return $this;
    }

    public function getLogo(): ?string {
        return $this->logo;
    }

    public function setLogo($logo): self {
        $this->logo = $logo;

        return $this;
    }

    public function getUser(): ?User {
        return $this->user;
    }

    public function setUser(?User $user): self {
        $this->user = $user;

        return $this;
    }
}
?>