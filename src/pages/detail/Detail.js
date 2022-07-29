import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import '../../App.css'

import { CastList } from './CastList';
import { VideoList } from './VideoList';
import MovieList from '../../components/movie-list/MovieList';

import apiConfig from '../../api/apiConfig';


export const Detail = () => {

    const { category, id } = useParams();

    const [item, setItem] = useState(null);

    useEffect(() => {

        const getDetail = async () => {
            const response = await (await axios.get(`${apiConfig.baseUrl}/detail/${category}/${id}`)).data
            setItem(response);
            window.scrollTo(0, 0);
        }
        getDetail();

    }, [category, id])


    return (
        <>
            {
                item && (
                    <>

                        <div className="banner"
                            style={{ backgroundImage: `url(${apiConfig.originalImage(item.backfrop_path || item.poster_path)})` }}>

                        </div>

                        <div className="movie-content container">

                            <div className="movie-content_poster">
                                <div className="movie-content_poster_img"
                                    style={{ backgroundImage: `url(${apiConfig.originalImage(item.backfrop_path || item.poster_path)})` }}>

                                </div>
                            </div>

                            <div className="movie-content_info">

                                <h1 className="title">
                                    {item.title || item.name}
                                </h1>

                                <div className="genres">
                                    {
                                        item.genres && item.genres.slice(0, 5).map((genre, index) => (
                                            <span key={index} className="genres_item">{genre.name}</span>
                                        ))
                                    }
                                </div>

                                <p className="overview">{item.overview}</p>

                                <div className="cast">
                                    <div className="section_header">
                                        <h2>Casts</h2>
                                    </div>
                                    <CastList id={item.id} />
                                </div>

                            </div>

                        </div>

                        <div className="container">

                            <div className="section">
                                <VideoList id={item.id} />
                            </div>

                            <div className="section">
                                <div className="section_header">
                                    <h2>Similar</h2>
                                </div>
                                <MovieList category={category} type="similar" id={item.id} />
                            </div>

                        </div>

                    </>
                )
            }
        </>
    )
}
