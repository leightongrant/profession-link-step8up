import { Service } from '../../models/service.js'
import {
  createServiceSchema,
  updateServiceSchema,
} from '../../schemas/services.js'

// Get all Services
export const getAllServices = async (_, res) => {
  try {
    const result = await Service.findAll()
    return res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

// Get One Service
export const getOneService = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const result = await Service.findByPk(id)
    return res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

// Create Service
export const createService = async (req, res) => {
  try {
    const body = req.body
    const service = await createServiceSchema.validateAsync(body)
    const result = await Service.create(service)
    return res.status(200).json(result)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

// Update Service
export const updateService = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const body = req.body
    const serviceUpdate = await updateServiceSchema.validateAsync(body)

    const result = await Service.findOne({ where: { service_id: id } })
    if (!result) {
      return res.status(404).json({ message: 'Not found' })
    }

    await Service.update(serviceUpdate, {
      where: {
        service_id: id,
      },
    })

    return res.status(200).json({ message: 'Service updated' })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}

// Delete Service
export const deleteService = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const result = await Service.destroy({ where: { service_id: id } })
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
