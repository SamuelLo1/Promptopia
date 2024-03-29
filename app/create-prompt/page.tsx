'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@components/Form'



const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();
    //check if user is submitting
    const [submitting, setSubmitting] = useState(false);
    //check if user is posting
    const [post , setPost] = useState({
        prompt: '',
        tag: '', 
        response: '',
        
    })
    const createPrompt = async (e) => {
      //prevent a reload after submitting
      e.preventDefault();
      setSubmitting(true);

      try{
        //passing all the data in the body to the api endpoint
        //using Post req
        const response = await fetch("/api/prompt/new", {
          method: "POST",
          body: JSON.stringify({
            prompt: post.prompt,
            userId: session?.user.id,
            tag: post.tag,
            response: post.response
          }),
        });
  
        if (response.ok) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
  };
  
  return (
    <Form
        type = "Create"
        post = { post }
        setPost = {setPost}
        submitting = { submitting }
        handleSubmit = { createPrompt }

    >
        
    </Form>
  );
};

export default CreatePrompt