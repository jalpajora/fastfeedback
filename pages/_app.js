import { ChakraProvider } from '@chakra-ui/react';
import { ProvideAuth } from '@/library/auth';
import theme from 'styles/theme';

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <ProvideAuth>
        <Component {...pageProps} />
      </ProvideAuth>
    </ChakraProvider>
  );
};

export default App;
