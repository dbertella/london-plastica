import faunadb from 'faunadb'
import { last } from 'lodash'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
  const ref = last(event.path.split('/'))
  const { available } = JSON.parse(event.body)
  console.log(`Function 'update-spot' invoked. update ref: ${ref}`)
  return client
    .query(
      q.Update(
        q.Ref(`classes/players/${ref}`),
        {
          data: { available }
        }
        // q.Match(q.Index('player_by_day_and_email'), [date, data.email])
      )
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
