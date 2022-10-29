import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import { useQueries, useQuery } from '@tanstack/react-query';
import Header from './Header';

function Post() {
    const fectApi = async () => {
    //  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      const response = await axios.get('http://localhost:3001/posts');
      // console.log(response);
      return response.data;
    }

    const fectApi1 = async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return response.data;
    }

    // staleTime khoang thoi gian du lieu con moi

    const results = useQueries({
      queries: [
        { queryKey: ['post', 1], queryFn: fectApi, staleTime: Infinity},
        { queryKey: ['post', 2], queryFn: fectApi1, staleTime: Infinity}
      ]
    })

    console.log("results: ", results);
// retry: khi goi data bi loi se hoi lai so lan khai bao retry: 2 voi thoi gian moi lan: retryDelay: 1000 -> 1s
 // const { isError, isLoading, data, isFetching } = useQuery(['posts'], fectApi, {retry: 5, retryDelay: 1000, cacheTime: 10000})
  const { isError, isLoading, data, isFetching } = useQuery(['posts'], fectApi, { staleTime: 4000 })

  console.log("Check loading: ", { isLoading, isFetching });

  // neu co loi co goi lai 1 lan moi lan 1s roi moi tra ve loi
  // retry: 5, retryDelay: 1000

  if (isLoading) return <div> Loading React query...</div>

  if (isError) return <div> error </div>
// console.log(data);

  return (
    <div className='posts-list'>
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
