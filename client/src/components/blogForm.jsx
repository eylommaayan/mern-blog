import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function BlogForm() {
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: '',
    description: '',
    image: '',
  });

  const handleChange = (e) =>
    setBlog({ ...blog, [e.target.name]: e.target.value });

  const onSave = async (e) => {
    e.preventDefault();

    // בדיקה בסיסית
    if (!blog.title || !blog.description || !blog.image) {
      return toast.error('מלא את כל השדות');
    }

    try {
      const res = await axios.post('/api/blogs', blog);
      toast.success(res.data.message || 'Blog saved!');
      setBlog({ title: '', description: '', image: '' }); // איפוס
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
const inputStyle =
  'border border-gray-400 rounded px-4 py-5 text-lg w-full focus:outline-none focus:border-gray-700';

 Next.js
}
