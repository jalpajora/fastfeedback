import { Box } from '@chakra-ui/layout';
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { useRef, useState } from 'react';

import Feedback from '@/components/Feedback';
import { useAuth } from '@/library/auth';
import { createFeedback } from '@/library/db';
import { getAllFeedback, getAllSites } from '@/library/db-admin';

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: feedback
    }
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString()
    }
  }));

  return {
    paths: paths,
    fallback: false
  };
}

const SiteFeedback = ({ initialFeedback }) => {
  const auth = useAuth();
  const router = useRouter();
  const inputEl = useRef();
  const [allFeedback, setAllFeedback] = useState(initialFeedback);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(auth);
    const newFeedback = {
      author: auth.user.displayName,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.providerData[0].providerId,
      status: 'pending'
    };

    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      <Box as="form" onSubmit={onSubmit}>
        <FormControl my={8}>
          <FormLabel htmlFor="comment">Comment</FormLabel>
          <Input ref={inputEl} type="comment" id="comment" />
          <Button mt={2} type="submit" fontWeight="medium">
            Add Comment
          </Button>
        </FormControl>
      </Box>
      {allFeedback.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Box>
  );
};

export default SiteFeedback;
