<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190601112549 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE club ADD user_id INT NOT NULL, ADD email VARCHAR(255) DEFAULT NULL, DROP description, CHANGE facebook facebook VARCHAR(255) DEFAULT NULL, CHANGE instagram instagram VARCHAR(255) DEFAULT NULL, CHANGE city city VARCHAR(255) DEFAULT NULL, CHANGE address address VARCHAR(255) DEFAULT NULL, CHANGE twitter twitter VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE club ADD CONSTRAINT FK_B8EE3872A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B8EE38725E237E06 ON club (name)');
        $this->addSql('CREATE INDEX IDX_B8EE3872A76ED395 ON club (user_id)');
        $this->addSql('ALTER TABLE user CHANGE name name VARCHAR(50) DEFAULT NULL, CHANGE last_name last_name VARCHAR(50) DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE club DROP FOREIGN KEY FK_B8EE3872A76ED395');
        $this->addSql('DROP INDEX UNIQ_B8EE38725E237E06 ON club');
        $this->addSql('DROP INDEX IDX_B8EE3872A76ED395 ON club');
        $this->addSql('ALTER TABLE club ADD description LONGTEXT NOT NULL COLLATE utf8mb4_unicode_ci, DROP user_id, DROP email, CHANGE address address VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, CHANGE city city VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, CHANGE facebook facebook VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, CHANGE instagram instagram VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci, CHANGE twitter twitter VARCHAR(255) NOT NULL COLLATE utf8mb4_unicode_ci');
        $this->addSql('ALTER TABLE user CHANGE name name VARCHAR(50) NOT NULL COLLATE utf8mb4_unicode_ci, CHANGE last_name last_name VARCHAR(50) NOT NULL COLLATE utf8mb4_unicode_ci');
    }
}
