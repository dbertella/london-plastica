import faunadb from 'faunadb'
import { last } from 'lodash'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
  const date = last(event.path.split('/'))
  console.log(`Function 'todo-read' invoked. Read date: ${date}`)
  return client
    .query(q.Paginate(q.Match(q.Index('players_by_day'), date)))
    .then(response => {
      const playerRefs = response.data
      console.log('player refs', playerRefs)
      console.log(`${playerRefs.length} players found`)
      // create new query out of player refs. http://bit.ly/2LG3MLg
      const getAllPlayerDataQuery = playerRefs.map(ref => {
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getAllplayerDataQuery).then(ret => {
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify(ret)
        })
      })
      // console.log('success', response)
      // return callback(null, {
      //   statusCode: 200,
      //   body: JSON.stringify(response)
      // })
    })
    .catch(error => {
      console.log('error', error)
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      })
    })
}
