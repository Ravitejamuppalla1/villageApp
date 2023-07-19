import { useState,useEffect } from "react"
import { Button, Row, Col, Form } from 'react-bootstrap'
import { asyncGetVillage } from "../actions/villagesActions"
import { asyncGetEvents } from "../actions/eventsActions"
import { useSelector,useDispatch } from "react-redux"

const EventForm = (props)=>{

    const dispatch =useDispatch()

    const {eventSubmission} = props

    const accountDetails = useSelector((state)=>{
        return state.users.userDetails
    }) 

   useEffect(() => {
        dispatch(asyncGetVillage(accountDetails._id))
        dispatch(asyncGetEvents())
    }, [accountDetails])
   
  const data = useSelector((state => {
        return state
    }))

    const result = data.events.data.find((ele) => {
        return ele._id === data.events.editId
    })

    const [title, setTitle] = useState(result?.title ? result.title : '')
    const [startDate, setStartDate] = useState(result?.startDate ? result.startDate : '')
    const [endDate, setEndDate] = useState(result?.endDate ? result.endDate : '')
    const [description, setDescription] = useState(result?.description ? result.description : '')
    const [villageId, setVillageId] = useState(result?.villageId ? result.villageId : '')

    const [formErrors, setformErrors] = useState({})
    const errors = {}

   const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleStartDatechange = (e) => {
        setStartDate(e.target.value)
    }

    const handleEndDatechange = (e) => {
        setEndDate(e.target.value)
    }

    const handleDescriptionchange = (e) => {
        setDescription(e.target.value)
        setVillageId(data.village.data._id)
    }

    const runValidations = () => {
        if (title.length === 0) {
            errors.title = 'Event Title cannot be blank'
        }
        if (startDate.length === 0) {
            errors.startDate = 'Start Date of Event cannot be blank'
        }
        if (endDate.length === 0) {
            errors.endDate = 'End Date of Event cannot be blank'
        }
        if (description.length === 0) {
            errors.description = 'Description of Event cannot be blank'
        }

    }
      
    const handleSubmit = (e) => {
        e.preventDefault()
        runValidations()
        if (Object.keys(errors).length === 0) {
            setformErrors({})
            const formData = {
                title,
                startDate,
                endDate,
                description,
                villageId

            }
           console.log(formData,typeof(startDate),'typeof')
            const reset = () => {
                setTitle('')
                setStartDate('')
                setEndDate('')
                setDescription('')
                setVillageId('')
            }
            eventSubmission(formData,reset,result?._id)
        }
        else {
            setformErrors(errors)
        }
    }

    return(
        <div>
              <Row className="justify-content-md-center">
                <center> <Col md="auto" > <h1 style={{ color: "DarkBlue" }}>{data.events.editId ? "Edit Event" : " Add Event"}</h1> </Col></center>
            </Row>
              <center>
                <Form  >
                    <Form.Group as={Row} className='mt-5'>
                        <Form.Label className="mx-5" column md={2}>Title</Form.Label>
                        <Col md={5}>
                            <Form.Control type='text' value={title} placeholder="Enter Event Title" onChange={handleTitleChange} />

                            <Form.Text className="text-muted">
                                {formErrors.title ? <span style={{ color: "red" }}>{formErrors.title}</span> : "We'll never share your Event Title with anyone else."}
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-3'>
                        <Form.Label className="mx-5" column md={2}>startDate</Form.Label>
                        <Col md={5}>
                            <Form.Control type='Date' value={startDate} placeholder="Enter startDate of Event" onChange={handleStartDatechange} />

                            <Form.Text className="text-muted">
                                {formErrors.startDate ? <span style={{ color: "red" }}>{formErrors.startDate}</span> : "We'll never share your Event start Date with anyone else."}
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-3'>
                        <Form.Label className="mx-5" column md={2}>EndDate</Form.Label>
                        <Col md={5}>
                            <Form.Control type='Date' value={endDate} placeholder="Enter EndDate of Event" onChange={handleEndDatechange}  />

                            <Form.Text className="text-muted">
                                {formErrors.endDate ? <span style={{ color: "red" }}>{formErrors.endDate}</span> : "We'll never share your Event End Date with anyone else."}
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className='mt-3'>
                        <Form.Label className="mx-5" column md={2}>EndDate</Form.Label>
                        <Col md={5}>
                            <Form.Control  type='textarea' value={description} placeholder="Enter Description of Event" onChange={handleDescriptionchange} />  

                            <Form.Text className="text-muted">
                                {formErrors.description ? <span style={{ color: "red" }}>{formErrors.description}</span> : "We'll never share your Event Details with anyone else."}
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                    { data.events.editId ? 'Edit' : 'Create' }
                    </Button>

                    </Form>
                    </center>
               </div>
    )
}

export default EventForm