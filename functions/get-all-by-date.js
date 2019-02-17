import faunadb from 'faunadb'
import { last } from 'lodash'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = (event, context, callback) => {
  const date = last(event.path.split('/'))
  console.log(`Function 'todo-read' invoked. Read date: ${date}`)
  return client.query(q.Get(q.Ref(`classes/todos/${date}`)))
  .then((response) => {
    console.log("success", response)
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    })
  }).catch((error) => {
    console.log("error", error)
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
}
