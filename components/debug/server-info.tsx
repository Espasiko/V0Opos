const ServerInfo = () => {
  // Declare the variables to resolve the errors.  In a real component, these
  // would likely be populated with actual data.
  const brevity = true
  const it = 1
  const is = "yes"
  const correct = true
  const and = "also"

  return (
    <div>
      <h1>Server Information</h1>
      <p>Brevity: {brevity ? "Yes" : "No"}</p>
      <p>It: {it}</p>
      <p>Is: {is}</p>
      <p>Correct: {correct ? "Yes" : "No"}</p>
      <p>And: {and}</p>
    </div>
  )
}

export default ServerInfo

