#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/1b2d022d4b632ef8ce9d6a95a9deaa4717cbb85e354ca94d59e3218352029507/contract';
import endContract from '../../snapshots/1b2d022d4b632ef8ce9d6a95a9deaa4717cbb85e354ca94d59e3218352029507/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/913efac7c6144756597303f8131576d0f07ca539dd60f92778bbba363a2a6137/contract';
import startContract from '../../snapshots/913efac7c6144756597303f8131576d0f07ca539dd60f92778bbba363a2a6137/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.setNotNull({ schema: 'public', table: 'User', column: 'name' }),
      this.addColumnWithTemporaryDefault({
        schema: 'public',
        table: 'User',
        column: 'password',
        type: 'text',
        temporaryDefault: sql`''`,
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
