'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Form from '@components/Form'


const CreatePrompt = () => {
    //check if user is submitting
    const [submitting, setSubmitting] = useState(false);
    //check if user is posting
    const [post , setPost] = useState({
        prompt: '',
        tag: ''
    })
    const createPrompt = async (e) => {

    }
  return (
    <Form
        type = "Create"
        post = { post }
        setPost = {setPost}
        submitting = { submitting }
        handleSubmit = { createPrompt }

    >
        
    </Form>
  )
}

export default CreatePrompt