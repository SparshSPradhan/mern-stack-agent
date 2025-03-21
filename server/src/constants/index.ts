let ORIGIN = '*'
let PORT = process.env.PORT || 8080
let MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/<DB_NAME>'
let MONGO_OPTIONS = {}
let JWT_SECRET = process.env.JWT_SECRET || 'unsafe_secret'

export { ORIGIN, PORT, MONGO_URI, MONGO_OPTIONS, JWT_SECRET }