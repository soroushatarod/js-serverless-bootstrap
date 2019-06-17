import dynamoose from 'dynamoose'

// Connect to local DB if running locally
if (process.env.IS_OFFLINE) {
  dynamoose.local(`http://localhost:${process.env.DYNAMODB_PORT_NO}`)
}

dynamoose.AWS.config.update({
  region: 'eu-west-1'
})

dynamoose.setDefaults({
  create: process.env.DYNAMOOSE_CREATE_TABLES,
  update: process.env.DYNAMOOSE_UPDATE_TABLES,
  prefix: '',
  suffix: ''
})

export default dynamoose
