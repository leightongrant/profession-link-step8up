import './HomePage.css'
import Stack from 'react-bootstrap/esm/Stack'
import { Hero } from './Hero'
import { RecentProfiles } from './RecentProfiles'
import { Profiles } from '../profiles/Profiles'
// import Container from 'react-bootstrap/esm/Container'
//import { Link } from 'react-router-dom'

export const Homepage = () => {
  return (
    <Stack as="main">
      <Hero />
      <Profiles />
    </Stack>
  )
}
