import React, { useEffect, useState } from 'react'
import "./post.css"
import axios from 'axios';
import { Button, Card, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Post = () => {
  const [posts, setPosts] = useState([]);

  const fetchProperties = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user/posts", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setPosts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (deletedID) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== deletedID));
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
      {posts?.map((oneproperty) => (
        <Property key={oneproperty._id} oneproperty={oneproperty} onDelete={handleDelete} />
      ))}
    </div>
  );
};

// export default Post;

export function Property({ oneproperty, onDelete }) {
  const navigate = useNavigate();
  const type = oneproperty.type || '';
  const description = oneproperty.description || '';
  const price = oneproperty.price || '';
  const location = oneproperty.location || '';

  const handleDeletePost = async (ID) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(`http://localhost:8000/user/deletepost/${ID}`, {
        headers: headers,
      });
      console.log("deleted");
      onDelete(ID);
    } catch (err) {
      console.log("error deleting the post", err);
    }
  };

  return (
    <Card style={{ margin: 10, width: 300, minHeight: 200, padding: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper>
            <Typography textAlign={'center'} variant="h5">
              {type}
            </Typography>
            <Typography textAlign={'center'} variant="h5">
              {description}
            </Typography>
            <Typography textAlign={'center'} variant="h5">
              {price}
            </Typography>
            <Typography textAlign={'center'} variant="h5">
              {location}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Button onClick={() => handleDeletePost(oneproperty._id)}>
        Delete
      </Button>
      <Button
      onClick={()=>{
        navigate('/posts/'+ oneproperty._id);
      }}
      >
        Edit
      </Button>
    </Card>
  );
}

// export default Property;