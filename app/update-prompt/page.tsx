'use client'
import { useState , useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'



const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const promptId= searchParams.get('id');
    //check if user is submitting
    const [submitting, setSubmitting] = useState(false);
    //check if user is posting
    const [post , setPost] = useState({
        prompt: '',
        tag: ''
    })

    useEffect(()=>{
        const getPromptDetails = async () =>{
          const response = await fetch('/api/prompt/${promptId}')
          const data = await response.json();
          
          //update the post with edited value
          setPost({
            prompt: data.prompt,
            tag: data.tag,
          })
        }

        if (promptId) getPromptDetails()
    }, [promptId])
    /*
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
  */

  return (
    <Form
        type = "Edit"
        post = { post }
        setPost = {setPost}
        submitting = { submitting }
        handleSubmit = {()=>{} }

    >
        
    </Form>
  );
};

export default EditPrompt;