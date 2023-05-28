import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameQuantityToStockQuantityInProduct1682380074651
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('products', 'quantity', 'stock_quantity');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('products', 'stock_quantity', 'quantity');
  }
}
