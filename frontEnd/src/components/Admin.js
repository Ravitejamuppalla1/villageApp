import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import AddAdmin from "./AddAdmin"
import { asyncGetAdmin,asyncDestroyAdmin,asyncAccountDelete,asyncEditAdmin} from "../actions/usersActions"
import { asyncGetVillage } from "../actions/villagesActions"
import Swal from "sweetalert2"

const Admin = (props) => {
    
    const dispatch = useDispatch()

    const[displayAdmin,setDisplayAdmin] = useState('')

   useEffect(() => {
        dispatch(asyncGetAdmin())
    }, [dispatch])

    const adminsData = useSelector((state)=>{
        return state.users
    })
  
  const suspendedData = adminsData.data.filter((ele)=>{
        if( ele.isDeleted == true){
                 return {...ele}
    }})

    const notSuspendedData = adminsData.data.filter((ele)=>{
        if(ele.isDeleted == false ){
            return {...ele}
        }})
  
const handleShowAdmin = (data)=>{
       dispatch(asyncGetVillage(data._id))
       setDisplayAdmin(data)
  }

  const villageData = useSelector((state)=>{
    return state.village.data
  })

  const handleEditAdmin = (id)=>{
         const newName = prompt('Enter Admin name')
         const newPhoneNumber = prompt('Enter Admin Phone Number')
         const formData = {
            name:newName,
            phoneNumber:newPhoneNumber
         }
         dispatch(asyncEditAdmin(formData,id))
  }

  const handleDestroyAdmin = (id)=>{
    Swal.fire('Are you sure ,you want to suspend the admin')
    dispatch(asyncDestroyAdmin(id,{type :'soft'},{phoneNumber:1}))
  }

  const handleRestoreAdmin = (id)=>{
    const phoneNumber = prompt("Enter Admin phoneNumber")
    dispatch(asyncDestroyAdmin(id,{type :'restore'},{phoneNumber:(phoneNumber)}))

  }

  const handleDeleteAdmin = (id)=>{
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
            dispatch(asyncAccountDelete(props,id))
        }
    })

    
  }

    return (
        <div>
           {
            notSuspendedData.length > 0 ?
                <div>
                    <h1> Lists of Admins</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="col">S.No</th>
                                <th className="col">Admin Name</th>
                                <th className="col">Contact Number</th>
                                <th className="col">Description</th>
                                <th className="col">Modify</th>
                               </tr>
                        </thead>
                        <tbody>
                            { 
                                notSuspendedData.map((ele, i) => {
                                    return <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{ele.name}</td>
                                        <td>{ele.phoneNumber}</td>
                                        <td> <button type="button" className="btn btn-primary" onClick={() => { handleShowAdmin(ele) }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Show
                                        </button></td>
                                        <td><button onClick={() => { handleEditAdmin(ele._id) }} className="btn btn-info">Edit</button>
                                            <button onClick={() => { handleDestroyAdmin(ele._id) }} className="btn btn-danger">Suspend</button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                : <p style={{ color: 'Red' }}>No Admins are available </p>
         }
           
         <AddAdmin />
         {
            suspendedData.length > 0 ?
                <div>
                    <h1> Lists of Admins</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="col">S.No</th>
                                <th className="col">Admin Name</th>
                                <th className="col">Modify</th>
                               </tr>
                        </thead>
                        <tbody>
                            { 
                                suspendedData.map((ele, i) => {
                                    return <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{ele.name}</td>
                                          <td><button onClick={() => { handleRestoreAdmin(ele._id) }} className="btn btn-info">Restore</button>
                                            <button onClick={() => { handleDeleteAdmin(ele._id) }} className="btn btn-danger">Delete</button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                : <p style={{ color: 'Red' }}>No Admins to Restore </p>
         }
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{displayAdmin.name}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        VillageName-{villageData.name} <br />
                        contact Number -{displayAdmin.phoneNumber}<br />
                        </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    
        </div>
    )

   /* const handleShowProduct = (ele)=>{
        setShowProduct(ele)
    }

    const handleEditProduct = (id)=>{
        console.log(id, 'i')
        dispatch(asyncSetEditProductId(id))
    }
    
    const handleDestroyProduct = (id)=>{
        dispatch(asyncDestroyProduct(id))
    }
    

    return (
        <div>

        {
            productsData.data.length > 0 ?
                <div>
                    <h1> Lists of Products</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="col">S.No</th>
                                <th className="col">Product Name</th>
                                <th className="col" >Price</th>
                                <th className="col">Quantity</th>
                                <th className="col">Contact Number</th>
                                <th className="col">Description</th>
                                <th className="col">Modify</th>
                               </tr>
                        </thead>
                        <tbody>
                            {
                                productsData.data.map((ele, i) => {
                                    return <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{ele.name}</td>
                                        <td>{ele.price}</td>
                                        <td>{ele.quantity}</td>
                                        <td>{ele.phoneNumber}</td>
                                        <td> <button type="button" className="btn btn-primary" onClick={() => { handleShowProduct(ele) }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            Show
                                        </button></td>
                                        <td><button onClick={() => { handleEditProduct(ele._id) }} className="btn btn-info">Edit</button>
                                            <button onClick={() => { handleDestroyProduct(ele._id) }} className="btn btn-danger">Delete</button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
                : <p style={{ color: 'Red' }}>No Products are available </p>
        }

        {
            productsData.editId ? <EditAdmin/> : <AddAdmin/>
        }


        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{showProduct.name}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Description-{showProduct.description} <br />
                        Price -{showProduct.price}<br />
                        Quantity -{showProduct.quantity}<br/>
                        Contact Number - {showProduct.phoneNumber}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


) */
} 
export default Admin