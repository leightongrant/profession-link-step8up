import { Profile } from '../../models/profile.js'
import { updateProfileSchema } from '../../schemas/profiles.js'
import { profileSchema } from '../../schemas/profiles.js'

// Get all Profiles
export const getAllProfiles = async (_, res) => {
  try {
    const profiles = await Profile.findAll()
    return res.status(200).json(profiles)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json(error.message || 'An error has occured')
    }
    return res.status(500).json('An error has occured')
  }
}

// Get one profile
export const getOneProfile = async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10)

    if (Number.isNaN(id)) {
      return res.status(400).json('Invalid profile id')
    }
    const profile = await Profile.findByPk(id)
    if (!profile) {
      return res.status(404).json('Profile Not found')
    }

    return res.status(200).json(profile)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json(error.message || 'An error has occured')
    }
    return res.status(500).json('An error has occured')
  }
}

// Create profile
export const createProfile = async (req, res) => {
  try {
    const body = req.body
    const validatedProfile = await profileSchema.validateAsync(body, {
      abortEarly: false,
    })
    const profile = await Profile.create(validatedProfile)
    return res.status(201).json('Profile created')
  } catch (error) {
    if (error instanceof Error) {
      if ('details' in error) {
        return res.status(422).json(error.details)
      }
      return res.status(400).json(error.message || 'An error has occured')
    }
    return res.status(500).json('An error has occured')
  }
}

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10)

    if (Number.isNaN(id)) {
      return res.status(400).json('Invalid profile id')
    }

    const body = req.body
    const profileUpdate = await updateProfileSchema.validateAsync(body, {
      abortEarly: false,
    })

    const profile = await Profile.findByPk(id)
    if (!profile) {
      return res.status(404).json('Profile not found')
    }

    await profile.update(profileUpdate)

    return res.status(200).json('Profile updated')
  } catch (error) {
    if (error instanceof Error) {
      if ('details' in error) {
        return res.status(422).json(error.details)
      }
      return res.status(400).json(error.message || 'An error has occured')
    }
    return res.status(500).json('An error has occured')
  }
}

// Delete profile
export const deleteProfile = async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10)

    if (Number.isNaN(id)) {
      return res.status(400).json('Invalid profile id')
    }

    const profile = await Profile.findByPk(id)
    if (!profile) {
      return res.status(404).json('Profile Not found')
    }

    await profile.destroy()

    return res.status(200).json('Profile deleted')
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json(error.message || 'An error has occured')
    }
    return res.status(500).json('An error has occured')
  }
}
