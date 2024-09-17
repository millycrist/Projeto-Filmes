import { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

const TvHoje = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchSeries = async () => {
      const response = await axios.get('/tv/airing_today');
      setSeries(response.data.results);
    };

    fetchSeries();
  }, []);

  return (
    <Container>
      <h1>Séries na TV Hoje</h1>
      <Row>
        {series.map((serie) => (
          <Col md={4} key={serie.id}>
            <Card className="mb-4">
              <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} />
              <Card.Body>
                <Card.Title>{serie.name}</Card.Title>
                <Card.Text>
                  Lançamento: {serie.first_air_date}
                  <br />
                  Nota: {serie.vote_average}
                </Card.Text>
                <Link href={`/serie/${serie.id}`}>
                  <Button variant="primary">Ver Detalhes</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TvHoje;
