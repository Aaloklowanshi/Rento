import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, TextField } from "@mui/material";
// import { post } from "../../../server/routes/user";
import { propertiesAtom } from "../store/atoms/properties";
import { useRecoilState } from "recoil";

const UpdateProperty = () => {
  const { postId } = useParams();
  const[properties , setProperties] = useRecoilState(propertiesAtom);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [location, setLocation] = useState("");
  const [shortlink, setShortLink] = useState("");
  const [availability, setAvailability] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/user/getpostdata/${postId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const postdata = response.data.postdata;
      setLocation(postdata.location);
      setType(postdata.type);
      setImageLink(postdata.imageLink);
      setAvailability(postdata.availability);
      setShortLink(postdata.shortlink);
      setDescription(postdata.description);
      console.log(postdata.imageLink);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [postId]);

  const handleUpdatePost = async()=>{

    try{
      const response = axios.put(`http://localhost:8000/user/posts/${postId}`,{
      type: type,
      description: description,
      price: price,
      location: location,
      imageLink: imageLink,
      availability: availability,
      shortlink : shortlink
    },{
          headers: {
              "Content-type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("token")
          },
      })
      let updatedPost = {
        type: type,
        description: description,
        price: price,
        location: location,
        imageLink: imageLink,
        availability: availability,
        shortlink : shortlink
    };
    setProperties({property: updatedPost});
    }
    catch(err){
      console.log("error updating the property" , err);
    }
  };

  return (
    <div className="mt-40 flex flex-col justify-center	items-center	">
      <div className=" h-5/6 w-4/5 border-2 border-solid ">
        <TextField
          value={type}
          onChange={(event) => {
            setType(event.target.value);
          }}
          id="outlined-textarea"
          placeholder="type"
          multiline
          fullWidth
        />
        <br />
        <TextField
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          id="outlined-textarea"
          placeholder="description"
          multiline
          fullWidth
        />
        <TextField
          value={price}
          onChange={(event) => {
            setPrice(event.target.value);
          }}
          id="outlined-textarea"
          placeholder="price"
          multiline
          fullWidth
        />
        <br />
        <TextField
          value={location}
          onChange={(event) => {
            setLocation(event.target.value);
          }}
          id="outlined-textarea"
          placeholder="location"
          multiline
          fullWidth
        />
        <br />
        <TextField
          value={availability}
          onChange={(event) => {
            setAvailability(event.target.value);
          }}
          id="outlined-textarea"
          placeholder="availability"
          multiline
          fullWidth
        />
        <br />
        {/* <TextField
          value={imageLink}
          onChange={(event) => {
            setImageLink(event.target.value);
          }}
          id="outlined-textarea"
          placeholder="imageLink"
          multiline
          fullWidth
        /> */}
        <br />
      </div>
      <Button
      onClick={handleUpdatePost}
      >
        Submit
      </Button>
    </div>
  );
};

export default UpdateProperty;
