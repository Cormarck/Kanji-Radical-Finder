import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AddToDatabase from './AddToDatabase';
import PageNotFound from './404Page';
import {
    createBrowserRouter,
    RouterProvider,
    route,
}  from "react-router-dom";

import ErrorBoundary from './components/errorComponent';

const router = createBrowserRouter ([
  {
    path: "/",
    element: <App/>
  }
  ,
  {
    path: "/admin",
    element: <AddToDatabase/>
  }
  ,
  {
    path: "/*",
    element: <PageNotFound/>
  }
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary fallback="Es gab einen Fehler">
      <RouterProvider router={router}/>
    </ErrorBoundary>  
  </React.StrictMode>
);
