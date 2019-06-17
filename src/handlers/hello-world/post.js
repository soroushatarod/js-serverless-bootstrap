import { Logger } from '@lambda/logger'
import { create } from '../../dynamo-db/respositories/hello-world'
import ApiResponse from '../../lib/api-response'

export const handler = async (event, context) => {
  const log = new Logger()
  log.init(event, context)
  const { id } = JSON.parse(event.body)
  let statusCode

  try {
    const item = await create({ id })
    log.info(item)
    statusCode = 200
  } catch (err) {
    statusCode = 500
    log.error(err)
  }

  const handleResponse = new ApiResponse(statusCode)
  log.info(`response ${handleResponse.get()}`)
  return handleResponse.get()
}
