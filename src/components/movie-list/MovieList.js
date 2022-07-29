import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import '../../App.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';

import { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import { MovieCard } from '../movie-card/MovieCard';


function MovieList(props) {

    SwiperCore.use([Autoplay])

    const [items, setItems] = useState([])

    useEffect(() => {
        const getList = async () => {
            let response = null;
            //const params = {};

            if (props.type !== 'similar') {
                switch (props.category) {
                    case category.movie:
                        response = await (await axios.get(`${apiConfig.baseUrl}/movies-type/${props.type}`)).data
                        break;
                    default:
                        response = await (await axios.get(`${apiConfig.baseUrl}/tv-type/${props.type}`)).data
                }
            } else {

                response = await (await axios.get(`${apiConfig.baseUrl}/movies-similar/${props.category}/${props.id}`)).data

            }
            setItems(response.results)
        }
        getList();
    }, [])


    return (

        <div className="movie-list">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
                autoplay={{ delay: 3000 }}
            >
                {
                    items.map((item, index) => (
                        <SwiperSlide key={index}>
                            <MovieCard item={item} category={props.category} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>

    )
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default MovieList
