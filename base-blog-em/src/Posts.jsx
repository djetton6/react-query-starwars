import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

//change the parameeter of pageNum to fetch whatever page the argument is on.
async function fetchPosts(pageuNum) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}"
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const queryClient = useQueryClient();

  // use a useEffect on the current change of the current page

  useEffect(() => {
    if (currentPage < maxPostPage) {
    //declare variable for the next page.
    const nextPage = currentPage + 1;
    //step 2 & 3 -> query key dependency array, and the annonymous function to call the fetch with the next page parameter.
    queryClient.prefetchQuery(["posts", nextPage],
      () => fetchPosts(nextPage)
      );
 } 
}, [currentPage, queryClient]);
  

  //DESMEND LEARNING NOTES
  // replace with useQuery
  // useQuery Facts:
  // 1. Destructures ALL the data since useQuery returns an object with data
  // 2. use query takes 2 things(what we want to name the query, and query function and needs to be async)
  

  //when query ket changes ->currentPage, it's a new useQuery to fetch posts. 
  const { data, isLoading, error, isError } = useQuery(["posts", currentPage], 
  () =>
    fetchPosts(currentPage), 
    {
    staleTime: 500,
    //keep previous data in cache
    keepPreviousData: true,
  });
  //have to do an early return since it's async.
  if(isLoading) return <div><h2>Loading!</h2></div>
  if(isError) return <div><h2> We're working on it!{error}</h2></div>

  
  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled={currentPage <= 1} 
          onClick={() => {
            //you can declare amd return a value in the same step.
            setCurrentPage((previousValue => previousValue - 1));
          }}>
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button disabled={currentPage >= maxPostPage} 
          onClick={() => {
          setCurrentPage((previousValue => previousValue +1))
        }}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
