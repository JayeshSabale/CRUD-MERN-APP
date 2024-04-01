import express from 'express'
import {
  createEntry,
  getAllEntries,
  deleteEntry,
  updateEntry,
} from '../controllers/user.js'

const router = express.Router()

router.post('/create-entry', createEntry)
router.get('/get-all-entries', getAllEntries)
router.delete('/delete-entry/:id', deleteEntry)
router.put('/update-entry/:id', updateEntry)

export default router
