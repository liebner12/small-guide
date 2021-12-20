import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react';

export type Providers = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};
