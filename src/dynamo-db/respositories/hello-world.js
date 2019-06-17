import HelloWorld from '../models/hello-world'

/**
 * Create a new consultation feedback.
 *
 * @param {Object} data
 * @return {Promise}
 */
export const create = async ({ id }) => {
  try {
    const newItem = new HelloWorld({
      id
    })
    await newItem.save()
    return newItem
  } catch (error) {
    error.code = 500
    throw error
  }
}

/**
 * Get the record with the specified id.
 *
 * @param {String} id
 * @return {Promise}
 */
export const findById = async (id) => {
  try {
    return await HelloWorld
      .queryOne('id')
      .eq(id)
      .exec()
  } catch (error) {
    error.code = 500
    throw error
  }
}
