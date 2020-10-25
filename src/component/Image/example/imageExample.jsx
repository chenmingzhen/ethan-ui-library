import React from 'react'
import Image from '@/component/Image'

export default class ImageExample extends React.PureComponent {
  render() {
    return (
      <>
        <Image.Group>
          <Image
            key={1}
            width={80}
            height={80}
            fit="fill"
            shape="thumbnail"
            src="https://p1.music.126.net/I49alGp-K2vlGvUEPyO3xA==/109951164510327201.jpg"
            href="https://p1.music.126.net/I49alGp-K2vlGvUEPyO3xA==/109951164510327201.jpg"
          />
          <Image
            key={2}
            width={80}
            height={80}
            fit="fill"
            shape="thumbnail"
            src="https://p1.music.126.net/JpWBZGxIHhN1UsI391g3OA==/109951164599970741.jpg"
            href="https://p1.music.126.net/JpWBZGxIHhN1UsI391g3OA==/109951164599970741.jpg"
          />
          <Image
            key={3}
            width={80}
            height={80}
            fit="fill"
            shape="thumbnail"
            src="https://p1.music.126.net/hzcmHlgpqF8HaSBojXY9Tg==/109951165227754559.jpg"
            href="https://p1.music.126.net/hzcmHlgpqF8HaSBojXY9Tg==/109951165227754559.jpg"
          />
          <Image
            key={4}
            width={80}
            height={80}
            fit="fill"
            shape="thumbnail"
            src="https://p1.music.126.net/lOUSaDmg2UaXDcnt42KFkw==/109951165181341912.jpg"
            href="https://p1.music.126.net/lOUSaDmg2UaXDcnt42KFkw==/109951165181341912.jpg"
          />
          <Image
            key={5}
            width={80}
            height={80}
            fit="fill"
            shape="thumbnail"
            src="https://p1.music.126.net/9z21uz3bjYCChcVwL7dU0w==/109951164683946730.jpg"
            href="https://p1.music.126.net/9z21uz3bjYCChcVwL7dU0w==/109951164683946730.jpg"
          />
        </Image.Group>
        <div style={{ height: '1000px', background: 'black' }}>1</div>
        <Image src="https://p1.music.126.net/Bp8IBFsegPY6CJjLhc8bKw==/109951165156500661.jpg" lazy />
      </>
    )
  }
}
