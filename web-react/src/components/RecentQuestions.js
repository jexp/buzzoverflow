import React from 'react'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Title from './Title'

const UPVOTE_MUTATION = gql`mutation upvote($id:Int!) { upvote(id:$id) { id, favorites } }`

const GET_RECENT_REVIEWS_QUERY = gql`
{
  Question(first: 10, orderBy: favorites_desc) {
    id
    user {
      name: display_name
    }
    title
    date: createdAt {
      formatted
    }
    stars:favorites
  }
}
`

export default function RecentQuestions() {

  const [upvote, { result }] = useMutation(UPVOTE_MUTATION)

  const { loading, error, data } = useQuery(GET_RECENT_REVIEWS_QUERY)
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  return (
    <React.Fragment>
      <Title>Recent Questions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Question Title</TableCell>
            <TableCell align="right">Question Stars</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.Question.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date.formatted}</TableCell>
              <TableCell>{row.user.name}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell align="right">{row.stars}</TableCell>
              <TableCell align="right"><Button onClick={() => upvote({ variables: { id: row.id } })}>upvote</Button></TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
