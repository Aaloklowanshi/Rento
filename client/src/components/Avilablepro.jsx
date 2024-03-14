import React, { useState } from "react";
import { Grid, Paper, Typography, Card, Button } from "@mui/material";
import { useRecoilValue } from "recoil";
import { propertiesAtom } from "../store/atoms/properties";
import { searchedValueAtom } from "../store/atoms/user";
import axios from "axios";

export function Avilablepro() {
  const properties = useRecoilValue(propertiesAtom);
  const searchedValue = useRecoilValue(searchedValueAtom);

  if (!properties || properties.length === 0) {
    return null;
  }

  const filteredProperties = searchedValue ? properties.filter(
        (oneproperty) =>
          (oneproperty.type || "")
            .toLowerCase()
            .includes((searchedValue || "").toLowerCase()) ||
          (oneproperty.description || "")
            .toLowerCase()
            .includes((searchedValue || "").toLowerCase()) ||
          (oneproperty.location || "")
            .toLowerCase()
            .includes((searchedValue || "").toLowerCase())
      )
    : properties;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {filteredProperties?.map((oneproperty) => (
        <Property key={oneproperty.id} oneproperty={oneproperty} />
      ))}
    </div>
  );
}

export function Property({ oneproperty }) {
  // const [isBookmarked, setIsBookmarked] = useState(false);

  // const handleBookmark = async () => {
  //   try{
  //     const response = axios.post("http://localhost:8000/user/add" , {

  //     } , {
  //       headers: {
  //         "Authorization": "Bearer " + localStorage.getItem("token")
  //     }
  //     }
  //     )
  //   }
  //   catch(err){
  //     console.log("error bookmarking the property" , err);
  //   }
  // };
  const type = oneproperty.type || "";
  const description = oneproperty.description || "";
  const price = oneproperty.price || "";
  const location = oneproperty.location || "";
  const imageLink = oneproperty.imageLink || "";

  // const { type = '', description = '', price = '', location = '',  address = '', title = '' } = oneproperty;

  return (
    <Card style={{ margin: 10, width: 300, minHeight: 400, padding: 20 }}>
      <div className="bg-gray-500 mb-2 rounded-2xl flex">
        {/* {photos?.[0] && ( */}
        <img
          className="rounded-2xl object-cover aspect-square"
          src={imageLink}
          alt=""
        />
        {/* )} */}
      </div>
      <Typography textAlign={"center"} variant="h5" className="font-bold mt-2">
        {type}
      </Typography>
      <Typography
        textAlign={"center"}
        variant="h5"
        className="text-sm text-gray-500"
      >
        {description}
      </Typography>
      <Typography textAlign={"center"} variant="h5" className="font-bold mt-1">
        ${price} per night
      </Typography>
      <Typography textAlign={"center"} variant="h5">
        {location}
      </Typography>
      <Button>Bookmark</Button>
      <Button>Get Details</Button>
    </Card>
  );
}
