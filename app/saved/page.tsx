'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Saved from "@components/saved";

const myProfile = () => {
  const {data : session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  useEffect(() =>{
    const fetchPosts = async ()=> {
      const response = await fetch(`/api/save/${session?.user.id}`);
      const data = await response.json();

      setPosts(data);
    }

    console.log(posts);
    if(session?.user.id){
      fetchPosts();
    }
    fetchPosts();
  },  [session?.user.id] );




  return (
    <Saved
      name="My"
      desc = "Welcome to your saved content"
      data ={posts}
    />

  )
}

export default myProfile