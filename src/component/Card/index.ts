// @ts-nocheck
import Card from './Card'
import Submit from './Submit'
import { consumer } from './context'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import Accordion from './Accordion'

// 传递需要的props
Card.Header = consumer(Header, ['collapsed', 'onCollapse'])
Card.Body = consumer(Body, ['collapsed', 'collapsible', 'onCollapse'])
Card.Footer = Footer
Card.Submit = consumer(Submit, ['onSubmit', 'formStatus'])
Card.Accordion = Accordion

Card.Body.displayName = 'EthanCardBody'
Card.Header.displayName = 'EthanCardHeader'
Card.displayName = 'EthanCard'

export default Card
