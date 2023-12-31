
import Card from 'react-bootstrap/Card';
import React from 'react';


function BasicExample({ image, Title }) {

  const CardStyle = {
    height:"200px",
    width:"300px",
    backgroundColor : "black",
    borderRadius:"15px"
  }
  const CardBody ={
    height:"20%",
    textAlign: "center"
  }

  const CardImg = {
    height: "80%",
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px"
  }
  return (

      <Card className='text-white mt-2'  style={CardStyle}>
        <Card.Img variant="top" src={image} style={CardImg}/>

          <Card.Title style={CardBody}>{Title}</Card.Title>

 
      </Card>
  );
}

export default BasicExample;