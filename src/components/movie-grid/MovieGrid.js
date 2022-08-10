import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { TailSpin } from 'react-loader-spinner';


import { category } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import Button, { OutlineButton } from '../button/Button';
import { Input } from '../input/Input';

import { MovieCard } from '../movie-card/MovieCard';

export const MovieGrid = (props) => {

    const { keyword } = useParams();

    const [items, setItems] = useState([]);

    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(0);

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const getList = async () => {
            let response = null;

            if (keyword === undefined) {
                //const params = {};
                switch (props.category) {
                    case category.movie:

                        response = await (await axios.get(`${apiConfig.baseUrl}/movies-list`)).data
                        break;
                    default:

                        response = await (await axios.get(`${apiConfig.baseUrl}/tv-list`)).data
                }
            } else {
                const params = { query: keyword }

                props.category === 'movie' ?
                    response = await (await axios.get(`${apiConfig.baseUrl}/movies-keyword/${params.query}`)).data
                    : response = await (await axios.get(`${apiConfig.baseUrl}/tv-keyword/${params.query}`)).data

            }

            setItems(response.results);
            setTotalPages(response.total_pages);
            setIsLoading(false)
        }

        getList();

    }, [props.category, keyword])

    const loadMore = async () => {

        let response = null;

        if (keyword === undefined) {
            const params = { page: page + 1 };
            switch (props.category) {
                case category.movie:
                    response = await (await axios.get(`${apiConfig.baseUrl}/load-movies/${params.page}`)).data

                    break;
                default:
                    response = await (await axios.get(`${apiConfig.baseUrl}/load-tv/${params.page}`)).data
            }
        } else {
            const params = {
                page: page + 1,
                query: keyword
            }
            props.category === 'movie' ?
                response = await (await axios.get(`${apiConfig.baseUrl}/load-movies-keyword/${params.query}/${params.page}`)).data
                : response = await (await axios.get(`${apiConfig.baseUrl}/load-movies-keyword/${params.query}/${params.page}`)).data
        }

        setItems([...items, ...response.results]);
        setPage(page + 1);
    }

    return (
        <>
            <div className="section">
                <MovieSearch category={props.category} keyword={keyword} />
            </div>
            {isLoading ? (
                <div className="tailspin_comp">
                    <TailSpin color="#ff0000" height={80} width={80} />
                </div>
            ) : (
                <>


                    <div className="movie-grid">
                        {
                            items.map((item, index) => <MovieCard category={props.category} item={item} key={index} />)
                        }
                    </div>

                    {
                        page < totalPages ? (
                            <div className="movie-grid_loadmore">
                                <OutlineButton className="small" onClick={loadMore}>Load more</OutlineButton>
                            </div>
                        ) : null
                    }
                </>

            )}

        </>
    )
}

const MovieSearch = (props) => {


    const navigate = useNavigate();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(
        () => {
            if (keyword.trim().length > 0) {
                navigate(`/${category[props.category]}/search/${keyword}`);
            }
        }, [keyword, props.category, navigate]
    );

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();

            if (e.keyCode === 13) {
                goToSearch();
            }
        }
        document.addEventListener('keyup', enterEvent);

        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, goToSearch])


    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />

            <Button className="small" onClick={goToSearch}>Search</Button>
        </div>
    )
}
