import { useState } from "react";
import { useQuery } from "react-query";

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  // replace with useQuery
  // useQuery Facts:
  // 1. Destructures ALL the data since useQuery returns an object with data
  // 2. use query takes 2 things(what we want to name the query, and query function and needs to be async)
  
  const { data, isLoading, error, isError } = useQuery("posts", fetchPosts, {
    staleTime: 5,
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
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
