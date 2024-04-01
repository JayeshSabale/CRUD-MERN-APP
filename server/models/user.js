import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  favoriteColor: String,
  hobby: String,
})

const userModel = mongoose.model('User', userSchema)

export { userModel as User }
