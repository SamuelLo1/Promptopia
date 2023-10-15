'use client'
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard";
import { usePathname} from 'next/navigation';

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
  const pathName = usePathname();
  const [posts, setPosts] = useState([])

  //search states
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() =>{
    const fetchPosts = async ()=> {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
      setSearchedResults(data)
    }
    fetchPosts();
  }, []);


  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      },)
    )
  };

  const handleTagClick = (tagName) => {
    console.log(tagName);
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };
  //fetch data
  

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
        data={searchedResults}
        handleTagClick={handleTagClick}
      />
      {pathName === '/' ? (
      <>
       <ToastContainer />
      </>
      ) :(
       <>
       </>
      )
    } 
    </section>
    
   
  )
}

export default Feed