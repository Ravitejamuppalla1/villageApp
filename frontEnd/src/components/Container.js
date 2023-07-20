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
import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'

const translationEn = {
    VILLAGE: "VILLAGE UPDATE APP", Home: "Home", village: "village", Residents: "Residents", Events: "Events", products: "products",
    DeleteAccount: "DeleteAccount", admin: "Admin", Register: "Register", Login: "Login", Logout: "Logout", Register: "Register Page ",
    Admin: "Admin", Name: "Name", PhoneNumber: "PhoneNumber", Password: "Password", name: "Enter your name", phonenumber: "Enter your phonenumber",
    password: "Enter password", Lists: "Lists of Admins"
}

const translationTe = {
    VILLAGE: "విలేజ్ అప్ డేట్ యాప్", Home: "హోమ్", village: "ఊరు", Residents: "నివాసితులు", Events: "ఈవెంట్స్", products: "ఉత్పత్తులు",
    DeleteAccount: "ఖాతాను తొలగించండి", admin: "అడ్మిన్", Register: "రిజిస్టర్", Login: "లాగిన్", Logout: "లాగ్అవుట్", Register: "రిజిస్టర్",
    Admin: "అడ్మిన్", Name: "పేరు", PhoneNumber: "ఫోన్ నెంబరు", Password: "పాస్ వర్డ్", name: "మీ పేరు నమోదు చేయండి",
    phonenumber: "మీ ఫోన్ నెంబరు నమోదు చేయండి", password: "పాస్ వర్డ్ నమోదు చేయండి"
}

const translationTa = {
    VILLAGE: "கிராம புதுப்பிப்பு பயன்பாடு", Home: "வீடு", Village: "கிராமம்", Residents: "குடியிருப்பாளர்கள்", Events: "நிகழ்வுகள்",
    products: "தயாரிப்புகள்", DeleteAccount: "கணக்கை நீக்குக", Admin: "நிர்வாகம்", Register: "பதிவு", Login: "உள்நுழைய", Logout: "வெளியேறு",
    Register: "பதிவு", admin: "நிர்வாக", Name: "பெயர்", PhoneNumber: "தொலைபேசி எண்", Password: "அடையாளச் சொல்", name: "உங்கள் பெயரை உள்ளிடவும்",
    phonenumber: "உங்கள் தொடர்பு எண்ணை அளிக்கவும்", password: "கடவுச்சொல்லை உள்ளிடவும்"
}

const translationKa = {
    VILLAGE: "ಗ್ರಾಮ ನವೀಕರಣ ಅಪ್ಲಿಕೇಶನ್", Home: "ಮನೆ", village: "ಗ್ರಾಮ", Residents: "ನಿವಾಸಿಗಳು", Events: "ಕಾರ್ಯಕ್ರಮಗಳು", products: "ಉತ್ಪನ್ನಗಳು",
    DeleteAccount: "ಖಾತೆಯನ್ನು ಅಳಿಸಿ", admin: "ನಿರ್ವಾಹಕ", Register: "ನೋಂದಣಿ", Login: "ಲಾಗಿನ್", Logout: "ಲಾಗ್ ಔಟ್", Register: "ನೋಂದಾಯಿಸಿ", Admin: "ನಿರ್ವಹಣೆ", Name: "ಹೆಸರು", PhoneNumber: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ", Password: "அಪಾಸ್ ವರ್ಡ್", name: "ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    phonenumber: "ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ", password: "ಪಾಸ್ವರ್ಡ್ ನಮೂದಿಸಿ"
}


i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: translationEn },
            te: { translation: translationTe },
            ta: { translation: translationTa },
            ka: { translation: translationKa }
        },
        lng: "en",
        fallbacklng: "en",
        interpolation: { escapeValue: false },
    })


const Container = (props) => {
    const dispatch = useDispatch()
    const [isLogged, setIsLogged] = useState(false)
    const { t } = useTranslation()


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
                isLogged && data.role !== 'superAdmin' &&  data.role !== 'resident' ?

                    (
                        <div className="container-fluid">
                            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "green" }}>
                                <h1 className="navbar-brand" ><span style={{ backgroundColor: "gold" }}>{t("VILLAGE")}</span></h1>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item active">
                                            <li><Link className="nav-link" to='/' style={{ color: "white" }}>{t("Home")}</Link></li>
                                        </li>
                                        <li className="nav-item active">
                                            <li><Link className="nav-link" to='/village' style={{ color: "white" }}>{t("Village")}</Link></li>
                                        </li>
                                        <li className="nav-item active">
                                            <li><Link className="nav-link" to='/residents' style={{ color: "white" }}>{t("Residents")}</Link></li>
                                        </li>
                                        <li className="nav-item active">
                                            <li><Link className="nav-link" to='/events' style={{ color: "white" }}>{t("Events")}</Link></li>
                                        </li>
                                        <li className="nav-item active">
                                            <li><Link className="nav-link" to='/products' style={{ color: "white" }}>{t("products")}</Link></li>
                                        </li>
                                        <li className="nav-item active">
                                            <li><Link className="nav-link" to='/deleteaccount' style={{ color: "white" }}>{t("DeleteAccount")}</Link></li>
                                        </li>
                                        <li className="nav-item active">
                                            <li><Link className="nav-link" to='#' style={{ color: "white" }} onClick={() => {
                                                Swal.fire('successfully logged out')
                                                localStorage.clear()
                                                props.history.push('/login')
                                                setIsLogged(false)
                                            }}>{t("Logout")}</Link></li>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>

                    ) : (isLogged && data.role === 'superAdmin') ?
                        (
                            <div className="container-fluid">
                                <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "green" }}>
                                    <h1 className="navbar-brand" ><span style={{ backgroundColor: "gold" }}>{t("VILLAGE")}</span></h1>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                        <ul className="navbar-nav mr-auto">
                                            <li className="nav-item active">
                                                <li><Link className="nav-link" to='/admin' style={{ color: "white" }}>{t("Admin")}</Link></li>
                                            </li>
                                            <li className="nav-item active">
                                                <li><Link className="nav-link" to='#' style={{ color: "white" }} onClick={() => {
                                                    Swal.fire('successfully logged out')
                                                    localStorage.clear()
                                                    props.history.push('/login')
                                                    setIsLogged(false)
                                                }}>{t("Logout")}</Link></li>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        ) : (isLogged && data.role === 'resident') ?

                            <div className="container-fluid">
                                <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "green" }}>
                                    <h1 className="navbar-brand" ><span style={{ backgroundColor: "gold" }}>{t("VILLAGE")}</span></h1>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                        <ul className="navbar-nav mr-auto">
                                            <li className="nav-item active">
                                                <li><Link className="nav-link" to='/' style={{ color: "white" }}>{t("Home")}</Link></li>
                                            </li>
                                            <li className="nav-item active">
                                                <li><Link className="nav-link" to='/events' style={{ color: "white" }}>{t("Events")}</Link></li>
                                            </li>
                                            <li className="nav-item active">
                                                <li><Link className="nav-link" to='/products' style={{ color: "white" }}>{t("products")}</Link></li>
                                            </li>
                                            <li className="nav-item active">
                                                <li><Link className="nav-link" to='/deleteaccount' style={{ color: "white" }}>{t("DeleteAccount")}</Link></li>
                                            </li>
                                            <li className="nav-item active">
                                                <li><Link className="nav-link" to='#' style={{ color: "white" }} onClick={() => {
                                                    Swal.fire('successfully logged out')
                                                    localStorage.clear()
                                                    props.history.push('/login')
                                                    setIsLogged(false)
                                                }}>{t("Logout")}</Link></li>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>


                            :

                            <div className="container-fluid">
                                <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "green" }}>
                                    <h1 className="navbar-brand" ><span style={{ backgroundColor: "gold" }}>{t("VILLAGE")}</span></h1>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                        <ul className="navbar-nav mr-auto" >
                                            <li className="nav-item active">
                                                <li><Link className="nav-link" to='/register' style={{ color: "white" }}>{t("Register")}</Link></li>
                                            </li>
                                            <li className="nav-item active">
                                                <li><Link className="nav-link" to='/login' style={{ color: "white" }}>{t("Login")}</Link></li>
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
                            <Route path='/admin' render={(props) => {
                                return <Admin  {...props} t={t} />
                            }} />
                        </div>
                    )

                    :
                    <div>
                        <Route path='/register' render={(props) => {
                            return <Register  {...props} t={t} />
                        }} />
                        <Route path='/login' render={(props) => {
                            return <Login  {...props} setIsLogged={setIsLogged} t={t} />
                        }} />
                    </div>
            }

        </div>
    )
}
export default withRouter(Container)