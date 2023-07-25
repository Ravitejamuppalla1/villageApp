import { useDispatch } from "react-redux"
import ProductForm from "./ProductForm"
import { asyncEditProduct,asyncSetEditProductId } from "../actions/productsActions"

const EditProduct = ()=>{
    const dispatch =useDispatch()
    const productSubmission = (formData,reset,id)=>{
        dispatch(asyncEditProduct(formData,reset,id))
         dispatch(asyncSetEditProductId(''))
 } 
    return(
        <div>
             <ProductForm productSubmission={productSubmission} />
       </div>
    )
}


export default EditProduct