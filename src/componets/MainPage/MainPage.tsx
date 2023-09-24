import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../App/App.module.scss';
import MovieList from '../MovieList/MovieList';
import '../../Main.css';
import MovieHeader from '../MovieHeader/MovieHeader';
import { useAppSelector } from '../../hooks/redux';
import { useAuthApiQuery } from '../../store/MovieApi';
import { useNavigate } from 'react-router-dom';

export type movieType = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

function MainPage() {
  const navigate = useNavigate();
  const MovieData = useAppSelector((state) => state.sliceMovie.films);
  const { data, refetch, isFetching } = useAuthApiQuery('');

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (isFetching === false) {
      if (!data) {
        navigate('/login');
      }
    }
  }, [isFetching, data, navigate]);

  return (
    <>
      <div className={styles.container}>
        <div className="container-fluid movie-app">
          <div>
            <MovieHeader />
          </div>
          <div className="row">
            <MovieList movie={MovieData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;