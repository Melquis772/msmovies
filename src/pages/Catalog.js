import React from 'react';
import { useParams } from 'react-router-dom';

import { PageHeader } from '../components/page-header/PageHeader';
import { MovieGrid } from '../components/movie-grid/MovieGrid';

import { category as cate } from '../api/tmdbApi';

export const Catalog = () => {

    const { category } = useParams();

    return (
        <>
            <PageHeader>

                {category === cate.movie ? 'Movies' : 'TV Series'}

            </PageHeader>
            <div className="container">
                <div className="section">
                    <MovieGrid category={category} />
                </div>
            </div>
        </>
    )
}
