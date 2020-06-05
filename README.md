# Buzzoverflow App built with GRANDstack Starter

This is a GraphQL demo app, using StackOverflow questions, answers, tags and users.

It is a newer version of the one explained on medium in [open-graphql](https://medium.com/open-graphql/build-a-stackoverflow-graphql-api-demo-app-in-10-minutes-69afbf4d037c).

I recorded the session building it on [Twitch](https://Twitch.tv/neo4j_), here is [the Youtube video](https://youtu.be/Quk1-LhG03E).

## How did I build this?

I originally created a Neo4j Sandbox and imported some [StackOverflow data using apoc.load.json](./load-so.cypher)
from their [API](https://api.stackexchange.com/2.2/questions?pagesize=100&order=desc&sort=creation&tagged=graphql&site=stackoverflow&filter=!5-i6Zw8Y%294W7vpy91PMYsKM-k9yzEsSC1_Uxlf)

The app is built with the [GRANDstack](https://grandstack.io) (GraphQL, React, Apollo, Neo4j Database) starter's 

```
npx create-grandstack-app buzzoverflow
```

We then inferred the schema with `npm inferschema:write` and adjusted the React component to the StackOverflow dataset.

The backend database is running on [demo.neo4jlabs.com](https://demo.neo4jlabs.com:7473/browser), 
Readonly user with name, password and db "buzzoverflow"

It is also deployed to netlify under [buzzoverflow.com](https://buzzoverflow.com)

If you want to create your own backing database just sign up to play on [Neo4j Sandbox(]https://neo4j.com/sandbox) or for proper work with [Neo4j's managed service Aura](https://neo4j.com/aura).

Make sure to adjust the connection details then in the `api/.env` file.

Run locally with `npm run start` 

The GraphQL API is the available as a [GraphQL playground](http://localhost:4001) and the [React app](http://localhost:3000)

## Notes on GRANDstack starter

[![Hands On With The GRANDstack Starter](http://img.youtube.com/vi/rPC71lUhK_I/0.jpg)](http://www.youtube.com/watch?v=1JLs166lPcA 'Hands On With The GRANDstack Starter')

You can find instructions for other ways to use Neo4j (Neo4j Desktop, Neo4j Aura, and other cloud services) in the [Neo4j directory README.](./neo4j)

This project is licensed under the Apache License v2.
Copyright (c) 2020 Neo4j, Inc.
