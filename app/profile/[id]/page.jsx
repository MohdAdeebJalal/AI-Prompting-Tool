"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const UserProfile = ({params}) => {
  const [prompts, setPrompts] = useState([]);
  const searchParams = useSearchParams();
  const username = searchParams.get('username');

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${params.id}/prompts`);
      const data = await response.json();
      setPrompts(data);
    };
    if (params.id) {
      fetchPrompts();
    }
  }, []);

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination.`}
      data={prompts}
    />
  );
};

export default UserProfile;