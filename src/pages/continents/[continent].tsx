import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import {
  Box,
  Image,
  Center,
  Stack,
  Heading,
  Text,
  Flex,
  IconButton,
  Grid,
  GridItem,
  useBreakpointValue,
  Icon
} from '@chakra-ui/react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import { Continent, continents } from '..'

interface ContinentProps {
  continent: Continent
}

export default function ContinentPage(props: ContinentProps) {
  const { continent } = props

  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <Box>
      <Flex
        as='header'
        bg='gray.50'
        w='100%'
        h='24'
        justifyContent='space-between'
        alignItems='center'
      >
        <IconButton
          aria-label='Voltar'
          onClick={handleGoBack}
          height='100%'
          w={20}
          variant='unstyled'
          icon={<Icon as={FaChevronLeft} w='6' h='6' />}
        />
        <Image src='/images/logo.png' alt='WorldTrip logo' h={45} />
        <Box w={20} />
      </Flex>

      <Flex
        w='100%'
        px='8'
        py='12'
        h={[150, 250, 500]}
        alignItems={['center', 'center', 'flex-end']}
        justifyContent={['center', 'center', 'flex-start']}
        backgroundImage={`/images/countries/${continent.imagePathname}`}
      >
        <Heading
          color='white'
          mb='4'
          fontSize={['3xl', '4xl', '5xl']}
          textAlign={['center', 'center', 'left']}
          flex={1}
          maxW={1240}
          margin='0 auto'
        >
          {continent.name}
        </Heading>
      </Flex>

      <Box maxW={1240} py='12' mx='6'>
        <Stack direction={['column', 'column', 'row']} spacing='8' mb='20'>
          <Text
            as='p'
            lineHeight='tall'
            fontSize='lg'
            textAlign='justify'
            flex={2}
          >
            {continent.longDescription}
          </Text>

          <Stack
            justifyContent={['space-evenly', 'space-evenly', 'space-between']}
            direction='row'
            flex={1}
            spacing='4'
          >
            <Box
              display='flex'
              flexDir='column'
              alignItems={['', '', 'center']}
            >
              <Text color='yellow.400' fontWeight='semibold' fontSize='5xl'>
                {continent.data.numberOfCountries}
              </Text>
              <Text fontSize='md' fontWeight='semibold'>
                países
              </Text>
            </Box>
            <Box
              display='flex'
              flexDir='column'
              alignItems={['', '', 'center']}
            >
              <Text color='yellow.400' fontWeight='semibold' fontSize='5xl'>
                {continent.data.numberOfLanguages}
              </Text>
              <Text fontSize='md' fontWeight='semibold'>
                línguas
              </Text>
            </Box>
            <Box
              display='flex'
              flexDir='column'
              alignItems={['', '', 'center']}
            >
              <Text color='yellow.400' fontWeight='semibold' fontSize='5xl'>
                {continent.data.cities100.length}
              </Text>
              <Text fontSize='md' fontWeight='semibold' whiteSpace='nowrap'>
                cidades +100
              </Text>
            </Box>
          </Stack>
        </Stack>

        <Text fontWeight='medium' fontSize='4xl' mb='8'>
          Cidades +100
        </Text>
        <Grid
          gap='8'
          templateColumns={[
            'repeat(1, 1fr)',
            'repeat(1, 1fr)',
            'repeat(3, 1fr)',
            'repeat(4, 1fr)'
          ]}
        >
          {continent.data.cities100.map((city) => {
            return (
              <Box
                key={city.cityName}
                h={250}
                borderWidth={1}
                borderRadius='md'
                borderColor='yellow.400'
                display='flex'
                flexDir='column'
              >
                <Image
                  src={`/images/cities/${city.imagePathname}`}
                  alt={city.cityName}
                  height={'170px'}
                />
                <Box borderTopWidth={0} height='100%' p='4' dir='row'>
                  <Box>
                    <Text fontSize='md'>{city.cityName}</Text>
                    <Text fontSize='smaller' color='gray.400'>
                      {city.countryName}
                    </Text>
                  </Box>
                </Box>
              </Box>
            )
          })}
        </Grid>
      </Box>
    </Box>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<ContinentProps> = ({ params }) => {
  const continent = continents.find((itemContinent) => {
    return itemContinent.slug === params.continent
  })

  if (!continent) return { notFound: true }

  return {
    props: {
      continent: continent
    }
  }
}
