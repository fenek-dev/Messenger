import { Router } from 'express';
import Chat from '../models/Chat';

const router = Router();

// /api/message/create
router.post('/create', async (req, res) => {
  try {
    const {
      members,
      from,
      body,
      reply,
    }: {
      members: string[];
      from: string;
      body: string;
      reply: {
        from: string;
        body: string;
        created_at: number;
      };
    } = req.body;

    if (!reply) {
      const newMessage = {
        from,
        body,
        created_at: new Date().getTime(),
        received: false,
        edited: false,
      };

      await Chat.findOneAndUpdate(
        { members },
        {
          $push: { messages: newMessage },
          last_message: body,
          created_at: newMessage.created_at,
        }
      );
    } else {
      const newMessage = {
        from,
        body,
        created_at: new Date().getTime(),
        received: false,
        edited: false,
        reply,
      };
      const chat = await Chat.findOneAndUpdate(
        { members },
        {
          $push: { messages: newMessage },
          last_message: body,
          created_at: newMessage.created_at,
        },
        { new: true, useFindAndModify: true }
      );
      await chat?.save();
    }
    res.status(201).json({ message: 'Message created' });
  } catch (error) {
    res.status(500).json({ error: 'Something goes wrong' });
  }
});

router.patch('/update', async (req, res) => {
  try {
    const {
      user_id,
      body,
      created_at,
    }: { user_id: string; created_at: number; body: string } = req.body;

    await Chat.findOneAndUpdate(
      { 'messages.created_at': created_at, 'messages.from': user_id },
      {
        $set: {
          'messages.$.body': body,
          'messages.$.edited': true,
        },
      }
    );
    res.status(201).json({ message: 'Message was updated' });
  } catch (error) {
    res.status(500).json({ error: 'Something goes wrong' });
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const {
      user_id,
      created_at,
    }: { user_id: string; created_at: number } = req.body;

    await Chat.findOneAndUpdate(
      {
        'messages.created_at': created_at,
        'messages.from': user_id,
      },
      {
        $pull: { messages: { created_at } },
      }
    );

    res.json({ message: 'Message was deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Something goes wrong' });
  }
});

module.exports = router;
