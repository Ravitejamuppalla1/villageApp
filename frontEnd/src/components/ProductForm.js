import { useState,useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { Button, Row, Col, Form } from 'react-bootstrap'
import { asyncGetVillage } from "../actions/villagesActions"


const ProductForm = (props)=>{

    const dispatch = useDispatch()

    const {productSubmission} =props

    useEffect(() => {
        dispatch(asyncGetVillage())
    }, [])

    const data = useSelector((state => {
        return state
    }))
  
    const result = data.products.data.find((ele) => {
        return ele._id === data.products.editId
    })

    const [name, setName] = useState(result?.name ? result.name : '')
    const [price, setPrice] = useState(result?.price ? result.price : '')
    const [phoneNumber, setPhoneNumber] = useState(result?.phoneNumber ? result.phoneNumber : '')
    const [quantity, setQuantity] = useState(result?.quantity ? result.quantity : '')
    const [description, setDescription] = useState(result?.description ? result.description : '')
    const [villageId, setVillageId] = useState(result?.villageId ? result.villageId : '')
    const [productImage, setProductImage] = useState(result?.image ? result.image : '')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

  
    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handlePricechange = (e) => {
        setPrice(e.target.value)
    }

    const handlephoneNumberchange = (e) => {
        setPhoneNumber(e.target.value)
    }

    const handleQuantitychange = (e) => {
        setQuantity(e.target.value)
    }

    const handleDescriptionchange = (e) => {
        setDescription(e.target.value)
        setVillageId(data.village.data[0]._id)
    }
     
    const handleImageChange = (e)=>{
             console.log(e.target.files)
             setProductImage(e.target.files[0])
    }

    const runValidations = () => {
        if (name.length === 0) {
            errors.name = 'Name of product cannot be blank'
        }
        if (price.length === 0) {
            errors.price = 'price of product cannot be blank'
        }
        if (phoneNumber.length === 0) {
            errors.phoneNumber = 'phoneNumber cannot be blank'
        }
        if (quantity.length === 0) {
            errors.quantity = 'product quantity cannot be blank'
        }
        if (description.length === 0) {
            errors.description = 'Description cannot be blank'
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        runValidations()
        if (Object.keys(errors).length === 0) {
            setFormErrors({})

            const formData = {
                name,
                price,
                phoneNumber,
                quantity,
                description,
                villageId,
                
            }
             const formData1 = new FormData()
             formData1.append('image',productImage)
               console.log(formData1,'1')
            const reset = () => {
                setName('')
                setPrice('')
                setPhoneNumber('')
                setQuantity('')
                setDescription('')
                setVillageId('')
             }

           }
        else {
            setFormErrors(errors)
        }
    }

    return (
        <div>
              <Row className="justify-content-md-center">
                <center> <Col md="auto" > <h1 style={{ color: "DarkBlue" }}>{data.products.editId ? "Edit Product" : " Add Product"}</h1> </Col></center>
            </Row>

        <center>
                <Form  >
                    <Form.Group as={Row} className='mt-5'>
                        <Form.Label className="mx-5" column md={2}>Product Name</Form.Label>
                        <Col md={5}>
                            <Form.Control type='text' value={name} placeholder="Enter product name" onChange={handleNameChange}  />

                            <Form.Text className="text-muted">
                                {formErrors.name ? <span style={{ color: "red" }}>{formErrors.name}</span> : "We'll never share your Product Name with anyone else."}
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-3'>
                        <Form.Label className="mx-5" column md={2}>Product Price</Form.Label>
                        <Col md={5}>
                            <Form.Control type='text' value={price} placeholder="Enter price" onChange={handlePricechange}   />

                            <Form.Text className="text-muted">
                                {formErrors.price ? <span style={{ color: "red" }}>{formErrors.price}</span> : "We'll never share your Product Price with anyone else."}
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-3'>
                        <Form.Label className="mx-5" column md={2}>PhoneNumber</Form.Label>
                        <Col md={5}>
                            <Form.Control type='text' value={phoneNumber} placeholder="Enter your phoneNumber" onChange={handlephoneNumberchange} />

                            <Form.Text className="text-muted">
                                {formErrors.phoneNumber ? <span style={{ color: "red" }}>{formErrors.phoneNumber}</span> : "We'll never share your Phone Number with anyone else."}
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-3'>
                        <Form.Label className="mx-5" column md={2}>Quantity</Form.Label>
                        <Col md={5}>
                            <Form.Control type='text' value={quantity} placeholder="Enter quantity" onChange={handleQuantitychange} />

                            <Form.Text className="text-muted">
                                {formErrors.quantity ? <span style={{ color: "red" }}>{formErrors.quantity}</span> : "We'll never share your Product Details with anyone else."}
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-3'>
                        <Form.Label className="mx-5" column md={2}>Description</Form.Label>
                        <Col md={5}>
                            <Form.Control value={description} placeholder="Enter description" onChange={handleDescriptionchange} />

                            <Form.Text className="text-muted">
                                {formErrors.description ? <span style={{ color: "red" }}>{formErrors.description}</span> : "We'll never share your Product Details with anyone else."}
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                    { data.products.editId ? 'Edit' : 'Create' }
                    </Button>

                    </Form>
                    </center>
             </div>
    )
}

export default ProductForm