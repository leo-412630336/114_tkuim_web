import express from 'express';
import {
  createParticipant,
  listParticipants,
  updateParticipant,
  deleteParticipant
} from '../repositories/participants.js';

const router = express.Router();
router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone, status } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: '缺少必要欄位' });
    }

    const id = await createParticipant({ name, email, phone, status });

    const participants = await listParticipants();

    res.status(201).json({
      _id: id.toString(),
      total: participants.length
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        error: '此 Email 已經報名過，請勿重複提交。'
      });
    }
    next(error);
  }
});



router.get('/', async (req, res, next) => {
  try {
    const participants = await listParticipants();
    res.json({
      items: participants,
      total: participants.length
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { phone, status } = req.body;

    const patch = {};
    if (phone !== undefined) patch.phone = phone;
    if (status !== undefined) patch.status = status;

    if (Object.keys(patch).length === 0) {
      return res.status(400).json({ error: '只允許更新 phone 或 status' });
    }

    const result = await updateParticipant(req.params.id, patch);

    if (!result.matchedCount) {
      return res.status(404).json({ error: '找不到資料' });
    }

    res.json({ updated: result.modifiedCount });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await deleteParticipant(req.params.id);
    if (!result.deletedCount) {
      return res.status(404).json({ error: '找不到資料' });
    }
    res.status(204).end(); 
  } catch (error) {
    next(error);
  }
});

export default router;
