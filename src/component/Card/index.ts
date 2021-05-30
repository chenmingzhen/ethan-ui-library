import Card from './Card'
import Submit from './Submit'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import Accordion from './Accordion'

// 传递需要的props
Card.Header = Header
Card.Body = Body
Card.Footer = Footer
Card.Submit = Submit
Card.Accordion = Accordion

Card.Body.displayName = 'EthanCardBody'
Card.Header.displayName = 'EthanCardHeader'
Card.displayName = 'EthanCard'

export default Card
