import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import apiConfig from '../../api/apiConfig';
import axios from 'axios';

export const CastList = (props) => {

    const { category } = useParams();

    const [casts, setCasts] = useState([]);

    useEffect(() => {
        const getCredits = async () => {
            const response = await (await axios.get(`${apiConfig.baseUrl}/credits/${category}/${props.id}`)).data
            const data = response.cast.slice(0, 5);
            setCasts(data)
        }

        getCredits();

    }, [category, props.id])


    return (
        <div className="casts">
            {
                casts.map((item, index) => (
                    <div key={index} className="casts_item">
                        <div className="casts_item_img" style={{ backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})` }}>

                        </div>
                        <p className="casts_item_name">{item.name}</p>
                    </div>
                ))
            }
        </div>
    )
}
