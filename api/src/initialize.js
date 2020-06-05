export const initializeDatabase = (driver) => {
  const initCypher = `CALL apoc.schema.assert({User:["display_name","name"], Question:["createdAt","title","text"], Answer:["createdAt"]}, {User: ["id"], Question: ["id"], Answer: ["id"], Tag: ["name"]})`

  const executeQuery = (driver) => {
    const session = driver.session()
    return session
      .writeTransaction((tx) => tx.run(initCypher))
      .then()
      .finally(() => session.close())
  }

  executeQuery(driver).catch((error) => console.error(error))
}
