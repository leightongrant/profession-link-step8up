import Stack from 'react-bootstrap/esm/Stack'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Image from 'react-bootstrap/esm/Image'
import { MdStarRate } from 'react-icons/md'
import Card from 'react-bootstrap/esm/Card'
import { FaQuoteLeft } from 'react-icons/fa'
import { useFetchUsers } from '../../hooks/useFetchUsers'
import { NotFound } from '../404/NotFound'
import { useParams } from 'react-router-dom'
import { ErrorPage } from '../error/ErrorPage'
import { LoadingPage } from '../loading/LoadingPage'
import { BookingForm } from '../../components/forms/BookingForm'
import { useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore'

const ServiceCard = ({ service, refetch }) => {
  const [show, setShow] = useState(false)
  const user = useAuthStore((state) => state.user)
  return (
    <Card className="bg-dark-subtle">
      <Card.Body>
        <Card.Title>{service.title}</Card.Title>
        <Card.Text>{service.description}</Card.Text>
        <Card.Text>{service.price_range}</Card.Text>
        <Card.Text className="fw-semibold">{service.availability}</Card.Text>
        {!show && (
          <Card.Link className="btn btn-primary" onClick={() => setShow(true)}>
            Book This Service
          </Card.Link>
        )}
        {show && (
          <BookingForm
            setShow={setShow}
            service_id={service.service_id}
            refetch={refetch}
          />
        )}
      </Card.Body>
    </Card>
  )
}
const ReviewCard = ({ review }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <FaQuoteLeft className="fs-2 text-secondary" />
        <Card.Text>{review.comment}</Card.Text>
        <Card.Text>
          {review.rating} <MdStarRate />
        </Card.Text>
        <Card.Text>By: {review.reviewer.name}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export const ProfileDetails = () => {
  const { user_id } = useParams()

  const id = user_id.match(/\d+$/)
  if (!id) {
    return <NotFound />
  }
  const { loading, data, error, refetch } = useFetchUsers(id[0])

  if (loading) return <LoadingPage />
  if (error) return <ErrorPage />
  const user = { ...data }
  const profile = data.Profile
  const services = data.Profile.Services
  const reviews = []
  services.forEach((service) => {
    service.Reviews.forEach((review) => {
      reviews.push(review)
    })
  })

  return (
    <Stack as="main">
      <Container className="py-5 border-bottom">
        <Row>
          <Col md={2}>
            <Image
              src={`https://i.pravatar.cc/150?u=${user.email}`}
              className="img-fluid w-100"
            />
          </Col>
          <Col md={6}>
            <Stack>
              <Stack>
                <h3>{user.name}</h3>
                <p className="text-capitalize">{user.role}</p>
                <p>Email: {user.email} </p>
                <p>{profile.location}</p>
              </Stack>
              <Stack>
                <h4>About</h4>
                <p>Specialization: {profile.specialization}</p>
                <p>Experience: {profile.experience_years} years</p>
              </Stack>
              <Stack>
                <h4>Bio</h4>
                <p>{profile.bio}</p>
              </Stack>
              <Stack>
                <h4>Average Rating</h4>
                <p>
                  {profile.rating_avg} <MdStarRate />
                </p>
              </Stack>
            </Stack>
          </Col>
          <Col md={4}>
            <Stack className="gap-3">
              <h3>Services</h3>
              {services.map((service) => {
                return (
                  <ServiceCard
                    service={service}
                    key={service.service_id}
                    refetch={refetch}
                  />
                )
              })}
            </Stack>
          </Col>
        </Row>
      </Container>
      <Container className="py-5">
        <h3 className="mb-5">Reviews</h3>
        <Row>
          {reviews &&
            reviews.map((review) => {
              return (
                <Col key={review.review_id}>
                  <ReviewCard review={review} />
                </Col>
              )
            })}
        </Row>
      </Container>
    </Stack>
  )
}
