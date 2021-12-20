import { AiOutlineGoogle } from 'react-icons/ai';
import { Providers } from '../../logic/Types/providers';
import Button from '../units/Button/Button';
import { LiteralUnion, signIn as signIntoProvider } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
type SignIn = {
  providers: Providers;
};

const SignIn = ({ providers }: SignIn) => {
  return (
    <>
      {providers &&
        Object.values(providers).map((provider, index) => (
          <div key={index} className="mt-auto">
            {provider && (
              <Button
                onClick={() =>
                  signIntoProvider(
                    provider.id as unknown as
                      | LiteralUnion<BuiltInProviderType, string>
                      | undefined,
                    {
                      callbackUrl: '/',
                    }
                  )
                }
                size="big"
                className="w-full justify-center"
                icon={<AiOutlineGoogle className="h-8 w-8 mr-2" />}
              >
                <p>Sign in with {provider?.name}</p>
              </Button>
            )}
          </div>
        ))}
    </>
  );
};

export default SignIn;
