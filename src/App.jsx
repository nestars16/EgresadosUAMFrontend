
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom"

import RegisterPage from './RegisterPage'
import LogIn from './LogIn'
import { EgresadoView, egresadoLoader }from './EgresadoView'
import EgresadoList from './EgresadoList'
import FormView from './FormView'
import {FormInfo , formLoader} from './FormInfo'
import FormCreation from './FormCreation'
import FormAnswer from "./FormAnswer"

import './App.css'

const router = createBrowserRouter(
    [
        {
            path: "/register",
            element : <RegisterPage/>
        },
        {
            path : "/",
            element: <LogIn isAdmin={false}/>
        },
        {
            path : "/admin/login",
            element : <LogIn isAdmin={true}/>
        },
        {
            path : "/admin/egresado_list",
            element : <EgresadoList/>
        },

        {
            path : "/admin",
            element : <EgresadoList/>
        },
        {
            path : "/admin/form_list",
            element : <FormView isAdmin={true}/>
        },
        {
            path : "/admin/egresado_view/:egresadoId",
            element : <EgresadoView isAdmin={true}/>,
            loader : egresadoLoader,
        }
        ,
        {
            path : "/egresado_view/:egresadoId",
            element : <EgresadoView isAdmin={false}/>,
            loader : egresadoLoader,
        },
        {
            path : "/admin/form_view/:formId",
            element : <FormInfo/>,
            loader : formLoader,
        },
        {
            path : "/admin/form_creation",
            element : <FormCreation/>,
        },
        {
            path : "/form_answer/:formId",
            element : <FormAnswer/>,
            loader : formLoader
        },
        {
            path : "/form_list",
            element : <FormView isAdmin={false}/>
        }
    ]
)


function App() {
return (
    <>
        <RouterProvider router={router}/>
    </>
  )
}

export default App
