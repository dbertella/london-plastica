import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
  const date = last(event.path.split('/'))
  const data = JSON.parse(event.body)
  console.log(`Function 'update-spot' invoked. update date: ${date}`)
  return client
    .query(
      q.Update(q.Ref(`classes/players/${date}/${data.email}`), {
        available: data.available
      })
    )
    .then(response => {
      console.log('success', response)
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
      })
    })
    .catch(error => {
      console.log('error', error)
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      })
    })
}
