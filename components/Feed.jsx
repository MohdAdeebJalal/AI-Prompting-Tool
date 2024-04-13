// 'use client'
// import { useState,useEffect } from 'react'
// import PromptCard from './PromptCard';

// const PromptCardList = ({ data, handleTagClick }) => {
//   return (
//     <div className="mt-16 prompt_layout">
//     {data.map((prompt) => (
//       <PromptCard
//         key={prompt._id}
//         prompt={prompt}
//         handleTagClick={handleTagClick}
//       />
//     ))}
//   </div>

//   )
// }
// const Feed = () => {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [searchedPrompts, setSearchedPrompts] = useState([])
//   const[posts,setPosts] = useState([])

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value)
//   }
//   const handleTagClick = (tag) => {
    
//   }
//   useEffect(() => {
//     const fetchPosts = async () => {
//       const response = await fetch(`/api/prompt`)
//       const data = await response.json()
//       setPosts(data)
//     }
//     fetchPosts()

//   },[])
//   return (
//     <section className="feed">
//       <form className="w-full relative flex-center">
//         <input
//           type="text"
//           placeholder="Search for a tag or a username"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           required
//           className="search_input peer"
//         />
//       </form>

//       <PromptCardList data={posts} handleTagClick={handleTagClick} />
//     </section>

//   )
// }

// export default Feed

"use client";

import { useEffect, useState } from "react";
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
    return (
      <div className="mt-16 prompt_layout">
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  
    )
  }

const Feed = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [prompts, setPrompts] = useState([]);
  const [searchedPrompts, setSearchedPrompts] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch("/api/prompt");
      const resData = await response.json();
      setPrompts(resData);
      setSearchedPrompts(resData);
    };
    fetchPrompts();
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    const filteredPrompts = prompts.filter((prompt) => {
      return regex.test(prompt.tag) || regex.test(prompt.prompt) || regex.test(prompt.creator.username);
    })
    setSearchedPrompts(filteredPrompts);
  };

  const handleSearchChange = (event) => {
    clearTimeout(searchTimeout);
    setSearchTerm(event.target.value);

    const timeout = setTimeout(() => {
      filterPrompts(event.target.value);
    }, 500);
    setSearchTimeout(timeout);
  };

  const handleTagClick = (tag) => {
    setSearchTerm(tag);
    filterPrompts(tag);
  };

  return (
    <section className="feed">
      <form className="w-full relative flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchTerm}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={searchedPrompts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;