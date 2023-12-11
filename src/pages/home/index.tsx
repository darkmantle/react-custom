import React from 'react'
import Router from '../../framework/router';
import './index.scss';

const Home = () => (
    <>
    <h1>Home</h1>
    <div className="title" onClick={() => Router.navigate('/about')}>go</div>
    </>
)

export default Home;