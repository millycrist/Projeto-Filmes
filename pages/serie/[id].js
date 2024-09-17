import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import Header from '../../components/Header';

const SerieDetalhes = () => {
  const router = useRouter();
  const { id } = router.query;
  const [serie, setSerie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchSerie = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}`,
            {
              params: {
                language: 'pt-BR',
                api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
              },
            }
          );
          setSerie(response.data);
        } catch (error) {
          console.error('Failed to fetch series details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchSerie();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!serie) return <div>Series not found.</div>;

  return (
    <>
      <Container>
        <h1 className="my-4">{serie.name}</h1>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                alt={serie.name}
              />
            </Card>
          </Col>
          <Col md={8}>
            <Card>
              <Card.Body>
                <Card.Title>{serie.name}</Card.Title>
                <Card.Text>
                  <strong>Data de Lançamento:</strong> {serie.first_air_date}
                  <br />
                  <strong>Nota:</strong> {serie.vote_average}
                  <br />
                  <strong>Temporadas:</strong> {serie.number_of_seasons}
                  <br />
                  <strong>Episódios:</strong> {serie.number_of_episodes}
                  <br />
                  <strong>Gêneros:</strong> {serie.genres.map((genre) => genre.name).join(', ')}
                  <br />
                  <strong>Sinopse:</strong> {serie.overview}
                </Card.Text>
                <Button variant="primary" onClick={() => router.push('/')}>
                  Voltar à Página Inicial
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SerieDetalhes;
