#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/913efac7c6144756597303f8131576d0f07ca539dd60f92778bbba363a2a6137/contract';
import endContract from '../../snapshots/913efac7c6144756597303f8131576d0f07ca539dd60f92778bbba363a2a6137/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/a51b4833fdaffe730572670ccc27dd89af7e0726ab3de7f428d21702d687cc15/contract';
import startContract from '../../snapshots/a51b4833fdaffe730572670ccc27dd89af7e0726ab3de7f428d21702d687cc15/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropTable({ schema: 'public', table: 'Post' }),
      this.dropColumn({ schema: 'public', table: 'User', column: 'username' }),
      this.addColumnWithTemporaryDefault({
        schema: 'public',
        table: 'User',
        column: 'gender',
        type: 'text',
        temporaryDefault: sql`''`,
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
