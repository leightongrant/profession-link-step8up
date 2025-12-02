import Stack from 'react-bootstrap/esm/Stack'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/esm/Button'
import Card from 'react-bootstrap/esm/Card'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api as axios } from '../../api.js'

export const About = () => {

  const [profilePictures, setProfilePictures] = useState([]);
  const [error, setError] = useState(false);
  const descriptionList = [
    'Responsible for the development and day to day management of ProfessionalLink.',
    'Has a degree in business studies and has worked within the legal sector for the last 8 years.',
    'Founder of the website ProfessionalLink. Has worked on the backend and frontend of the application.'
    
  ];
  
  const getPictures = async () => {
    try {
      const profileRes = await axios.get('https://randomuser.me/api/?results=3');
      const data = profileRes.data;
      setProfilePictures(data.results);
      setError(false);
    } catch {
      setError(true);
    }

  }
  useEffect(() => {
  	getPictures();
  }, []);

  return (
    <Stack className="about-page py-5" as="main">
      <Container>
        <h2 className="text-center mb-5">About</h2>
        <Row>
          <div className="shadow-lg p-4 mb-5 mt-3 bg-white rounded">
            <Col className="text-center text-justify mb-3">About Us</Col>
            <Col>
              <div> At ProfessionalLink, we empower lawyers and accountants to showcase their expertise, build trust, and connect with clients who need their services most. Our platform is designed to highlight professional skills, credentials, and achievements while giving clients the chance to share authentic reviews.
                  By combining transparent feedback with tailored profiles, we make it easy for professionals to stand out and for clients to make confident, informed choices. Whether you’re a seasoned lawyer or a rising accountant, ProfessionalLink helps you grow your reputation and expand your reach in a competitive marketplace.
              </div>
            </Col>
          <Col>
            <div className="mt-3 text-center">
              <Link to='/signup'><button className="btn btn-primary">Create an account with us today!</button></Link>
            </div>
          </Col>
          </div>
        </Row>
        <Row>
          <div className="shadow-lg p-4 mb-5 mt-3 bg-white rounded">
            <Col className='text-center'> Our Team </Col>
              { !error ? profilePictures.map((x, index) => (
                          <Col className="mt-5" key={index}>
                              <div className='mb-2 ml-5'>{x.name.first + ' ' + x.name.last}</div>
                              <img className="m-3 shadow rounded" src={x.picture.large} alt="image of employee" loading="lazy"/>
                              <div className='d-inline'>{descriptionList[index]}</div>
                          </Col>
              )) : <Col className="text-danger text-center mt-3">Error showing employee images</Col> }
          </div>
        </Row>
      </Container>
    </Stack>
  )
}
