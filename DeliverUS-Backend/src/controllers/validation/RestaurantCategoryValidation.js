import { RestaurantCategory } from '../../models/models.js'
import { check } from 'express-validator'
const checkNew = async (value, { req }) => {
  try {
    const category = await RestaurantCategory.findOne({ where: { name: value } })
    if (category) {
      throw new Error('This category already exists')
    }
  } catch (err) {
    throw new Error(err.message)
  }
}
const create = [
  check('name').exists().isString().isLength({ min: 1, max: 50 }).trim(),
  check('name').custom(checkNew)
]
export { create }
