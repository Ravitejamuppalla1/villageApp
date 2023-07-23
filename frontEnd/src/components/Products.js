import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { asyncGetProducts, asyncSetEditProductId, asyncDestroyProduct } from "../actions/productsActions"
import { asyncAccountDetails } from "../actions/usersActions"
import AddProduct from "./AddProduct"
import EditProduct from "./EditProduct"
const Products = () => {

    const dispatch = useDispatch()

    const [showProduct, setShowProduct] = useState('')

    useEffect(() => {
        dispatch(asyncGetProducts())
        dispatch(asyncAccountDetails())
    }, [])

    const productsData = useSelector((state) => {
        return state.products
    })

    const accountData = useSelector((state) => {
        return state.users.userDetails
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
                                    <th className="col">Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productsData.data.map((ele, i) => {
                                        console.log(ele.image)
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
                                            <td><img src={`http://127.0.0.1:3020/${ele.image}`} height="80px" width="150px" alt="img" /></td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    : <p style={{ color: 'Red' }}>No Products are available </p>
            }
            {accountData.role === 'resident' ?

                productsData.editId ? <EditProduct /> : <AddProduct /> : <></>
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