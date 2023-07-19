import React from "react";
import { Link, Route, withRouter } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Village from "./Village";
import Products from "./Products";
import Residents from "./Residents";
import Events from "./Events";
import DeleteAccount from "./DeleteAccount";
import Admin from "./Admin";
import Swal from "sweetalert2";
import { asyncAccountDetails } from "../actions/usersActions";


const Container = (props) => {
    const dispatch = useDispatch()
    const [isLogged, setIsLogged] = useState(false)


    const data = useSelector((state) => {
        return state.users.userDetails
    })

    useEffect(() => {
        if (data?.hasOwnProperty('phoneNumber')) {
            setIsLogged(true)
        } else if (localStorage.getItem('token')) {
            dispatch(asyncAccountDetails(localStorage.getItem('token'), props, setIsLogged))

        }

    }, [data])


    return (

        <div >
            {
                isLogged && data.role !== 'superAdmin' ?

                    (
                        <div className="container-fluid">
                            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "green" }}>
                                <h1 className="navbar-brand" ><span style={{ backgroundColor: "gold" }}>VILLAGE UPDATE APP</span></h1>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item active">
                                            <li><Link className="nav-link" to='/' style={{ color: "white" }}>Home</Link></li>
                                        </li>
                                        <li className="nav-item active">
                                            <li><Link className="nav-link" to='/village' style={{ color: "white" }}>Village</Link></li>
                                        </li>
                                        <li className="nav-item active">
                                            <li><Link className="nav-link" to='/residents' style={{ color: "white" }}>Residents</Link></li>
                                        </li>
                                        <li className="nav-item active">
                                            <li><Link className="nav-link" to='/events' style={{ color: "white" }}>Events</Link></li>
                                        </li>
                                        <li className="nav-item active">
                                            <li><Link className="nav-link" to='/products' style={{ color: "white" }}>products</Link></li>
                                        </li>
                                        <li className="nav-item active">
                                            <li><Link className="nav-link" to='/deleteaccount' style={{ color: "white" }}>DeleteAccount</Link></li>
                                        </li>
                                        <li className="nav-item active">
                                            <li><Link className="nav-link" to='#' style={{ color: "white" }} onClick={() => {
                                                Swal.fire('successfully logged out')
                                                localStorage.clear()
                                                props.history.push('/login')
                                                setIsLogged(false)
                                            }}>Logout</Link></li>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>

                    ) : (isLogged && data.role === 'superAdmin') ?
                        (
                            <div className="container-fluid">
                                <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "green" }}>
                                    <h1 className="navbar-brand" ><span style={{ backgroundColor: "gold" }}>VILLAGE UPDATE APP</span></h1>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                        <ul className="navbar-nav mr-auto">
                                            <li className="nav-item active">
                                                <li><Link className="nav-link" to='/admin' style={{ color: "white" }}>Admin</Link></li>
                                            </li>
                                            <li className="nav-item active">
                                                <li><Link className="nav-link" to='#' style={{ color: "white" }} onClick={() => {
                                                    Swal.fire('successfully logged out')
                                                    localStorage.clear()
                                                    props.history.push('/login')
                                                    setIsLogged(false)
                                                }}>Logout</Link></li>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        ) :

                        <div className="container-fluid">
                            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "green" }}>
                                <h1 className="navbar-brand" ><span style={{ backgroundColor: "gold" }}>VILLAGE UPDATE APP</span></h1>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                    <ul className="navbar-nav mr-auto" >
                                        <li className="nav-item active">
                                            <li><Link className="nav-link" to='/register' style={{ color: "white" }}>Register</Link></li>
                                        </li>
                                        <li className="nav-item active">
                                            <li><Link className="nav-link" to='/login' style={{ color: "white" }}>Login</Link></li>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
            }
            {isLogged && data.role !== 'superAdmin' ?
                (<div>

                    <Route path='/' component={Home} exact={true} />
                    <Route path='/village' component={Village} exact={true} />
                    <Route path='/residents' component={Residents} exact={true} />
                    <Route path='/events' component={Events} exact={true} />
                    <Route path='/products' component={Products} exact={true} />
                    <Route path='/deleteaccount' render={(props) => {
                        return <DeleteAccount  {...props} setIsLogged={setIsLogged} />
                    }} />
                </div>)
                : (isLogged && data.role === 'superAdmin') ?
                    (
                        <div>
                            <Route path='/admin' component={Admin} exact={true} />
                        </div>
                    )

                    :
                    <div>
                        <Route path='/register' render={(props) => {
                            return <Register  {...props} />
                        }} />
                        <Route path='/login' render={(props) => {
                            return <Login  {...props} setIsLogged={setIsLogged} />
                        }} />
                    </div>
            }
        </div>
    )
}
export default withRouter(Container)