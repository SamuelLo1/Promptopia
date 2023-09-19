'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter} from 'next/navigation';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete, saved }) => {
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

  const handleCopy = () => {
    setCopied(post.prompt);
    //writes prompt to the system clipboard
    navigator.clipboard.writeText(post.prompt)
    setTimeout(() => setCopied(""), 3000); 
  }
  const handleSave = () => {
    setCopied(post.prompt);
    //writes prompt to the system clipboard
    navigator.clipboard.writeText(post.prompt)
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
            />
          </div>

  
        
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-300'>
        {post.prompt}
      </p>
      <div className="flex justify-evenly">
        <p className='font-inter text-sm orange_gradient cursor-pointer'
          onClick={()=> handleTagClick && handleTagClick}
        >
          {post.tag}
        </p>
        
 {session?.user.id && pathName !== '/profile' && (
    <div className='copy_btn justify-start-reverse' onClick={handleSave}>
      <Image
        src={
          copied === post.prompt
            ? '/assets 2/icons/save_fill.svg'
            : '/assets 2/icons/save_open.svg'
        }
        width={20}
        height={20}
      />
    </div>
  )
}






      </div>
      
      
      
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