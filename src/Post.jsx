import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
import { useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query';
import Header from './Header';
import { useState } from 'react';

function Post() {
  const [userId, setUserId] = useState(undefined);
  const [page, setPage ] = useState(1);

    const fectApi = async (context) => {
    //  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
   //  console.log('context:', context)
      const response = await axios.get(`http://localhost:3001/posts/${context.queryKey[1]}`);
      // console.log(response);
      return response.data;
    }

    const fectApi1 = async ({pageParam = 10}) => {
    //  console.log('context:', context)
     //   const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${context.queryKey[1]}`);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${pageParam}`);
        return response.data;
    }

    const fectUserDetail = async (context) => {
    //  console.log('context:', context)
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${context.queryKey[1]}`);
      return response.data;
  }

    // staleTime khoang thoi gian du lieu con moi

    // const results = useQueries({
    //   queries: [
    //     { queryKey: ['post', 1], queryFn: fectApi, staleTime: Infinity},
    //     { queryKey: ['post', 2], queryFn: fectApi1, staleTime: Infinity}
    //   ]
    // })

    // console.log("results: ", results);
// retry: khi goi data bi loi se hoi lai so lan khai bao retry: 2 voi thoi gian moi lan: retryDelay: 1000 -> 1s
 // const { isError, isLoading, data, isFetching } = useQuery(['posts'], fectApi, {retry: 5, retryDelay: 1000, cacheTime: 10000})
 //  const { isError, isLoading, data } = useQuery(['posts'], fectApi, { staleTime: 4000 })
      
 // const { isError, isLoading, isFetching, data } = useQuery(['posts', userId ], fectUserDetail, { enabled: !!userId })
    //  console.log(data);

  // bai 6 -  const { isError, isLoading, isFetching, isPreviousData, data } = useQuery(['posts', page], fectApi1, { keepPreviousData: true })
    const { isError, isLoading, isFetching, isPreviousData, data, fetchNextPage, fetchPreviousPage, isFetchingNextPage, hasNextPage, isFetchingPreviousPage, hasPreviousPage } = useInfiniteQuery(['posts', page], fectApi1, { 
      getNextPageParam: (lastPage, pages) => {
  //      console.log('pages: ', pages);
        if(pages.length <= 10) {
          return pages.length + 1
        }

        return undefined
      },
      getPeviousPageParam: (lastPage, pages) => {
        //      console.log('pages: ', pages);
          if(pages.length <= 10) {
            return pages.length - 1
          }
  
          return undefined
      }
     })

      
      // console.log("Check loading: ", { isLoading, isFetching });

      // neu co loi co goi lai 1 lan moi lan 1s roi moi tra ve loi
      // retry: 5, retryDelay: 1000

      if (isLoading) return <div> Loading React query...</div>

      if (isError) return <div> error </div>

      console.log("data: ", data , isFetchingNextPage, hasNextPage);

  return (
    <div className='posts-list'>
          {/* <ul>
            {
                data?.map((post) => {
                  return (
                    <li key = {post.id}>
                      {post.title}
                    </li>
                  )
                })
            }
          </ul> */}
          

          <h3>React query - Depentdent </h3>

            <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder='userId'/>
          <h3>{data?.title}</h3>

          Currentpage: { page }

          <button onClick={() => setPage(prev => Math.max(1, (prev - 1)))} disabled = { page === 1 | isPreviousData}>Previous</button>
          <button onClick={() => setPage(next => (next + 1))} disabled = { page === 10 | isPreviousData}>Next</button>
   
          {
            data.pages.map(page => {
              return (
                <h1 className='h1' key = {page.id}>{page.id} -- {page.title}</h1>
              )
            })
          }

          <button onClick={() => fetchNextPage({pageParam: 20})}
          disabled={isFetchingNextPage | !hasNextPage}
          >
             { isFetchingNextPage ? 'Loading more' : !hasNextPage ? ' No data': '   Load More'}
          </button>

          <button onClick={() => fetchPreviousPage()}
          disabled={isFetchingPreviousPage | !hasPreviousPage}
          >
             { isFetchingPreviousPage ? 'Loading more' : !hasPreviousPage ? ' No data Previous': '   Load More Previous Page'}
          </button>
    </div>
  )
}

export default Post
