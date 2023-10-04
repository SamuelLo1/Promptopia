'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { usePathname} from 'next/navigation';


import Saved from "@components/saved";

const myProfile = () => {
  const {data : session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const pathName = usePathname(); 
  useEffect(() =>{
    const fetchPosts = async ()=> {
      const response = await fetch(`/api/save/${session?.user.id}`);
      const data = await response.json();

      setPosts(data);
    }
    if(session?.user.id){
      fetchPosts();
    }
    fetchPosts();
  },  [session?.user.id] );

  //modify to handle Unsave
  const handleUnsave = async (post) => {
    try {
      const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
      //works like map function where it updates the current state of posts to exclude the deleted post
      const filteredPosts = posts.filter((p) => p._id !== post._id)
      setPosts(filteredPosts)

    } catch (error){
      console.log(error);
    }
  }


  return (
    <section>
      <Saved
        name="My"
        desc = "Welcome to your saved content"
        data ={posts}
        handleUnsave={handleUnsave}
      />
      {pathName === '/saved' ? (
        <>
        <ToastContainer />
        </>
      ) :(
        <>
        </>
      )}
    </section>

  )
}

export default myProfile