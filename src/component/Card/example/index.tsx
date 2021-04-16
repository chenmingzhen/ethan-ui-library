import React from 'react'
import Card from '../index'

const cardStyle = {
  width: 240,
  height: 300,
  display: 'inline-flex',
  marginRight: 20,
}
const gray = { background: '#f7f7f7' }

export default function() {
  return (
    <div>
      <Card style={cardStyle}>
        <Card.Header>Header</Card.Header>
        <Card.Body>Body</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>

      <Card style={{ display: 'inline-flex' }} collapsible>
        <Card.Header style={gray}>Header</Card.Header>
        <Card.Body>Body</Card.Body>
        <Card.Footer style={gray}>Footer</Card.Footer>
      </Card>

      <Card.Accordion defaultActive={1}>
        <Card>
          <Card.Header>Header 1</Card.Header>
          <Card.Body>Body</Card.Body>
        </Card>
        <Card>
          <Card.Header>Header 2</Card.Header>
          <Card.Body>Body</Card.Body>
        </Card>
        <Card>
          <Card.Header>Header 3</Card.Header>
          <Card.Body>Body</Card.Body>
        </Card>
      </Card.Accordion>
    </div>
  )
}
