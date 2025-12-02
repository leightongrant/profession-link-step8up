import './HomePage.css'
import Stack from 'react-bootstrap/esm/Stack'
import { Hero } from './Hero'
import { Profiles } from '../profiles/Profiles'
import { CallToAction } from './CallToAction'
export const Homepage = () => {
  return (
    <Stack as="main">
      <Hero />
      <Profiles title="Featured Profiles" limit={4} />
      <CallToAction />
    </Stack>
  )
}
