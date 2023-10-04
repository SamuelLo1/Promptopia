'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter} from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete, handleUnsave }) => {
  const date = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles',
        month: 'numeric',
        day:'numeric',
        year: 'numeric'
  });
  //displaying time of post
  const displayDate =(date)=> {
    if (date == post.date){
      return ("Today " + post.time);
    } else {
      return (post.date + " " + post.time);
    }
  }
  

  const {data : session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");
  
  //for checking if post is saved by user
  const [isSaved, setSaved] = useState(false);

  //check if user has saved
  useEffect(()=>{
    //if logged in 
    if (session?.user.id) {
      //check if saved
      if (post.saved.includes(session?.user.id)){
        setSaved(true);
        console.log("User has saved this post: ", post.prompt);
      } else {
        setSaved(false);
      }
    }
  }, [session?.user.id])

  // send a Patch Request to save the post
  // need to filter posts if the route is on saved
  // also need to figure out how to make the toast notifs only on one page at a time
  const handleSaved = async ()=>{
    try {
      const response = await fetch(`/api/save`, {
        method: "PATCH",
        body: JSON.stringify({
          id: post._id,
          userId: session?.user.id
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
    
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      //update the state of saved based on response
      const data = await response.json();
      setSaved(data.isSaved);
      if(data.isSaved){

        postSaved();

      } else {
        postUnsaved(); 
      }

   } catch (error) {
    console.log("Problem fetching", error);
   }
  };

  //update saved state based on if 
  const postSaved = () => {
    toast.success('Post saved', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  const postUnsaved = () => {
    toast.success('Post unsaved', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  const handleCopy = () => {
    setCopied(post.prompt);
    //writes prompt to the system clipboard
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000); 
  }
 
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src = {post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
           <div className='flex flex-col'> 
              <h3 className='font-satoshi font-semibold text-gray-200'>
                {post.creator.username}
              </h3>
              <p className="text-gray-300 font-inter text-sm">{displayDate(date)}</p>
          
            </div>
        </div>

          <div className='copy_btn ' onClick={handleCopy}>
            <Image
              src={copied === post.prompt ? 
                '/assets 2/icons/tick.svg'
                : '/assets 2/icons/copy.svg'
              }
              width={20}
              height={20}
              alt="copyIcon"
            />
          </div>

  
        
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-300'>
        {post.prompt}
      </p>
      <div className="flex justify-evenly mb-4">
        <p className='font-inter text-sm orange_gradient cursor-pointer'
          onClick={()=> handleTagClick && handleTagClick(post.tag)}
        >
          {post.tag}
        </p>

      {/* need to try to write an if function to check the path */}
      {session?.user.id  && (
          <div className='copy_btn justify-start-reverse' onClick={handleSaved}>
            <Image
              src={
                isSaved === true
                  ? '/assets 2/icons/save_fill.svg'
                  : '/assets 2/icons/save_open.svg'
              }
              width={20}
              height={20}
              alt="saveIcon"
            />
          </div>
        )
      }
     
    </div>
    <section className="flex flex-center gap-4 border-t border-gray-400 pt-3">
      <button className="mt-1 bg-transparent text-sm green_gradient font-semibold hover:text-orange-500 py-1 px-5 border border-green-500 rounded hover:border-orange-500">
        AI Response 
      </button>
    </section>
    {/* Make sure that user owns the post and is on profile page before rendering edit/dete options*/}
    {session?.user.id === post.creator._id && pathName === '/profile' && (
      <div className="mt-5 flex-center gap-4 border-t border-gray-400 pt-3">
        <p 
          className='font-inter text-sm green_gradient cursor-pointer'
          onClick={handleEdit}
        >
          Edit
        </p>
        <p 
          className='font-inter text-sm orange_gradient cursor-pointer'
          onClick={handleDelete}
        >
          Delete
        </p>
      </div>
    )}
  </div>
  )
}

export default PromptCard