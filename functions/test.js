exports.handler = (event, context) => {
  // "event" has informatiom about the path, body, headers etc of the request
  console.log('event', event)
  // "context" has information about the lambda environment and user details
  console.log('context', context)

  const { user } = context.clientContext
  console.log(user)
  // The "callback" ends the execution of the function and returns a reponse back to the caller
  return {
    statusCode: 200,
    body: JSON.stringify({
      data: '⊂◉‿◉つ'
    })
  }
}
