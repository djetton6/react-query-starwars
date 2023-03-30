
//Step #1 - import useQuery
import { useQuery } from "react-query";
import { useState } from 'react';

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery- assignmeent
  // Step 1: add useQuery to the project
  //Step 2, destructure the data, loading and error = useQuery['key-(usually variable', and async func]
  //Step 3 -> make an annoynmous function () => post.id so we can't pass/

  const {data, isLoading, error, isError} = useQuery('comments', () => fetchComments(post.id))
  if(isLoading) return <h1>Loading</h1>
  if(isError) return <h1>Error! {error}</h1>

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
