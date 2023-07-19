import { useState } from "react"
import { useDispatch } from 'react-redux'
import { asynctUserRegister } from "../actions/usersActions"
import { Button, Row, Col, Form } from 'react-bootstrap'
const Register = (props) => {
    const [name, setName] = useState('')
    const [phoneNumber, setphoneNumber] = useState('')
    const [password, setpassword] = useState('')
    const [formErrors, setformErrors] = useState({})
    const errors = {}
    const dispatch = useDispatch()

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleNumberChange = (e) => {
        setphoneNumber(e.target.value)
    }
    const handlePasswordchange = (e) => {
        setpassword(e.target.value)
    }
    const runValidations = () => {
        if (name.length === 0) {
            errors.name = 'Name cannot be blank'
        }
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
            let formData = {
                name,
                phoneNumber,
                password
            }
            const reset = () => {
                setName('')
                setphoneNumber('')
                setpassword('')
            }
            if (localStorage.getItem('token')) {
                formData.role = 'admin'
                dispatch(asynctUserRegister(formData, props, reset))
            }
            else {
                dispatch(asynctUserRegister(formData, props, reset))
            }
        }
        else {
            setformErrors(errors)
        }
    }


    return (
        <div>
            <Row className="justify-content-md-center">
                <center> <Col md="auto" >{(localStorage.getItem('token')) ? <h1 style={{ color: "DarkBlue" }}>Add Admin</h1> : <h1 style={{ color: "DarkBlue" }}>Register page</h1>}</Col></center>
            </Row>

            <center>
                <Form  >
                    <Form.Group as={Row} className='mt-5'>
                        <Form.Label className="mx-5" column md={2}>Name</Form.Label>
                        <Col md={5}>
                            <Form.Control type='text' value={name} placeholder="Enter your name" onChange={handleNameChange} />

                            <Form.Text className="text-muted">
                                {formErrors.name ? <span style={{color:"red"}}>{formErrors.name}</span> : "We'll never share your name with anyone else."}
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-3'>
                        <Form.Label className="mx-5" column md={2}>PhoneNumber</Form.Label>
                        <Col md={5}>
                            <Form.Control ttype='text' value={phoneNumber} placeholder="Enter your phonenumber" onChange={handleNumberChange} />

                            <Form.Text className="text-muted">
                                {formErrors.phoneNumber ? <span style={{color:"red"}}>{formErrors.phoneNumber}</span> : "We'll never share your Phonenumber with anyone else."}
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-3'>
                        <Form.Label className="mx-5" column md={2}>Password</Form.Label>
                        <Col md={5}>
                            <Form.Control type='password' value={password} placeholder="Enter password" onChange={handlePasswordchange} />

                            <Form.Text className="text-muted">
                                {formErrors.password ? <span style={{color:"red"}}>{formErrors.password}</span> : "We'll never share your password with anyone else."}
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        {localStorage.getItem('token') ? "create" : "Register"}
                    </Button>

                </Form>

            </center>
        </div>
    )
}
export default Register