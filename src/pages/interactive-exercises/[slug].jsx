/* eslint-disable react/prop-types */
import { Box, useColorMode } from '@chakra-ui/react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getConfig from 'next/config';
import axios from 'axios';
import Heading from '../../common/components/Heading';
import Link from '../../common/components/NextChakraLink';
// import Text from '../../common/components/Text';

const { publicRuntimeConfig } = getConfig();

const ExerciseSlug = ({ data }) => {
  console.log('EXERCISE_DATA:', data);
  const { colorMode } = useColorMode();

  return (
    <Box
      height="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      margin={{ base: '4% 4% 0 4%', md: '4% 10% 0 10%' }}
    >
      <Head>
        <title>{`${data.title} - ${data.difficulty}`}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link
        href="/interactive-exercises"
        display="inline-block"
        // maxW="330px"
        w="full"
        borderRadius="15px"
      >
        {'< Back to Projects'}
      </Link>

      <Box flex="1" margin={{ base: '4% 4% 0 4%', md: '4% 10% 0 10%' }}>
        <Heading
          as="h1"
          size="xl"
          fontWeight="700"
          color={colorMode === 'light' ? 'gray.600' : 'gray.300'}
          textTransform="uppercase"
        >
          {data.title}
        </Heading>

        <Link
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          size="12px"
          color={colorMode === 'light' ? 'blue.600' : 'blue.300'}
        >
          {data.url}
        </Link>
      </Box>
    </Box>
  );
};

// export const getStaticPaths = async () => {
export const getStaticPaths = async () => {
  const data = await axios
    .get(`${publicRuntimeConfig.BREATHECODE_HOST}/registry/asset?type=exercise&big=true`)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  const paths = data.map((res) => {
    console.log('RESPONSE_PATH', res.slug);
    return {
      params: { slug: res.slug },
    };
  });
  return {
    fallback: false,
    paths,
  };
};

// export const getStaticProps = async ({ params }) => {
export const getStaticProps = async ({ params, locale }) => {
  // const { slug } = params;
  console.log('PARAMS:::', params);

  const results = await axios
    .get(`${publicRuntimeConfig.BREATHECODE_HOST}/registry/asset?type=exercise&big=true`)
    .then((res) => res.json())
    .catch((err) => console.log(err));

  // console.log(
  //   'results:::::::',
  //   results.find((el) => el.slug === slug),
  // );

  // const exercise = results.find((el) => el.Slug === slug);
  // console.log('EXERCISE:::', exercise);
  return {
    props: {
      // props: { exercise, ... },
      fallback: false,
      ...(await serverSideTranslations(locale, ['navbar', 'footer'])),
      data: results[0],
    },
  };
};

export default ExerciseSlug;
