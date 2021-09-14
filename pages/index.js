import Head from 'next/head';
import { Button, Flex, Text, Code, Icon } from '@chakra-ui/react';
import theme from 'styles/theme';
import { useAuth } from '@/library/auth';
import Logo from '@/components/mini/Logo';

const Home = () => {
  const auth = useAuth();

  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
    >
      <Head>
        <title>Fast Feedback</title>
      </Head>

      <Logo {...theme?.icon?.logo} />

      {auth.user ? (
        <Button as="a" href="/dashboard">
          View Dashboard
        </Button>
      ) : (
        <Button mt={4} size="sm" onClick={(e) => auth.appSigninWithGitHub()}>
          Sign In
        </Button>
      )}
    </Flex>
  );
};

export default Home;
