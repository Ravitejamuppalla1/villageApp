import { Button, Row, Col, Form } from 'react-bootstrap'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { asyncUserLogin } from '../actions/usersActions'
const Login = (props) => {
    const dispatch = useDispatch()
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setpassword] = useState('')
    const [formErrors, setformErrors] = useState({})
    const errors = {}
    const { setIsLogged } = props
    const handleNumberChange = (e) => {
        setPhoneNumber(e.target.value)
    }
    const handlePasswordchange = (e) => {
        setpassword(e.target.value)
    }
    const runValidations = () => {
        if (phoneNumber.length === 0) {
            errors.phoneNumber = 'phoneNumber cannot be blank'
        }
        if (password.length === 0) {
            errors.password = 'Password cannot be blank'
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        runValidations()
        if (Object.keys(errors).length === 0) {
            setformErrors({})
            const formData = {
                phoneNumber,
                password
            }
            dispatch(asyncUserLogin(formData, props, setIsLogged))
        }
        else {
            setformErrors(errors)
        }
    }


    return (
        <div>
            <Row className="justify-content-md-center">
                <center> <Col md="auto" > <h1 style={{ color: "DarkBlue" }}>Login Page</h1> </Col></center>
            </Row>

            <center>
                <Form  >
                    <Form.Group as={Row} className='mt-5'>
                        <Form.Label className="mx-5" column md={2}>PhoneNumber</Form.Label>
                        <Col md={5}>
                            <Form.Control type='text' value={phoneNumber} placeholder="Enter your phonenumber" onChange={handleNumberChange} />

                            <Form.Text className="text-muted">
                                {formErrors.phoneNumber ? <span style={{ color: "red" }}>{formErrors.phoneNumber}</span> : "We'll never share your PhoneNumber with anyone else."}
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-3'>
                        <Form.Label className="mx-5" column md={2}>Password</Form.Label>
                        <Col md={5}>
                            <Form.Control type='password' value={password} placeholder="Enter password" onChange={handlePasswordchange} />

                            <Form.Text className="text-muted">
                                {formErrors.password ? <span style={{ color: "red" }}>{formErrors.password}</span> : "We'll never share your Password with anyone else."}
                            </Form.Text>
                        </Col>

                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Login
                    </Button>
                </Form>
            </center>

        </div>
    )


}

export default Login