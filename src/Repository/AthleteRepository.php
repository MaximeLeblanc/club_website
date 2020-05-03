<?php

namespace App\Repository;

use App\Entity\Athlete;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

class AthleteRepository extends ServiceEntityRepository {
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Athlete::class);
    }

    public function getAllAthletes() {
        return $this->getAllAthletesOrderBy('id', 'asc');
    }

    public function getAllAthletesOrderByNameAsc() {
        return $this->getAllAthletesOrderBy('name', 'asc');
    }

    public function getAllAthletesOrderByNameDesc() {
        return $this->getAllAthletesOrderBy('name', 'desc');
    }

    private function getAllAthletesOrderBy($criteria, $asc) {
        return $this->createQueryBuilder('c')
            ->orderBy('c.'.$criteria, $asc)
            ->getQuery()
            ->getResult()
        ;
    }
}
?>