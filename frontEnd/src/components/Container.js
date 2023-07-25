import React from "react";
import { Link, Route, withRouter,Switch,Redirect } from 'react-router-dom'
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
import { Router } from "react-router-dom/cjs/react-router-dom.min";

const translationEn = {
    VILLAGE: "VILLAGE UPDATE APP", Home: "Home", village: "village", Residents: "Residents", Events: "Events", products: "products",
    DeleteAccount: "DeleteAccount", admin: "Admin", Register: "Register", Login: "Login", Logout: "Logout", Register: "Register",
    Admin: "Admin", Name: "Name", PhoneNumber: "PhoneNumber", Password: "Password", name: "Enter your name", phonenumber: "Enter your phonenumber",
    password: "Enter password", Create: "Create", shareName: "We'll never share your name with anyone else",
    sharePhoneNumber: "We'll never share your Phonenumber with anyone else", sharePassword: "We'll never share your password with anyone else", blankName: "Name cannot be blank",
    blankPhoneNumber: "phoneNumber cannot be blank", blankPassword: "Password cannot be blank", SNO: "S.No", AdminName: "Admin Name", ContactNumber: "Contact Number", Description: "Description",
    Modify: "Modify", Show: "Show", Edit: "Edit", Suspend: "Suspend", Restore: "Restore", Delete: "Delete", Close: "Close", VillageName: "VillageName", Lists: "Lists of Admins",Restored: "Lists of Restore",
     NoAdmin: "No Admins are available",
    AdminRestore: "No Admins to Restore"
}

const translationTe = {
    VILLAGE: "విలేజ్ అప్ డేట్ యాప్", Home: "హోమ్", village: "ఊరు", Residents: "నివాసితులు", Events: "ఈవెంట్స్", products: "ఉత్పత్తులు",
    DeleteAccount: "ఖాతాను తొలగించండి", admin: "అడ్మిన్", Register: "రిజిస్టర్", Login: "లాగిన్", Logout: "లాగ్అవుట్", Register: "రిజిస్టర్",
    Admin: "అడ్మిన్", Name: "పేరు", PhoneNumber: "ఫోన్ నెంబరు", Password: "పాస్ వర్డ్", name: "మీ పేరు నమోదు చేయండి",
    phonenumber: "మీ ఫోన్ నెంబరు నమోదు చేయండి", password: "పాస్ వర్డ్ నమోదు చేయండి", Create: "సృష్టించు", shareName: "మేము మీ పేరును మరెవరితోనూ పంచుకోము",
    sharePhoneNumber: "మేము మీ ఫోన్ నెంబరును వేరొకరితో పంచుకోము", sharePassword: "మీ పాస్ వర్డ్ ని మేం ఎవరితోనూ పంచుకోం.", blankName: "పేరు ఖాళీగా ఉండరాదు",
    blankPhoneNumber: "ఫోన్ నెంబరు ఖాళీగా ఉండరాదు", blankPassword: "పాస్ వర్డ్ ఖాళీగా ఉండరాదు", SNO: "సీరియల్ నెంబరు", AdminName: "అడ్మిన్ పేరు", ContactNumber: "కాంటాక్ట్ నెంబరు", Description: "వివరణ",
    Modify: "సవరించండి", Show: "చూపించు", Edit: "సవరించు", Suspend: "సస్పెండ్", Restore: "పునరుద్ధరించు", Delete: "తొలగించు", Close: "క్లోజ్", VillageName: "గ్రామం పేరు", Lists: "నిర్వాహకుల జాబితా",
    Restored: "పునరుద్ధరణ జాబితాలు", NoAdmin: "అడ్మిన్స్ డేటా అందుబాటులో లేదు",
    AdminRestore: "పునరుద్ధరించడానికి నిర్వాహకులు లేరు"
}

const translationTa = {
    VILLAGE: "கிராம புதுப்பிப்பு பயன்பாடு", Home: "வீடு", Village: "கிராமம்", Residents: "குடியிருப்பாளர்கள்", Events: "நிகழ்வுகள்",
    products: "தயாரிப்புகள்", DeleteAccount: "கணக்கை நீக்குக", Admin: "நிர்வாகம்", Register: "பதிவு", Login: "உள்நுழைய", Logout: "வெளியேறு",
    Register: "பதிவு", admin: "நிர்வாக", Name: "பெயர்", PhoneNumber: "தொலைபேசி எண்", Password: "அடையாளச் சொல்", name: "உங்கள் பெயரை உள்ளிடவும்",
    phonenumber: "உங்கள் தொடர்பு எண்ணை அளிக்கவும்", password: "கடவுச்சொல்லை உள்ளிடவும்", Create: "உருவாக்கு", shareName: "உங்கள் பெயரை வேறு யாருடனும் பகிர்ந்து கொள்ள மாட்டோம்",
    sharePhoneNumber: "உங்கள் தொலைபேசி எண்ணை வேறு யாருடனும் பகிர்ந்து கொள்ள மாட்டோம்", sharePassword: "உங்கள் கடவுச்சொல்லை வேறு யாருடனும் பகிர்ந்து கொள்ள மாட்டோம்",
    blankName: "பெயர் காலியாக இருக்க முடியாது", blankPhoneNumber: "தொலைபேசி எண் காலியாக இருக்கக்கூடாது", blankPassword: "கடவுச்சொல் காலியாக இருக்கக்கூடாது",
    SNO: "பட்டியல் எண்", AdminName: "நிர்வாகி பெயர்", ContactNumber: "தொடர்பு எண்", Description: "விளக்கம்", Modify: "தொடர்பு எண்", Show: "காண்பிக்க", Edit: "திருத்துதல்", Suspend: "இடைநீக்கம்", 
    Restore: "மீட்டமை", Delete: "அழி", Close: "மூடவும்", VillageName: "கிராமத்தின் பெயர்", Lists: "நிர்வாகிகளின் பட்டியல்கள்",Restored: "மீட்டெடுப்பு பட்டியல்கள்", NoAdmin: "நிர்வாகிகள் யாரும் இல்லை",
    AdminRestore: "மீட்டெடுக்க நிர்வாகிகள் இல்லை"
}

const translationKa = {
    VILLAGE: "ಗ್ರಾಮ ನವೀಕರಣ ಅಪ್ಲಿಕೇಶನ್", Home: "ಮನೆ", village: "ಗ್ರಾಮ", Residents: "ನಿವಾಸಿಗಳು", Events: "ಕಾರ್ಯಕ್ರಮಗಳು", products: "ಉತ್ಪನ್ನಗಳು",
    DeleteAccount: "ಖಾತೆಯನ್ನು ಅಳಿಸಿ", admin: "ನಿರ್ವಾಹಕ", Register: "ನೋಂದಣಿ", Login: "ಲಾಗಿನ್", Logout: "ಲಾಗ್ ಔಟ್", Register: "ನೋಂದಾಯಿಸಿ", Admin: "ನಿರ್ವಹಣೆ", Name: "ಹೆಸರು",
    PhoneNumber: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ", Password: "அಪಾಸ್ ವರ್ಡ್", name: "ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ", phonenumber: "ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ", password: "ಪಾಸ್ವರ್ಡ್ ನಮೂದಿಸಿ", Create: "ರಚಿಸಿ", shareName: "ನಾವು ಎಂದಿಗೂ ನಿಮ್ಮ ಹೆಸರನ್ನು ಬೇರೆ ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳುವುದಿಲ್ಲ",
    sharePhoneNumber: "ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಾವು ಎಂದಿಗೂ ಬೇರೆ ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳುವುದಿಲ್ಲ", sharePassword: "ನಾವು ನಿಮ್ಮ ಪಾಸ್ ವರ್ಡ್ ಅನ್ನು ಬೇರೆ ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳುವುದಿಲ್ಲ",
    blankName: "ಹೆಸರು ಖಾಲಿ ಇರುವಂತಿಲ್ಲ", blankPhoneNumber: "ಫೋನ್ ಸಂಖ್ಯೆ ಖಾಲಿ ಇರುವಂತಿಲ್ಲ", blankPassword: "ಪಾಸ್ವರ್ಡ್ ಖಾಲಿ ಇರುವಂತಿಲ್ಲ", SNO: "ಪಟ್ಟಿ ಸಂ", AdminName: "ನಿರ್ವಾಹಕರ ಹೆಸರು", ContactNumber: "ಸಂಪರ್ಕ ಸಂಖ್ಯೆ", Description: "ವಿವರಣೆ",
    Modify: "ಮಾರ್ಪಡಿಸಿ", Show: "ತೋರಿಸು", Edit: "ಸಂಪಾದನೆ", Suspend: "ಅಮಾನತುಗೊಳಿಸು", Restore: "ಪುನಃಸ್ಥಾಪನೆ", Delete: "ಅಳಿಸು", Close: "ಮುಚ್ಚು", VillageName: "ಹಳ್ಳಿಯ ಹೆಸರು", Lists: "ನಿರ್ವಾಹಕರ ಪಟ್ಟಿ",Restored: "ಪುನಃಸ್ಥಾಪನೆಯ ಪಟ್ಟಿಗಳು", NoAdmin: "ಯಾವುದೇ ನಿರ್ವಾಹಕರು ಲಭ್ಯವಿಲ್ಲ",
    AdminRestore: "ಮರುಸ್ಥಾಪಿಸಲು ಯಾವುದೇ ನಿರ್ವಾಹಕರು ಇಲ್ಲ"
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

    const handleLanguageChange = (e) => {
        i18n.changeLanguage(e.target.value)
    }


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
                isLogged && data.role !== 'superAdmin' && data.role !== 'resident' ?

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
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
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
                                        <span className="navbar-text">
                                            <img src="https://tse3.mm.bing.net/th?id=OIP.Jfvvfl7brkO3ik4oG2FW2gHaFO&pid=ImgDet&rs=1" value='l' alt='lng' height="50px" width="50px" />  <select name='language' onChange={handleLanguageChange}>
                                                <option value="en">English</option>
                                                <option value="te">Telugu</option>
                                                <option value="ta">Tamil</option>
                                                <option value="ka">Kannada</option>
                                            </select>
                                        </span>
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
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
                                            <li className="nav-item active">
                                                <li><Link className="nav-link" to='/register' style={{ color: "white" }}>{t("Register")}</Link></li>
                                            </li>
                                            <li className="nav-item active">
                                                <li><Link className="nav-link" to='/login' style={{ color: "white" }}>{t("Login")}</Link></li>
                                            </li>
                                        </ul>
                                        <span className="navbar-text">
                                            <img src="https://tse3.mm.bing.net/th?id=OIP.Jfvvfl7brkO3ik4oG2FW2gHaFO&pid=ImgDet&rs=1" alt='lng' height="50px" width="50px" />  <select name='language' onChange={handleLanguageChange}>
                                                <option value="en">English</option>
                                                <option value="te">Telugu</option>
                                                <option value="ta">Tamil</option>
                                                <option value="ka">Kannada</option>
                                            </select>
                                        </span>
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
                                return <Admin  {...props} t={t}  />
                            }} />
                        </div>
                    )

                    :
                 <div>
                  
                 
                        <Route path='/register'  render={(props) => {
                            return   <Register  {...props} t={t}  />
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