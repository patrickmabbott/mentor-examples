import React, { Component } from 'react';
import {Grid, Button, Image, Icon } from "semantic-ui-react"
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.timer = undefined;
    this.state = {
        isSlideshowOn : false,
        images : [
            "https://s.abcnews.com/images/Lifestyle/ht_pudding_the_fox_03_mt_140821_4x3t_992.jpg",
            "https://www.nrcm.org/wp-content/uploads/2018/12/Red-fox-winter-South-China-4-Hal-Winters.jpg",
            "https://miro.medium.com/max/9856/1*ZoOlQLNrOW2729miRvO1sw.jpeg",
            "https://www.cpomagazine.com/wp-content/uploads/2020/03/years-old-fox-kitten-cyber-espionage-campaign-targeting-vpn-vulnerabilities-has-given-iran-a-global-foothold_1500.jpg.webp",
            "https://wi-images.condecdn.net/image/EOGRQE0Ogb3/crop/1620/f/william-doranflickrcc-by-nc-sa-20.jpg"
        ],
        imageIdx : 0
    }
  }

  forward = () => {
        const {imageIdx, images} = this.state;
        let newIdx = imageIdx + 1;
        if(newIdx >= images.length) {
            newIdx = 0;
        }
        this.setState(
            {
                imageIdx : newIdx
            }
        );
  }

  backward = () => {
    const {imageIdx, images} = this.state;
    let newIdx = imageIdx - 1;
    if(newIdx < 0) {
        newIdx = images.length - 1;
    }
    this.setState(
        {
            imageIdx : newIdx
        }
    );
  }

  toggleSlideshow = () => {
    const { isSlideshowOn } = this.state;
    if(isSlideshowOn) {
        this.endSlideshow();
    } else {
        this.startSlideshow();
    }
  }

  startSlideshow = () => {
    this.timer = setInterval(this.forward, 1000);
    this.setState( { isSlideshowOn : true});
  }

  endSlideshow = () => {
      clearTimeout(this.timer);
      this.timer = undefined;
      this.setState( { isSlideshowOn : false});
  }

  render() {
      const { images, imageIdx} = this.state;
      const currentImage = images[imageIdx]
    return ( 
        <Grid id="imageGrid">
            <Grid.Row>
                <Button style={{width:"100%"}} onClick={this.toggleSlideshow}>
                    { this.state.isSlideshowOn ? "Stop Slideshow" : "Start Slideshow"}
                </Button>
            </Grid.Row>
            <Grid.Row id="imageRow">
                <Grid.Column width={1}>
                    <Button onClick={this.backward} style={{"height":"100%"}} primary>
                        <Icon name='arrow left' />
                    </Button>
                </Grid.Column>
                <Grid.Column width={14}>
                    <Image
                        id="img"
                        src={currentImage}
                        
                        centered
                    />
                </Grid.Column>
                <Grid.Column width={1}>
                    <Button onClick={this.forward} style={{"height":"100%"}} primary>
                    <Icon name='arrow right' />
                    </Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
  }
}

export default App;
