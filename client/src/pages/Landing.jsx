import { Avilablepro } from "../components/Avilablepro"
import { Button } from "@mui/material"
import './Landing.css';
import { Navigate, useNavigate } from "react-router-dom"
import BannerBackground from "../assets/Group 1881.png";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { propertiesAtom } from "../store/atoms/properties";

export const Landing = () => {
    const navigate = useNavigate();
    const[properties , setProperties] = useRecoilState(propertiesAtom);

    const fetchProperties = async () => {
        try {
            const response = await axios.get("http://localhost:8000/user/getallposts", {
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
                        
            setProperties(response.data);
          } catch (err) {
            console.log(err);
          }
            
        };   

        useEffect(() => {
            fetchProperties();
        }, []);
    
    
    return ( 
    <div className="home-container">
        
        
            <div className="landing-banner-container">
                <div className="landing-banner-container">
                    <img className="landingpage-img" src = {BannerBackground} alt="" />
                </div>
            
                <div className="home-text-section">
                    <h1 className="primary-heading">
                    The most affortable place to <br />stay in Your favourite place
                    </h1>
                </div> 
            </div>

            <Avilablepro/>

    </div> )
}