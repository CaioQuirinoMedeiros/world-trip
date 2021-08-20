import { ChakraProvider } from '@chakra-ui/react'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'

import '../styles/global.css'
import { theme } from '../styles/theme'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
