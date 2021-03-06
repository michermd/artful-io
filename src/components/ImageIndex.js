import React, { Component } from 'react'
import PostCard from './PostCard'
import { Divider, Pagination, Dimmer, Loader, Container, Grid } from 'semantic-ui-react'


class ImageIndex extends Component {
  state = {
    loading: true,
    imageIndex: [],
    activePage: 1
  }

  componentDidMount() {
    fetch('http://localhost:3001/images/')
    .then(res => res.json())
    .then(this.initialState)
  }

  initialState = (resData) => {
    this.setState({
      imageIndex: resData,
      loading: false,
      activePage: resData.page
    })
  }

  handlePage = (e, { activePage }) => {
    let gotopage = { activePage }
    let pagenum = gotopage.activePage
    let pagestring = pagenum.toString()
    this.setState({
      loading: true
    })
    const url = "http://localhost:3001/images/?page=" + pagestring

    fetch(url)
    .then(res => res.json())
    .then(this.initialState)
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
          <Divider hidden />
          <Container textAlign='center'>
          <Pagination  onPageChange={this.handlePage} size='mini' siblingRange="6" defaultActivePage={this.state.imageIndex.page} totalPages={this.state.imageIndex.pages} />
          </Container>
            <Divider hidden />
        <Grid relaxed columns={5}>
          { this.state.imageIndex.images.map(image => {
            return (<Grid.Column>
            <PostCard key={image.id} image={image} artist={this.state.imageIndex.artists[image.id]}/>
            </Grid.Column>)
          }) }
        </Grid>

        <Divider hidden />

        <Container textAlign='center'>
        <Pagination  onPageChange={this.handlePage} size='mini' siblingRange="6" defaultActivePage={this.state.imageIndex.page} totalPages={this.state.imageIndex.pages} />
        </Container>
        <Divider hidden />

      </Container>
    );
  }

}

export default ImageIndex;
