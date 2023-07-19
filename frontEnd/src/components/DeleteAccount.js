import { useDispatch,useSelector } from "react-redux"
import { useEffect ,useState } from "react"
import { asyncAccountDelete } from "../actions/usersActions"
import { asyncGetVillage } from "../actions/villagesActions"
import Swal from "sweetalert2"

const DeleteAccount = (props) => {

    const dispatch = useDispatch()

    const[villageId,setVillageId] =useState('')

    useEffect(()=>{
          dispatch(asyncGetVillage())
    },[])
 
    const data = useSelector((state)=>{
         return state.village.data[0]
        
    })
    console.log(data,'d')

    
    const handleDelete = () => {
        console.log('hi')
        setVillageId(data._id)
        console.log(villageId,'id')
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
                dispatch(asyncAccountDelete(props,data.adminId,props.setIsLogged ))
            }
        })
    }

    return (
        <div>
            <h4 style={{ color: 'Black' }}> Click below to delete your account...</h4>
            <button className='btn btn-danger' onClick={handleDelete}> Delete Account </button>
        </div>
    )
}

export default DeleteAccount