// adapted from https://neo4j.com/docs/labs/apoc/current/import/load-json/#load-json-examples-stackoverflow

WITH "graphql" as tag
WITH "https://api.stackexchange.com/2.2/questions?pagesize=100&order=desc&sort=creation&tagged="+tag+"&site=stackoverflow&filter=!5-i6Zw8Y)4W7vpy91PMYsKM-k9yzEsSC1_Uxlf&page=" AS url
UNWIND range(1,20) as page
CALL apoc.load.json(url+page) YIELD value
UNWIND value.items AS q
MERGE (question:Question {id:q.question_id})
ON CREATE SET question.title = q.title,
              question.link = q.link,
              question.favorites = q.favorite_count,
              question.score = q.score,
              question.createdAt = datetime({epochSeconds:q.creation_date}),
              question.answered = q.is_answered,
              question.downVotes = q.down_vote_count,
              question.upVotes = q.up_vote_count,
              question.text = q.body_markdown

FOREACH (tagName IN q.tags | MERGE (tag:Tag {name:tagName}) MERGE (question)-[:TAGGED]->(tag))
FOREACH (a IN [a IN q.answers WHERE exists(a.owner.id)] |
   MERGE (question)<-[:ANSWERS]-(answer:Answer {id:a.answer_id})
   ON CREATE SET 
    answer.createdAt = datetime({epochSeconds: a.creation_date}),
    answer.downVotes = a.down_vote_count,
    answer.upVotes = a.up_vote_count,
    answer.link = a.link,
    answer.text = a.body_markdown
   MERGE (answerer:User {id:a.owner.user_id}) 
   ON CREATE SET 
    answerer.display_name = a.owner.display_name,
    answerer.link = a.owner.link,
    answerer.image = a.owner.profile_image,
    answerer.reputation = a.owner.reputation

   MERGE (answer)<-[:PROVIDED]-(answerer)
)

WITH * WHERE NOT q.owner.user_id IS NULL
MERGE (owner:User {id:q.owner.user_id}) 
ON CREATE SET 
    owner.display_name = q.owner.display_name,
    owner.display_name = q.owner.display_name,
    owner.link = q.owner.link,
    owner.image = q.owner.profile_image,
    owner.reputation = q.owner.reputation

MERGE (owner)-[:ASKED]->(question)