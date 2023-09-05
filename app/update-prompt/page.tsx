'use client'
import { useState , useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

import Form from '@components/Form'



const EditPrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const promptId= searchParams.get('Id');
    //check if user is submitting
    const [submitting, setSubmitting] = useState(false);
    //check if user is posting
    const [post , setPost] = useState({
        prompt: '',
        tag: ''
    })

    useEffect(()=>{
        
    }, [promptId])
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

export default EditPrompt;