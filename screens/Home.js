import React from "react";
import Article from "../components/Article";
class Home extends React.Component {
  render() {
    const { navigation, scene } = this.props;
    return <Article title={"Home"} navigation={navigation} scene={scene} />;
  }
}

export default Home;
