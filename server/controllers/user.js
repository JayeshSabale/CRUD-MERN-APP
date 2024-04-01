import { User } from '../models/user.js'

const createEntry = async (req, res) => {
  try {
    const { name, favoriteColor, hobby } = req.body
    const newUser = await User.create({
      name,
      favoriteColor,
      hobby,
    })
    res.json(newUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create entry' })
  }
}

const getAllEntries = async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to get users' })
  }
}

const deleteEntry = async (req, res) => {
  const { id } = req.params
  try {
    const deletedEntry = await User.findByIdAndDelete(id)
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entry not found' })
    }
    res.json({ message: 'Entry deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to delete entry' })
  }
}

const updateEntry = async (req, res) => {
  const { id } = req.params
  try {
    const updatedEntry = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    if (!updatedEntry) {
      return res.status(404).json({ message: 'Entry not found' })
    }
    res.json(updatedEntry)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to update entry' })
  }
}

export { createEntry, getAllEntries, deleteEntry, updateEntry }
