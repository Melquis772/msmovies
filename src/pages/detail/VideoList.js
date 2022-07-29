import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import apiConfig from '../../api/apiConfig';

export const VideoList = (props) => {

    const { category } = useParams();

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const getVideos = async () => {
            const response = await (await axios.get(`${apiConfig.baseUrl}/videos/${category}/${props.id}`)).data
            const data = response.results.slice(0, 5);
            setVideos(data)
        }

        getVideos();

    }, [category, props.id])

    return (

        <>
            {
                videos.map((item, index) => (
                    <Video key={index} item={item} />
                ))
            }
        </>

    )
}

const Video = (props) => {

    const item = props.item;

    const iframeRef = useRef(null);

    useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
        iframeRef.current.setAttribute('height', height);
    }, [])


    return (
        <div className="video">
            <div className="video_title">
                <h2>{item.name}</h2>
            </div>
            <iframe
                src={`https://www.youtube.com/embed/${item.key}`}
                ref={iframeRef}
                width="100%"
                title="video"
            >
            </iframe>
        </div>
    )
}
