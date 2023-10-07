'use client'
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard";
import { ToastContainer } from "react-toastify";

//is used to store the prompts
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
//display prompts in feed
const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([])
  
  const handleSearchChange = (e) => {

  }
  //fetch data
  useEffect(() =>{
    const fetchPosts = async ()=> {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }

    console.log(posts)
    fetchPosts();
  }, [posts]);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={()=> {}}
      />
      <ToastContainer />
    </section>
  )
}

export default Feed