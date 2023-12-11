// src/App.tsx
import * as React from 'react'
import ReactDOM from 'react-dom/client';
import routes from './routes';
import Router from './framework/router';
import "./App.scss";

// Set the app routes
Router.setRoutes(routes);

const App = () => {
  let matchedRoute = Router.matchRoute();

  if (matchedRoute) {
    const { Component } = matchedRoute;

    // Return the routes component
    return <Component />;
  } else {
    // URL not found
    return <h1>Route Not Found</h1>
  }

}

// Mount component 
const root = ReactDOM.createRoot(
  document.getElementById('root') as Element
);
root.render(<App />);
