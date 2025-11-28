import { Profile } from '../../models/profile.js'
import { updateProfileSchema } from '../../schemas/profiles.js'
import { profileSchema } from '../../schemas/profiles.js'

// Get all Profiles
export const getAllProfiles = async (_, res) => {
  try {
    const result = await Profile.findAll()
    return res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

// Get all Profiles
export const getOneProfile = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const result = await Profile.findByPk(id)
    return res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

// Create profile
export const createProfile = async (req, res) => {
  try {
    const body = req.body
    const profile = await profileSchema.validateAsync(body)
    const result = await Profile.create(profile)
    return res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const body = req.body
    const profileUpdate = await updateProfileSchema.validateAsync(body)

    const result = await Profile.findOne({ where: { profile_id: id } })
    if (!result) {
      return res.status(404).json({ message: 'Not found' })
    }

    await Profile.update(profileUpdate, {
      where: {
        profile_id: id,
      },
    })

    return res.status(200).json({ message: 'Profile updated' })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

// Delete profile
export const deleteProfile = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const result = await Profile.destroy({ where: { profile_id: id } })
    if (!result) {
      return res.status(404).json({ message: 'Not found' })
    }
    return res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}
