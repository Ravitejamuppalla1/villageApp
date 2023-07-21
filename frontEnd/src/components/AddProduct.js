import { useDispatch } from "react-redux"
import { asyncCreateProduct } from "../actions/productsActions"
import ProductForm from "./ProductForm"

const AddProduct = ()=>{
    const dispatch =useDispatch()

    const productSubmission = (formData,reset)=>{
        console.log(formData.files, "formdata")
           dispatch(asyncCreateProduct(formData,reset))
    } 
    return(
        <div>
              <ProductForm  productSubmission={productSubmission}/>
     </div>
    )
}

export default AddProduct