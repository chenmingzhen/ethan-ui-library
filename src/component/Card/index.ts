import { MemoExoticComponent, FunctionComponent } from 'react'
import Card from './Card'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'
import Accordion from './Accordion'
import { CardProps } from './type'

interface CardComponent extends MemoExoticComponent<FunctionComponent<CardProps>> {
    Header: typeof Header
    Body: typeof Body
    Footer: typeof Footer
    Accordion: typeof Accordion
}

const MixinCardComponent = Card as CardComponent

MixinCardComponent.Header = Header
MixinCardComponent.Body = Body
MixinCardComponent.Footer = Footer
MixinCardComponent.Accordion = Accordion

MixinCardComponent.Body.displayName = 'EthanCardBody'
MixinCardComponent.Header.displayName = 'EthanCardHeader'
MixinCardComponent.displayName = 'EthanCard'

export default MixinCardComponent
