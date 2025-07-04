import express from 'express';
import multer from 'multer';
import {
  createPost,
  getPosts,
  getPostById
} from '../controllers/postController.js';

const router = express.Router();

// ⚙️ Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `${Date.now()}.${ext}`);
  },
});

const upload = multer({ storage });

// Routes
router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', upload.single('image'), createPost); // ✅ File upload

export default router;
