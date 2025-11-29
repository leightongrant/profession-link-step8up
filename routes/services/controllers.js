import { Service } from '../../models/service.js'
import {
  createServiceSchema,
  updateServiceSchema,
} from '../../schemas/services.js'

// Get all Services
export const getAllServices = async (_, res) => {
  try {
    const services = await Service.findAll()
    return res.status(200).json(services)
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

    const service = await Service.findByPk(id)
    if (!service) {
      return res.status(404).json({ message: 'Service not found' })
    }

    return res.status(200).json(service)
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
    const validatedService = await createServiceSchema.validateAsync(body, {
      abortEarly: false,
    })
    const service = await Service.create(validatedService)

    return res.status(201).json({ message: 'Service created', service })
  } catch (error) {
    if (error instanceof Error) {
      if ('details' in error) {
        return res.status(422).json(error.details)
      }
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
    const serviceUpdate = await updateServiceSchema.validateAsync(body, {
      abortEarly: false,
    })

    const service = await Service.findByPk(id)

    if (!service) {
      return res.status(404).json({ message: 'Service Not found' })
    }

    await service.update(serviceUpdate)

    return res.status(200).json({ message: 'Service updated', service })
  } catch (error) {
    if (error instanceof Error) {
      if ('details' in error) {
        return res.status(422).json(error.details)
      }
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

    const service = await Service.findByPk(id)

    if (!service) {
      return res.status(404).json({ message: 'Service Not found' })
    }

    await service.destroy()

    return res.status(200).json({ message: 'Service deleted', service })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'An error has occured' })
  }
}
