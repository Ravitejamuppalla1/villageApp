import { useEffect,useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import { asyncGetResidents,asyncSetEditResidentId, asyncDestroyResident} from "../actions/residentsActions"
import EditResident from "./EditResident"
import AddResident from "./AddResident"
import Swal from "sweetalert2"

const Residents = (props) => {
 const dispatch =useDispatch()
 
  const[display,setDisplay] =useState({})
  
   useEffect(() => {
        dispatch(asyncGetResidents())
    }, [])

    const dataResidents = useSelector((state => {
        return state.residents
    }))
   
    const handleShow = (ele)=>{
           setDisplay(ele)
    }
   console.log(display,'d')
    const handleEdit = (id) => {
       dispatch(asyncSetEditResidentId(id))
      }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                dispatch(asyncDestroyResident(id))
            }
        })

    }
  
    return (
        <div>
           
            <ul>{
                        dataResidents.data.map((ele) => {
                            return (
                                <li key={ele._id}><span style={{color:'green'}}>{ele.name}</span>
                                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                                <div className="btn-group" role="group" aria-label="First group" >
                                    <button type="button" className="btn btn-primary" onClick={()=>{handleShow(ele)}} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                      Show
                                      </button>
                                      </div>

                                      <div className="btn-group" role="group" aria-label="Second group">
                                         <button type="button" className="btn btn-info"  onClick={() => { handleEdit(ele._id) }}>Edit</button>
                                         </div>
                                    <div className="btn-group" role="group" aria-label="Third group">
                                    <button type="button" className="btn btn-danger"  onClick={() => { handleDelete(ele._id) }}>Delete</button>
                                </div>
                                </div>
                                </li>
                            )
                        })}
                </ul>
                {
                    dataResidents.editId ? <EditResident />  : <AddResident />
                }
             



<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">{display.name}</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        PhoneNumber-{display.phoneNumber} <br/>
        DoorNo-{display.doorNo}
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

export default Residents