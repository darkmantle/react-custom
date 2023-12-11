import React from 'react'
import Router from '../../framework/router';

const About = () => (
    <h1 onClick={() => Router.goBack()}>About</h1>
)

export default About;