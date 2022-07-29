import React from 'react';

import background from '../../assets/footer-bg.jpg'

export const PageHeader = (props) => {
    return (
        <div className="page-header" style={{ backgroundImage: `url(${background})` }}>
            <h2>{props.children}</h2>
        </div>
    )
}
