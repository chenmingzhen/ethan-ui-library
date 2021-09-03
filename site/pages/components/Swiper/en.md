# Swiper *Carousel 2.0(Seamless rolling)*

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| transitionDuration | number | 450 | Transition duration |
| className | string | none | Extend className |
| autoPlay | boolean | true | auto play |
| autoplayInterval | number | 2000 | scroll to the time of the next slide |
| dots | boolean | true | whether to display panel indicator points |
| arrows | boolean | true | whether to show arrows |
| style | React.CSSProperties | none | swiper extends style |
| onChange | (current: number) => void | none | switch panel callback |
| renderArrow | (onPrev: (e: React.MouseEvent) => void, onNext: (e: React.MouseEvent) => void) => React.ReactNode | none | custom arrow rendering |

### Method

** *Swiper's ref returns two toggle methods**

| name | description | 
| --- | --- | 
| onPrev | prev slide  | 
| onNext | next slide |
