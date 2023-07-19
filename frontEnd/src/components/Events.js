import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { asyncGetEvents, asyncSetEditEventId, asyncDestroyEvent } from "../actions/eventsActions"
import AddEvent from '../components/AddEvent'
import EditEvent from "./EditEvent"

const Events = (props) => {
    const dispatch = useDispatch()

    const [showEvent, setShowEvent] = useState('')

    useEffect(() => {
        dispatch(asyncGetEvents())
    }, [])

    const eventsData = useSelector((state => {
        return state.events
    }))

    const handleEditEvent = (id) => {
        console.log(id, 'i')
        dispatch(asyncSetEditEventId(id))
    }

    const handleDestroyEvent = (id) => {
        dispatch(asyncDestroyEvent(id))
    }

    const handleShowEvent = (ele) => {
        setShowEvent(ele)
    }
    return (
        <div>

            {
                eventsData.data.length > 0 ?
                    <div>
                        <h1> Lists of Events</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="col">S.No</th>
                                    <th className="col">Event Title</th>
                                    <th className="col" >Start Date</th>
                                    <th className="col">End Date</th>
                                    <th className="col">Description</th>
                                    <th className="col">Modify</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    eventsData.data.map((ele, i) => {
                                        return <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{ele.title}</td>
                                            <td>{(ele.startDate).slice(0, 10)}</td>
                                            <td>{(ele.endDate).slice(0, 10)}</td>
                                            <td> <button type="button" className="btn btn-primary" onClick={() => { handleShowEvent(ele) }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                Show
                                            </button></td>
                                            <td><button onClick={() => { handleEditEvent(ele._id) }} className="btn btn-info">Edit</button>
                                                <button onClick={() => { handleDestroyEvent(ele._id) }} className="btn btn-danger">Delete</button></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    : <p style={{ color: 'Red' }}>No Events are scheduled </p>
            }

            {
                eventsData.editId ? <EditEvent /> : <AddEvent />
            }


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{showEvent.title}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Description-{showEvent.description} <br />
                            Start Date-{(showEvent.startDate)?.slice(0, 10)}<br />
                            End Date-{(showEvent.endDate)?.slice(0, 10)}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Events