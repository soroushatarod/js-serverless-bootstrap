import dynamoose from '../index'

const HelloWorldSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true
  }
}, {
  timestamps: false
})

export default dynamoose.model(process.env.TABLE_HELLO_WORLD, HelloWorldSchema)
