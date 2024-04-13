"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
  const [prompts, setPrompts] = useState([]);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/prompts`);
      const data = await response.json();
      setPrompts(data);
    };
    if (session?.user.id) {
      fetchPrompts();
    }
  }, []);

  const handleEdit = (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

  const handleDelete = async (prompt) => {
    const isConfirmed = confirm("Are you sure you want to delete this prompt?");

    if (isConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${prompt._id}`, {
          method: "DELETE",
        });

        const filteredPrompts = prompts.filter((p) => p._id !== prompt._id);
        setPrompts(filteredPrompts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination."
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;

