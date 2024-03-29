import React from 'react'
import Link from 'next/link';




const Form = ({ type,post,setPost,submitting,handleSubmit}) => {
  //clears the user text 

  //WIP : 
  //Need to add a response field 
  //Need to connect a response part to the prompt in the db prompt model
 


  const clearText = ()=> setPost({
    ...post, prompt: '', tag: '', response: ''
  })

  return (

    <section
      className="w-full
      max-w-full
      flex-start
      flex-col
      "
    >
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
          {type} and share amazing prompts with the world, and let your
          imagination run wild with any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className="
          mt-10
          w-full
          max-w-2x1
          flex
          flex-col
          gap-7
          glassmorphism
        "
      >
        <label>
          <span className="
            font-satoshi
            font-semibold
            text-base
            text-gray-700
          "
          >
            Your AI Prompt
          </span>
          <textarea
            
            value = {post.prompt}
            onChange={(e) => setPost ({...post,
              prompt: e.target.value 
            })}
            placeholder= "Write your prompt here..."
            required
            className='form_textarea'
          />
        </label>
        <label>
          <span className="
            font-satoshi
            font-semibold
            text-base
            text-gray-700
          "
          >
            Copy the AI response
          </span>
          <textarea
            
            value = {post.response}
            onChange={(e) => setPost ({...post,
              response: e.target.value 
            })}
            placeholder= "copy response here"
            required
            className='form_textarea'
          />
        </label>
        <label>
          <span className="
            font-satoshi
            font-semibold
            text-base
            text-gray-700
          "
          >
            Tag
            <span className ="font-normal">
              (#product, #webdev, #idea)

            </span>
          </span>
          {/* e.target.value gets the current value of textarea
            everytime textarea is changed setPost updates post.tag
           */}
          <input
            
            value = {post.tag}
            onChange={(e) => setPost ({...post,
              tag: e.target.value 
            })}
            placeholder= "#tag"
            required
            className='form_input'
          />
        </label>

        <div
          className='
            flex-end
            mx-3
            mb-5
            gap-4
          '
        >
          {/* This button refreshes the page somehow */}
        
          <button
            onClick={clearText}
            className="
            text-gray-500
            text-sm
            "
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
          
        </div>
      </form>
    </section>
  )
}

export default Form