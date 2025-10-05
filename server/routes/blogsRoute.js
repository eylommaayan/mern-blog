// server/routes/blogsRoute.js
import { Router } from 'express';
import Blog from '../models/blogModel.js';

const router = Router();

// GET all blogs
router.get('/', async (_req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

/* GET  /api/blogs  – החזר את כל הבלוגים */
// server/routes/blogsRoute.js
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);                // ← מחזיר את האובייקט עצמו
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* POST /api/blogs  – יצירת בלוג */
router.post('/', async (req, res) => {
  try {
    // req.body = { title, description, image }
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json({ message: 'בלוג נשמר בהצלחה', blog });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update
router.put('/:id', async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(blog);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: 'בלוג נמחק' });
});

export default router;
