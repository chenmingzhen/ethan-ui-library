import React from "react"
import Spin from "@/component/Spin"
class App extends React.Component {
  state = { loading: false };
  render() {
    return (
      <div>
        <Spin size="54px" name="four-dots" color="#dc3545" />
      </div>
    )
  }
}

export default App
