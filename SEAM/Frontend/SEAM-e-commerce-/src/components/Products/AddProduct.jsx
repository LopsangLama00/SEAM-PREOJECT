import React,{useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button' ;
import axios from '../AxiosRequests/BaseUrl';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer} from 'react-toastify';
import NavScrollExample from '../Navbar';
import { useNavigate } from 'react-router-dom';


export default function AddProduct() {

  const navigate = useNavigate();
    const [error, SetError] = useState ({
        product_title:"",
        product_description: "",
        selling_price:"",
        discounted_price:"",
        category:"",
        quantity:"",
        product_image:null,
    })
    
    const [ProductDetails, SetProductDetails] = useState({
        product_title:"",
        product_description: "",
        selling_price:"",
        discounted_price:"",
        category:"",
        quantity:"",
        product_image:null,
  
    })

    const handleChange = (e) => {
        if (e.target.type === "file"){
            SetProductDetails((prev) => ({
                ...prev,
                [e.target.name]: e.target.files[0], // Assuming you want to store the first selected file
              }));
        }
        else{
            SetProductDetails((prev) => ({
                ...prev,
                [e.target.name]: e.target.name === 'selling_price' || e.target.name === 'discounted_price'
                  ? parseFloat(e.target.value)
                  : e.target.value,
              }));
            }
    }

    const handleSubmit = async(e,values) => {
        SetError({});
        const formData = new FormData();
        formData.append("product_title", values.product_title);
        formData.append("product_description", values.product_description);
        formData.append("selling_price", values.selling_price);
        formData.append("discounted_price", values.discounted_price);
        formData.append("category", values.category);
        formData.append("quantity", values.quantity);
        formData.append("product_image", values.product_image);
        if (values.product_title === "") { 
          SetError((prev) =>{
            return {
              ...prev,
              product_title: "Product Name is Required"
            }
          })  
        }
        else if(values.discounted_price <= 0){
          SetError((prev) =>{
            return {
              ...prev,
              discounted_price: "Discounted Price must be added so that When offer comes , We can show this "
            }
          })
        }
        else if(values.selling_price <= 0){
          SetError((prev) =>{
            return {
              ...prev,
              selling_price: "Selling Price must be added"
            }
          })
        }
        else if(values.product_description === ""){
          SetError((prev) =>{
            return {
              ...prev,
              product_description: "Product Description  is required"
            }
          })
        }
        else if(values.category === ""){
          SetError((prev) =>{
            return {
              ...prev,
              category: "Category must be Selected"
            }
          })
        }
        else if(values.quantity === ""){
          SetProductDetails((prev) =>{
            return {
              ...prev,
              quantity: "1"
            }
          })
        }
        else if(values.product_image === 0){
          SetError((prev) =>{
            return {
              ...prev,
              product_image: "Product Image is not Selected"
            }
          })
        }
        else
        
        axios.post("/productlist",formData,{  headers: {
            "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
          },
        })
        .then((res) => {
          console.log(res)
          toast.success("Product Added Successful")
            setTimeout(()=>{
navigate("/")
            },1000)



        }).catch ((error) => {
        console.log(error)
        console.log(error.message)
        if(error.response.status == 400 ){
          toast.error("Bad Request")
        }
        else if(error.response.status == 500){
          toast.error("Something went wrong")
        }
        
      })
      

      
  e.preventDefault();

  }

  



    

  return (
    <>
    <div className="container"  >

    <div className="add-product mt-5 mx-5 shadow p-5" >
    <ToastContainer/>
        <h4 className="text-center text-primary" > Add Product</h4>
        <Form  onSubmit={(e) => handleSubmit(e,ProductDetails)} encType="multipart/form-data">
            <Form.Group controlId="product_title" className="mb-3">
                <Form.Label className="">Product Name</Form.Label>
                <Form.Control type="text" name="product_title"  onChange={handleChange} value={ProductDetails.product_title} />
                <p className="text-danger" >{error.product_title}</p>
            </Form.Group>
            <Form.Group controlId="product_description" className="mb-3">
                <Form.Label className="">Product Description</Form.Label>
                <Form.Control type="text" as="textarea"  name="product_description" rows={3} onChange={handleChange} value={ProductDetails.product_description} />
                <p className="text-danger" >{error.product_description}</p>
            </Form.Group>
            <Form.Group controlId="selling_price" className="mb-3">
                <Form.Label className="">Selling Price</Form.Label>
                <Form.Control type="number" name="selling_price"  onChange={handleChange} value={ProductDetails.selling_price} />
                <p className="text-danger" >{error.selling_price}</p>
            </Form.Group>
            <Form.Group controlId="Discounted_price" className="mb-3">
                <Form.Label className="">Discounted Price</Form.Label>
                <Form.Control type="number" name="discounted_price"  onChange={handleChange} value={ProductDetails.discounted_price}/>
                <p className="text-danger" >{error.discounted_price} </p>
            </Form.Group>
            <Form.Group controlId="category" className="mb-3">
                <Form.Label >Product Category</Form.Label>
                <Form.Control 
                    as="select"
                    onChange={handleChange}
                    name="category"
                    values={ProductDetails.category}
                >
                    <option value="">Select...</option>
                    <option value="BK">Bike</option>
                    <option value="SM">Smartphone</option>
                    <option value="CH">Charger</option>
                    <option value="WH">Watch</option>
                    <option value="TM">Trimmer</option>
                    <option value="LP">Laptop</option>
                
                </Form.Control >
                <p className="text-danger" >{error.category}</p>
            </Form.Group>
            <Form.Group controlId="quantity" className="mb-3">
                <Form.Label >Quantity of Product</Form.Label>
                <Form.Control type="number" name="quantity"  onChange={handleChange} value={ProductDetails.quantity}/>
                <p className="text-danger" >{error.quantity} </p>
            </Form.Group>
            <Form.Group controlId="product_image" className="mb-3">
                <Form.Label >Product Image</Form.Label>
                <Form.Control type="file" name="product_image" onChange={handleChange} />
                <p className="text-danger" >{error.product_image}</p>
            </Form.Group>

            <Button variant="outline-primary" type="submit" >
                Add Product
            </Button>
        </Form>
    </div>
    </div>
    </>
  )
}
