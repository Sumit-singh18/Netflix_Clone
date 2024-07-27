import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Login from '../Components/Login'
import Header from './../Components/Header';
const appRouter = createBrowserRouter ([

    {
        path : "/",
        element : <Login />
    },
    {
        path : "/browse",
        element : <Header />
    }
])

export default appRouter