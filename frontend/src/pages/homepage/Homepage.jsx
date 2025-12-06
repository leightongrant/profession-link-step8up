import './HomePage.css'
import Stack from 'react-bootstrap/esm/Stack'
import { Hero } from './Hero'
import { CallToAction } from './CallToAction'
import { lazy, Suspense } from 'react'
import { LoadingPage } from '../loading/LoadingPage'

// Lazy loaded
const Profiles = lazy(() => import('../profiles/Profiles'))

export const Homepage = () => {
  return (
    <Stack as="main">
      <Hero />
      <Suspense fallback={<LoadingPage />}>
        <Profiles title="Featured Profiles" limit={4} />
      </Suspense>
      <CallToAction />
    </Stack>
  )
}
