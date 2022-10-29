import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Header from './Header';

function Post() {
    const fectApi = async () => {
    //  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      const response = await axios.get(' http://localhost:3001/posts');
      return response.data;
    }

  const { isError, isLoading, data, isFetching } = useQuery(['posts'], fectApi, {retry: 5, retryDelay: 1000, cacheTime: 10000})

  console.log("Check loading: ", { isLoading, isFetching });

  // neu co loi co goi lai 1 lan moi lan 1s roi moi tra ve loi
  // retry: 5, retryDelay: 1000

  if (isLoading) return <div> Loading React query...</div>

  if (isError) return <div> error </div>
// console.log(data);

  return (
    <div>
          <ul>
            {
                data?.map((post) => {
                  return (
                    <li key = {post.id}>
                      {post.title}
                    </li>
                  )
                })
            }
          </ul>
    </div>
  )
}

export default Post
