import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { asyncGetProducts, asyncSetEditProductId, asyncDestroyProduct } from "../actions/productsActions"
import ReactWhatsapp from 'react-whatsapp'
import AddProduct from "./AddProduct"
import EditProduct from "./EditProduct"
const Products = () => {

    const dispatch = useDispatch()

    const [showProduct, setShowProduct] = useState('')
    const [status, setStatus] = useState('all')


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

    const ownProducts = productsData.data.filter(ele => ele.residentId === accountData._id)

    const handleShowProduct = (ele) => {

        setShowProduct(ele)
    }
    console.log(showProduct)
    const handleEditProduct = (id) => {
        dispatch(asyncSetEditProductId(id))
    }

    const handleDestroyProduct = (id) => {
        dispatch(asyncDestroyProduct(id))
    }

    const handleSelect = (e) => {
        setStatus(e.target.value)
    }
    console.log(status, 's')
    return (
        <div>
            {
                accountData.role === 'resident' ?
                    <div className="row">
                        <div className="col-md-5 ml-auto">
                            {productsData.editId ? <EditProduct /> : <AddProduct />}
                        </div>
                        <div className="col-md-7 mt-5" >
                            <select onClick={handleSelect} style={{ backgroundColor: "lightgreen" }}>
                                <option value='all' style={{ color: 'white' }}>All Products</option>
                                <option value='own' style={{ color: 'white' }}>My Products</option>
                            </select>
                            {
                                productsData.data.length > 0 && status === 'all' ?
                                    <>
                                        <center>
                                            <h1 style={{ color: "Darkblue" }}>Lists of All Products</h1>
                                        </center>

                                        <div className="container" >
                                            <div className="row">

                                                {productsData.data.map((ele, i) => {
                                                    return (
                                                        <div key={i} className="col-md-5 mt-3">
                                                            <div className="card" style={{ width: "18rem" }}>
                                                                <img src={`http://127.0.0.1:3020/${ele.image}`} alt="img" />
                                                                <div className="card-body" >
                                                                    <h5 className="card-title">Product Name-{ele.name}</h5>
                                                                    <h6 className="card-text" >Price-{ele.price}₹</h6>
                                                                    <a href="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { handleShowProduct(ele) }}>Show</a>
                                                                    <ReactWhatsapp number={ele.phoneNumber} message="hi Mr/Mrs ,we have seen your product in  Marketing space of village update app,we would like to talk about it"
                                                                        style={{ backgroundColor: 'green' }}><img src="https://th.bing.com/th?q=Whatsapp+Icon+Square&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=strict&t=1&mw=247"
                                                                            alt="img" height="35px" width="40px"
                                                                        /></ReactWhatsapp>
                                                                </div>

                                                            </div> </div>)
                                                })}</div> </div>  </> :


                                    productsData.data.length > 0 && status === 'own' ?
                                        <>
                                            <center>
                                                <h1 style={{ color: "Darkblue" }}>Lists of My Products</h1>
                                            </center>

                                            <div className="container" >
                                                <div className="row">

                                                    {ownProducts.map((ele, i) => {
                                                        return (
                                                            <div key={i} className="col-md-5 mt-3">
                                                                <div className="card" style={{ width: "18rem" }}>
                                                                    <img src={`http://127.0.0.1:3020/${ele.image}`} alt="img" />
                                                                    <div className="card-body">
                                                                        <h5 className="card-title">Product Name-{ele.name}</h5>
                                                                        <h6 className="card-text">Price-{ele.price}₹</h6>
                                                                        <a href="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { handleShowProduct(ele) }}>Show</a>
                                                                        <a href="#" className="btn btn-info" onClick={() => { handleEditProduct(ele._id) }}>Edit</a>
                                                                        <a href="#" className="btn btn-danger" onClick={() => { handleDestroyProduct(ele._id) }}>Delete</a>
                                                                    </div>

                                                                </div> </div>)
                                                    })}</div> </div>  </>

                                        : <p style={{ color: 'Red' }}>No Products are available </p>
                            }

                        </div> </div>
                    : <div> {
                        productsData.data.length > 0 ?
                            <>
                                <center>
                                    <h1 style={{ color: "Darkblue" }}>Lists of Products</h1>
                                </center>

                                <div className="container">
                                    <div className="row">

                                        {productsData.data.map((ele, i) => {
                                            return (
                                                <div key={i} className="col-md-4">
                                                    <div className="card" style={{ width: "18rem" }}>
                                                        <img src={`http://127.0.0.1:3020/${ele.image}`} height="200px" width="286px" alt="img" />
                                                        <div className="card-body" padding="10px" >
                                                            <h5 className="card-title">Product Name-{ele.name}</h5>
                                                            <h6 className="card-text">Price-{ele.price}₹</h6>
                                                            <a href="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { handleShowProduct(ele) }}>Show</a>
                                                            <ReactWhatsapp number={ele.phoneNumber} message="hi Mr/Mrs ,we have seen your product in  Marketing space of village update app,we would like to talk about it"
                                                                        style={{ backgroundColor: 'green' }}><img src="https://th.bing.com/th?q=Whatsapp+Icon+Square&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=strict&t=1&mw=247"
                                                                            alt="img" height="35px" width="40px"
                                                                        /></ReactWhatsapp>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })

                                        }  </div> </div>  </> : <p style={{ color: 'Red' }}>No Products are available </p>

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