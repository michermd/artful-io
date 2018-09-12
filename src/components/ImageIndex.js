import React, { Component } from 'react'
import PostCard from './PostCard'
import { Dimmer, Loader, Container, Grid } from 'semantic-ui-react'


class ImageIndex extends Component {
  state = {
    loading: true,
    imageIndex: []
  }

  componentDidMount() {
    fetch('http://localhost:3001/images/')
    .then(res => res.json())
    .then(this.initialState)
  }

  initialState = (resData) => {
    this.setState({
      imageIndex: resData,
      loading: false
    })
  }


  render() {
    if(this.state.loading) {
      return (
        <Container>
          <Dimmer active inverted>
            <Loader>Loading Images</Loader>
          </Dimmer>
        </Container>
      )
    }
    return (
      <Container>
        <h5>All Images</h5>
        <Grid relaxed columns={5}>
          { this.state.imageIndex.map(image => {
            return (<Grid.Column>
            <PostCard key={image.id} image={image}/>
            </Grid.Column>)
          }) }
        </Grid>
      </Container>
    );
  }

}

export default ImageIndex;
