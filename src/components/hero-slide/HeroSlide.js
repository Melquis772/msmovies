import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'

import axios from 'axios';

import '../../App.css'

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import apiConfig from '../../api/apiConfig';

import Button, { OutlineButton } from '../button/Button'

import Modal, { ModalContent } from '../modal/Modal';

export default function HeroSlide() {

    SwiperCore.use([Autoplay]);

    const [movieItems, setMovieItems] = useState([]);


    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 }

            try {

                const response = await axios.get(`${apiConfig.baseUrl}/hero-slide/${params.page}`)
                const data = response.data
                setMovieItems(data.results.slice(0, 7))

            } catch (error) {
                console.log(error.message)
            }
        }

        getMovies();

    }, [])


    return (
        <div className="hero-slide">

            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
            //autoplay={{ delay: 3000 }}
            >
                {
                    movieItems.map((item, index) => (
                        <SwiperSlide key={index}>
                            {({ isActive }) => (
                                <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                            )}
                        </SwiperSlide>
                    ))
                }

            </Swiper>

            {
                movieItems.map((item, index) => <TrailerModal key={index} item={item} />)
            }


        </div>
    )

}

const HeroSlideItem = (props) => {

    let navigate = useNavigate();

    const item = props.item;

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);


    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);

        const response = await axios.get(`${apiConfig.baseUrl}/videos-list/${item.id}`)
        const videos = response.data

        if (videos.results.length > 0) {
            const videoSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('.modal_content > iframe').setAttribute('src', videoSrc);
        } else {
            modal.querySelector('.modal_content').innerHTML = 'No trailer';
        }

        modal.classList.toggle('active')
    }

    return (
        <div
            className={`hero-slide_item ${props.className}`}
            style={{ backgroundImage: `url(${background})` }}
        >

            <div className="hero-slide_item_content container">

                <div className="hero-slide_item_content_info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>

                    <div className="btns">
                        <Button onClick={() => navigate('/movie/' + item.id)}>
                            Watch now
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Watch trailer
                        </OutlineButton>
                    </div>

                </div>

                <div className="hero-slide-item_content_poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>

            </div>

        </div>
    )

}

const TrailerModal = (props) => {
    const item = props.item;

    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    )
}



