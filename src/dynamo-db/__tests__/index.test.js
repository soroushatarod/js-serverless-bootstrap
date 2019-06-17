
describe('index', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
    delete process.env.NODE_ENV
  })

  afterEach(() => {
    process.env = OLD_ENV
  })

  test('should return expected dynamoose config', () => {
    process.env.DYNAMODB_PORT_NO = 10
    process.env.DYNAMOOSE_CREATE_TABLES = true
    process.env.DYNAMOOSE_UPDATE_TABLES = false

    const dynamoose = require('../index')

    expect(dynamoose.default.AWS.config.region).toBe('eu-west-1')
    expect(dynamoose.default.defaults).toEqual(expect.objectContaining({
      create: true,
      prefix: '',
      suffix: ''
    }))
    expect(dynamoose.default.endpointURL).toBeUndefined()
  })

  test('should return expected dynamoose local config if IS_OFFLINE', () => {
    process.env.IS_OFFLINE = true
    process.env.DYNAMODB_PORT_NO = 10
    process.env.DYNAMOOSE_CREATE_TABLES = true
    process.env.DYNAMOOSE_UPDATE_TABLES = false

    const dynamoose = require('../index')

    expect(dynamoose.default.AWS.config.region).toBe('eu-west-1')
    expect(dynamoose.default.defaults).toEqual(expect.objectContaining({
      create: true,
      prefix: '',
      suffix: ''
    }))
    expect(dynamoose.default.endpointURL).toEqual('http://localhost:10')
  })
})
