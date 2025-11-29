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
    const id = Number.parseInt(req.params.id, 10)

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid service id' })
    }

    const result = await Service.findByPk(id)
    if (!result) {
      return res.status(404).json({ message: 'Service not found' })
    }

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
    const id = Number.parseInt(req.params.id, 10)

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid service id' })
    }

    const body = req.body
    const serviceUpdate = await updateServiceSchema.validateAsync(body)

    const result = await Service.update(serviceUpdate, {
      where: {
        service_id: id,
      },
      returning: true,
    })

    if (!result[0]) {
      return res.status(404).json({ message: 'Service Not found' })
    }

    return res.status(201).json({ message: 'Service updated', service: result })
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
    const id = Number.parseInt(req.params.id, 10)

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid service id' })
    }

    const result = await Service.destroy({ where: { service_id: id } })
    if (!result) {
      return res.status(404).json({ message: 'Service not found' })
    }

    return res.status(204).json({ message: 'Service deleted', service: result })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}
