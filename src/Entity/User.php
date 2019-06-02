<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User implements UserInterface {
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true, nullable=false)
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=50, unique=false, nullable=true)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=50, unique=false, nullable=true)
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255, unique=false, nullable=true)
     */
    private $photo;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Club", mappedBy="user")
     */
    private $clubs;

    public function __construct() {
        $this->clubs = new ArrayCollection();
    }

    public function getId(): ?int {
        return $this->id;
    }

    public function getEmail(): ?string {
        return $this->email;
    }

    public function setEmail(string $email): self {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array {
        if (empty($this->roles)) {
            $this->roles[] = 'ROLE_USER';
        }
        
        return array_unique($this->roles);
    }

    public function setRoles(array $roles): self {
        $this->roles = $roles;

        return $this;
    }

    public function setRole(string $role): self {
        $this->roles = array();
        array_push($this->roles, $role);

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string {
        return (string) $this->password;
    }

    public function setPassword(string $password): self {
        $this->password = $password;

        return $this;
    }

    public function getName(): string {
        return (string) $this->name;
    }

    public function setName(string $name): self {
        $this->name = $name;

        return $this;
    }

    public function getLastName(): string {
        return (string) $this->lastName;
    }

    public function setLastName(string $lastName): self {
        $this->lastName = $lastName;

        return $this;
    }

    public function getPhoto(): string {
        return (string) $this->photo;
    }

    public function setPhoto(string $photo): self {
        $this->photo = $photo;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt() {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials() {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection|Club[]
     */
    public function getClubs(): Collection {
        return $this->clubs;
    }

    public function addClub(Club $club): self {
        if (!$this->clubs->contains($club)) {
            $this->clubs[] = $club;
            $club->setUser($this);
        }

        return $this;
    }

    public function removeClub(Club $club): self {
        if ($this->clubs->contains($club)) {
            $this->clubs->removeElement($club);
            // set the owning side to null (unless already changed)
            if ($club->getUser() === $this) {
                $club->setUser(null);
            }
        }

        return $this;
    }
}
