import React,{useState, useEffect} from 'react';
import axios from '../AxiosRequests/BaseUrl';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';




export default function GetProductTest() {

    
  const [ProductData, setProductData]=useState ([]);
  const [isError, setIsError] = useState("");
  

  const GetApiData = async() => {
        try {
            const res = await axios.get("/productlist");
            setProductData(res.data);
            // console.log(res.data)

        } catch (error) {
            setIsError(error);
            console.log(error)
        }
        

  }
  useEffect(() => {
    GetApiData();

  },[])
  const CardStyle = {
      height:"380px",
      width: "300px",

  }
  const ImgStyle = {
      height:"150px",

  }
  const TitleStyle = {
      height: "100px",

  }

  const ButtonStyle = {
      height: "60px"
  }
  // let DataNum = ProductData.length
  // console.log(DataNum)


  function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartItems');
    productNumbers = parseInt(productNumbers);
  
    if (productNumbers) {
      localStorage.setItem('cartItems', productNumbers + 1);
      document.querySelector('.navbar-cart span').textContent = productNumbers + 1;
    } else {
      localStorage.setItem('cartItems', 1);
      document.querySelector('.navbar-cart span').textContent = 1;
    }
  
    setItem(product);
  }
  
  function setItem(product) {
    // Get the existing products from localStorage or initialize an empty array
    let productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || [];
  
    // Check if the product is already in the cart
    const existingProductIndex = productsInCart.findIndex((item) => item.id === product.id);
  
    if (existingProductIndex !== -1) {
      // If the product is already in the cart, increment its quantity
      productsInCart[existingProductIndex].quantity += 1;
    } else {
      // If it's a new product, add it to the cart array
      product.quantity = 1; // Initialize quantity to 1
      productsInCart.push(product);
    }
  
    // Update the 'productsInCart' in localStorage
    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
  }

  function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null){
      cartCost = parseFloat(cartCost)
      product.discounted_price = parseFloat(product.discounted_price)
      localStorage.setItem('totalCost',cartCost + product.discounted_price)
    }else{
      cartCost = parseFloat(cartCost)
      product.discounted_price = parseFloat(product.discounted_price)
      localStorage.setItem('totalCost', product.discounted_price)
    }

    cartCost = localStorage.getItem('totalCost');  
    console.log("The Cart Cost is ", cartCost)

  }

  const AddCart = (product) => {

    let productDetails = {
      product: {
        title: product.product_title,
        image: product.product_image,
        description: product.product_description,
        selling_price: product.selling_price,
        discounted_price: product.discounted_price,
      }
    }

    // Output the object to the console
    console.log(productDetails);

    cartNumbers(product); 
    totalCost(product);
    // Pass the productDetails object to cartNumbers
  }







  // useEffect(() => {
  //  axios
  //   .get("http://127.0.0.1:8000/UserData")
  //   .then((res) => setUserData(res.data))
  //   .catch((error)=> setIsError(error.message));
  // },[])


 
  

  return (
    <>

    <div className="container-fluid Product-List ">
    <span className = "section-title fw-bold p-4 " > For You </span>
    {isError !== "" && <h2>{isError} </h2>}
    <div className="product-list d-flex gap-5 justify-content-space-between flex-wrap p-4">
     {ProductData.map((product) => {
      const {id,product_title,product_image,product_description, selling_price, discounted_price} = product;
      return <div className="product shadow"  key={id}>
        <Card  className="card-main" style={CardStyle}>
          <Card.Img variant="top" src={"http://localhost:8000" + product_image} style={ImgStyle} />
          <Card.Body className="product-title" style={TitleStyle}>
            <Card.Title >{product_title}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush" >
            <ListGroup.Item className="sell-price text-danger text-decoration-line-through">Rs. {selling_price}</ListGroup.Item>
            <ListGroup.Item className="discount-price">Rs. {discounted_price}</ListGroup.Item>
          </ListGroup>
          <Card.Body style={ButtonStyle}>
            <Button variant="primary" type="submit" className="add-cart" onClick={() => AddCart(product)}>Add To Cart</Button>
          </Card.Body>
        </Card>
      </div> }
      
     )} 
    </div>
    </div>
</>  
)

}
