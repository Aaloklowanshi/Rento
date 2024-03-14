import React from 'react'
import  {useState } from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { propertiesAtom } from '../store/atoms/properties';
import { useRecoilState } from "recoil";


const CreateProperty = () => {

    const navigate = useNavigate();

    const[properties , setProperties] = useRecoilState(propertiesAtom);


    const [typeOfProperty , setTypeOfProperty] = useState("");
    const [description , setDescription] = useState("");
    const [Price , setPrice] = useState("");
    const [imageLink  , setImageLink] = useState(null);
    const [location  , setLocation] = useState("");
    const [shortLink  , setShortLink] = useState("");
    const [availability  , setAvailability] = useState(true);
    const [author  , setAuthor] = useState("");

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImageLink(selectedImage);
      };

    const handleCreateProperty = async()=>{
        try{
            const response = await axios.post(" http://localhost:8000/user/properties" , {
                typeOfProperty : typeOfProperty,
                description : description,
                price : Price,
                imageLink : imageLink,
                location : location,
                shortLink : shortLink,
                avialability : availability
            }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });
        let newProperty = {
            typeOfProperty : typeOfProperty,
                description : description,
                price : Price,
                imageLink : imageLink,
                location : location,
                shortLink : shortLink,
                availability : availability
        }
        await setProperties(newProperty);        
        alert("Property Added congo!");
        navigate("/");
        

        }catch(err){
            console.log("there is problem creating the property" , err);
        }

    }
  return (
    <div>
    <div style={{
        paddingTop: 150,
        marginBottom: 10,
        display: "flex",
        justifyContent: "center"
    }}>
        <Typography variant={"h6"}>
           Post the property you want to .....
        </Typography>
    </div>
    <div style={{display: "flex", justifyContent: "center"}}>
        <Card variant={"outlined"} style={{width: 400, padding: 20}}>
            <TextField
                fullWidth={true}
                label="Type of property"
                variant="outlined"
                onChange={(e) => setTypeOfProperty(e.target.value)}
            />
            <br/><br/>
            <TextField
                fullWidth={true}
                label="Description"
                variant="outlined"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
            />
            <br/><br/>
            <TextField
                fullWidth={true}
                label="Price"
                variant="outlined"
                type="text"
                onChange={(e) => setPrice(e.target.value)}
            />
            <br/><br/>
            <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setImageLink(e.target.files[0])}

                  />
            <div className="mb-3">
                {imageLink && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(imageLink)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
            <br/><br/>
            <TextField
                fullWidth={true}
                label="Address"
                variant="outlined"
                type="text"
                onChange={(e) => setLocation(e.target.value)}
            />
            <br/><br/>
            <TextField
                fullWidth={true}
                label="ShortLink"
                variant="outlined"
                type="text"
                onChange={(e) => setShortLink(e.target.value)}
            />
            <br/><br/>
            <TextField
                fullWidth={true}
                label="Availability"
                variant="outlined"
                type="text"
                onChange={(e) => setAvailability(e.target.value)}
            />
            <br/><br/>
            <Button
                size="large"
                variant="contained"
                onClick={handleCreateProperty}
            >
                Create Property
            </Button>
        </Card>
    </div>
</div>
  )
}

export default CreateProperty



