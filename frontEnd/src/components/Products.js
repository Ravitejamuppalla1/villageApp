import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { asyncGetProducts, asyncSetEditProductId, asyncDestroyProduct } from "../actions/productsActions"
import { asyncAccountDetails } from "../actions/usersActions"
import AddProduct from "./AddProduct"
import EditProduct from "./EditProduct"
const Products = () => {

    const dispatch = useDispatch()

    const [showProduct, setShowProduct] = useState('')

    const accountData = useSelector((state) => {
        return state.users.userDetails
    })

    useEffect(() => {
        if (accountData.role === 'resident') {
            dispatch(asyncGetProducts(accountData.villageId))
        }
        else if (accountData.role === 'admin') {
            dispatch(asyncGetProducts(accountData._id))
        }

    }, [accountData])

    const productsData = useSelector((state) => {
        return state.products
    })



    const handleShowProduct = (ele) => {
        setShowProduct(ele)
    }

    const handleEditProduct = (id) => {
        dispatch(asyncSetEditProductId(id))
    }

    const handleDestroyProduct = (id) => {
        dispatch(asyncDestroyProduct(id))
    }


    return (
        <div>
            {
                accountData.role === 'resident' ?
                    <div className="row">
                        <div className="col-md-5 ml-auto">
                            {productsData.editId ? <EditProduct /> : <AddProduct />}
                        </div>
                        <div className="col-md-7 mt-5" >
                            {
                                productsData.data.length > 0 ? 

                                productsData.data.map((ele, i) => {
                                   return (
                                        <div className="card" style={{width: "18rem"}}>
                                            <img src={`http://127.0.0.1:3020/${ele.image}`} alt="img" />
                                                <div className="card-body">
                                                    <h5 className="card-title">Product Name-{ele.name}</h5>
                                                    <h6 className="card-text">Contact Number-{ele.phoneNumber}</h6>
                                                    <a href="#" className="btn btn-primary" onClick={() => { handleShowProduct(ele) }}>Show</a>
                                                    <a href="#" className="btn btn-info" onClick={() => { handleEditProduct(ele._id) }}>Edit</a>
                                                    <a href="#" className="btn btn-danger" onClick={() => { handleDestroyProduct(ele._id) }}>Delete</a>
                                                </div>
                                   
                                   </div> )})  : <p style={{ color: 'Red' }}>No Products are available </p>  
                                }
                                    
                             </div> </div>
                    : <div> {
                        productsData.data.length > 0 ? 
                           <>
                          <center>
                            <h1 style={{color:"Darkblue"}}>Lists of Products</h1>
                            </center>
                        {   
                        productsData.data.map((ele, i) => {
                           return (
                                <div className="card" style={{width: "18rem"}}>
                                    <img src={`http://127.0.0.1:3020/${ele.image}`} height="200px" width="286px" alt="img" />
                                        <div className="card-body">
                                            <h5 className="card-title">Product Name-{ele.name}</h5>
                                            <h6 className="card-text">Contact Number-{ele.phoneNumber}</h6>
                                            <a href="#" className="btn btn-primary" onClick={() => { handleShowProduct(ele) }}>Show</a>
                                            </div>
                           
                           </div> )}) }</> : <p style={{ color: 'Red' }}>No Products are available </p>  
                       
                    }  </div>
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
                            Quantity -{showProduct.quantity}<br />
                            Contact Number - {showProduct.phoneNumber}
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

export default Products