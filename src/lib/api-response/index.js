class ApiResponse {
  /**
   * Class Constructor.
   *
   * @param {String} code
   * @param {String} message
   */
  constructor (code, message = '') {
    this.response = {
      status: { code, message },
      data: null,
      meta: {},
      errors: []
    }
  }

  /**
   * Add an error to the response.
   *
   * @param {Object} error
   */
  addError (error) {
    this.response.errors.push(error)
  }

  /**
   * Add data to the response.
   *
   * @param {Mixed} data
   */
  addData (data) {
    this.response.data = data
  }

  /**
   * Set the meta for pagination.
   *
   * @param {Number} offset
   * @param {Number} limit
   * @param {Number} count
   */
  setMeta ({ offset, limit, count }) {
    this.response.meta = { offset, limit, count }
  }

  /**
   * Generates the response based on the data held in the class.
   *
   * return {Object}
   */
  get () {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      statusCode: this.response.status.code,
      body: JSON.stringify(this.response)
    }
  }
}

export default ApiResponse
