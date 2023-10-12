'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { usePathname} from 'next/navigation';
import Modal from "@components/Modal";
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import { coldarkDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import Saved from "@components/saved";
import AiResponse from "@components/Airesponse";

const myProfile = () => {
  SyntaxHighlighter.registerLanguage('jsx', jsx);

  const {data : session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const pathName = usePathname(); 
  /*
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
  */
  //modify to handle Unsave
  /*
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
  */
  //WIP: 
  //Need to test the modals
  //Need to test framer to allow for animated modal
  //Need to make a function in the promptCard which handles the Modal popup. 
  //First make it static and then make dynamic where cards can each have their own modal
  // <section>
  //     <Saved
  //       name="My"
  //       desc = "Welcome to your saved content"
  //       data ={posts}
  //       handleUnsave={handleUnsave}
  //     />
  //   </section>
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResp] = useState("");

   useEffect(() =>{
    const temp = `6526ef3c0077ba7f514af3d8`;
    const fetchPosts = async ()=> {
      const response = await fetch(`/api/response/${temp}`);
      const data = await response.json();

      setResp(data.response);
    }
    if(session?.user.id){
      fetchPosts();
    }
    fetchPosts();
  },  [session?.user.id] );

  const codeString =`
  ${response}
 `;

 //figure out how to import styles to the code DONE

 //Try getting the request from database and see if I can parse through that response
 //try parsing through a chatgpt response to extract the code and message seperately
  return (
    <>
      {typeof(response)}
      <button onClick={()=>setIsOpen(true)}className="px-4 py-3 bg-orange-500 rounded"> Get Modal </button>
      <Modal  open={isOpen} onClose={()=>setIsOpen(false)} >
        <div className="overflow-auto	">
          <AiResponse response={response}  />
        </div>
      </Modal>
    </>
  )
}

export default myProfile