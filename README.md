EN -
# This is the website for the martial art club of Toghza

FR -
# Ceci est le site pour le site d'arts martiaux de Toghza

## Pré-requis
* Composer
* PHP 7

## Installation
* `git clone https://github.com/MaximeLeblanc/club_website`
* `cd club_website`
* `composer install`

## Lancement du serveur
* `cd club_website`
* `php bin/console server:run`

## Base de données
* php bin/console doctrine:database:create
* php bin/console make:migration
* php bin/console doctrine:migrations:migrate
* php bin/console make:entity --regenerate

## Architecture du code MVC
* src/Controller : contrôleurs
* src/Entity : modèle
* templates : vue