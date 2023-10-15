'use client'
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { usePathname } from 'next/navigation';
import { ToastContainer } from "react-toastify";

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

const Feed = () => {
  const pathName = usePathname();
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/prompt');
        const data = await response.json();
        setPosts(data);
        setSearchedResults(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    const inputText = e.target.value;
    setSearchText(inputText);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(inputText);
        setSearchedResults(searchResult);
      }, 300)  // Adjust the delay as needed
    );
  };

  const handleTagClick = (tagName) => {
    console.log(tagName);
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

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
      {pathName === '/' && (
        <ToastContainer />
      )}
    </section>
  );
};

export default Feed;
