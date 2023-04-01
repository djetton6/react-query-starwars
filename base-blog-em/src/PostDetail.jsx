
//Step #1 - import useQuery
import { useMutation, useQuery } from "react-query";
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


  //dependency arrray --- 
  const {data, isLoading, error, isError} = useQuery(['comments', post.id], 
  () => fetchComments(post.id))

  //can take in  an argument
  const deleteMutation = useMutation((postId) => deletePost(postId) 
  
  )

  if(isLoading) return <h1>Loading</h1>
  
  if(isError) return <h1>Error! {error}</h1>

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id) }>Delete</button>

      {/* conditional render */}
      {/* //mutation is an object! */}
      {deleteMutation.isError && (
        <p style={{color: 'red' }}>Error deleting post</p>
      )}

      {deleteMutation.isLoading && (
        <p style={{color: 'red' }}>Deleting the post post</p>
      )}

      {deleteMutation.isSuccess && (
        <p style={{color: 'green' }}>POST IS  ALL GOOD!!!</p>
      )}

      <button>Update title</button>

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
