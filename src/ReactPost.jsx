import axios from 'axios'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const ReactPost = () => {
    const [posts, setPosts] = useState([]);
    const fectApi = async () => {
    //   const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
       const response = await axios.get(' http://localhost:3001/posts');
       setPosts(response.data);
    }

    useEffect(() => {
        fectApi();
    },[])

    if (!posts.length) return <div>Loading...</div>

  return (
    <div>
        <ul>
            {
                posts?.map(post => {
                    return (
                        <li key = { post.id }>
                            { post.title }
                        </li>
                    )
                })
            }
        </ul>
    </div>
  )
}

export default ReactPost