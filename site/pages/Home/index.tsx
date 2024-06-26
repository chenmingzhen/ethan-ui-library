import React from 'react'
import { Button, Icon } from 'ethan-ui'
import { homeClass } from 'doc/styles'
import history from 'docs/history'
import withLoading from '../withLoading'

const Home = () => (
    <div className={homeClass('_')}>
        <section className={homeClass('content')}>
            <h1>Ethan UI</h1>
            <h2>前端UI组件库</h2>
            <div className={homeClass('buttons')}>
                <Button
                    type="primary"
                    className={homeClass('left')}
                    onClick={() => {
                        history.push('/components/Start')
                    }}
                >
                    开始使用
                </Button>
                <Button className={homeClass('right')}>
                    <Icon.FontAwesome name="github" />
                    <a
                        href="https://github.com/chenmingzhen/ethan-ui-library"
                        target="_blank"
                        rel="noreferrer"
                        className={homeClass('github')}
                    >
                        GitHub
                    </a>
                </Button>
            </div>
        </section>
    </div>
)

export default withLoading(Home)
