import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import Header from '../components/Header';

const Home = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularSeries = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/tv/popular',
          {
            params: {
              language: 'pt-BR',
              api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
            },
          }
        );
        setSeries(response.data.results);
      } catch (error) {
        console.error('Failed to fetch series:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularSeries();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Container>
        <h1 className="my-4">Séries Populares</h1>
        <Row>
          {series.map((serie) => (
            <Col md={4} lg={3} key={serie.id} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                  alt={serie.name}
                />
                <Card.Body>
                  <Card.Title>{serie.name}</Card.Title>
                  <Card.Text>
                    <strong>Lançamento:</strong> {serie.first_air_date}
                    <br />
                    <strong>Nota:</strong> {serie.vote_average}
                  </Card.Text>
                  <Link href={`/serie/${serie.id}`} passHref>
                    <Button variant="primary">Ver Detalhes</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
