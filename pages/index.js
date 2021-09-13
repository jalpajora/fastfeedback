import Head from 'next/head';
import { Button, Heading, Text, Code } from '@chakra-ui/react';

import { useAuth } from 'library/auth';

const Home = () => {
  const auth = useAuth();

  return (
    <div>
      <Head>
        <title>Fast Feedback</title>
      </Head>

      <main>
        <Heading>Fast Feedback</Heading>

        {auth?.user?.email && (
          <>
            <Text>
              Current user: <Code>{auth?.user?.email}</Code>
            </Text>
            <Button onClick={(e) => auth.appSignOut()}>Sign Out</Button>
          </>
        )}

        {!auth?.user?.email && (
          <Button onClick={(e) => auth.appSigninWithGitHub()}>Sign In</Button>
        )}
      </main>
    </div>
  );
};

export default Home;
