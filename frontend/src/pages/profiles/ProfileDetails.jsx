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
import { ReviewForm } from '../../components/forms/ReviewForm'
import { useState } from 'react'

const ServiceCard = ({ service, refetch }) => {
  const [show, setShow] = useState(false)
  const [showReview, setShowReview] = useState(false)

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

        {!showReview && (
          <Card.Link
            className="btn btn-secondary"
            onClick={() => setShowReview(true)}
          >
            Review This Service
          </Card.Link>
        )}
        {showReview && <ReviewForm setShow={setShowReview} />}
      </Card.Body>
    </Card>
  )
}
const ReviewCard = ({ review }) => {
  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title className="mb-4">{review.title}</Card.Title>
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
  if (!id) return <NotFound />

  const { loading, data, error, refetch } = useFetchUsers(id[0])

  if (loading) return <LoadingPage />
  if (error) return <ErrorPage />
  const user = { ...data }
  const profile = data.Profile
  const services = data.Profile.Services
  const reviews = []
  services.forEach((service) => {
    service.Reviews.forEach((review) => {
      reviews.push({ ...review, title: service.title })
    })
  })

  return (
    <Stack as="main" className="bg-light-subtle">
      <Container className="py-5">
        <Row>
          <Col md={4}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Image
                  src={`https://i.pravatar.cc/150?u=${user.email}`}
                  roundedCircle
                  className="mb-3"
                  style={{ width: '150px', height: '150px' }}
                />
                <h3>{user.name}</h3>
                <p className="text-muted text-capitalize">{user.role}</p>
                <hr />
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Location:</strong> {profile.location}
                </p>
                <p>
                  <strong>Avg. Rating:</strong> {profile.rating_avg}{' '}
                  <MdStarRate />
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title as="h4">About</Card.Title>
                <p>
                  <strong>Specialization:</strong> {profile.specialization}
                </p>
                <p>
                  <strong>Experience:</strong> {profile.experience_years} years
                </p>
                <hr />
                <Card.Title as="h4">Bio</Card.Title>
                <p>{profile.bio}</p>
              </Card.Body>
            </Card>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title as="h4">Services</Card.Title>
                <Stack className="gap-3 mt-3">
                  {services.map((service) => (
                    <ServiceCard
                      service={service}
                      key={service.service_id}
                      refetch={refetch}
                    />
                  ))}
                </Stack>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <h3 className="my-5 text-center">What Clients Are Saying</h3>
        <Row className="g-4">
          {reviews &&
            reviews.map((review) => {
              return (
                <Col md={6} lg={4} key={review.review_id}>
                  <ReviewCard review={review} />
                </Col>
              )
            })}
        </Row>
      </Container>
    </Stack>
  )
}
