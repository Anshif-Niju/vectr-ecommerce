import express from 'express';
import { createFeedback } from '../controllers/feedbackController.js';
import { validate } from '../middlewares/validateMiddleware.js';
import { feedbackSchema } from '../validations/requestValidation.js';

const router = express.Router();

router.post('/', validate(feedbackSchema), createFeedback);

export default router;
