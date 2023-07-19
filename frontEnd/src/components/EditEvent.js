import { useDispatch } from "react-redux"
import EventForm from "./EventForm"
import { asyncEditEvent,asyncSetEditEventId } from "../actions/eventsActions"

const EditEvent = ()=>{
    const dispatch =useDispatch()
    const eventSubmission = (formData,reset,id)=>{
        console.log(id,'eeid')
        dispatch(asyncEditEvent(formData,reset,id))
        dispatch(asyncSetEditEventId(''))
 } 
    return(
        <div>
            
           <EventForm eventSubmission={eventSubmission} />
             
        </div>
    )
}


export default EditEvent