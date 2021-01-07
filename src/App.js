import React, { Component } from 'react';
import {Grid, Button, Image, Icon } from "semantic-ui-react"
import './App.css';
import boopSfx from './boop.mp3';

class App extends Component {

  constructor(props) {
    super(props);
    this.timer = undefined;
    this.boopSound = new Audio(boopSfx);
    this.state = {
        isSlideshowOn : false,
        images : [
            {
                image : "https://s.abcnews.com/images/Lifestyle/ht_pudding_the_fox_03_mt_140821_4x3t_992.jpg",
                minX : 299,
                maxX : 416,
                minY : 233,
                maxY : 323
            },
            {
                image: "https://www.nrcm.org/wp-content/uploads/2018/12/Red-fox-winter-South-China-4-Hal-Winters.jpg"
                ,minX:540,
                minY:175,
                maxX:545,
                maxY:180
            },
            {
                image: "https://www.cpomagazine.com/wp-content/uploads/2020/03/years-old-fox-kitten-cyber-espionage-campaign-targeting-vpn-vulnerabilities-has-given-iran-a-global-foothold_1500.jpg.webp",
                minX:311,
                minY:230,
                maxX:334,
                maxY:247
            },
            {
                image: "https://wi-images.condecdn.net/image/EOGRQE0Ogb3/crop/1620/f/william-doranflickrcc-by-nc-sa-20.jpg",
                minX:240,
                minY:220,
                maxX:251,
                maxY:228
            }
        ],
        imageIdx : 0
    }
  }

  setIndex = (newIdx) => {
    const { images} = this.state;
    if(newIdx >= images.length) {
        newIdx = 0;
    } else if(newIdx < 0) {
        newIdx = images.length - 1;
    }
    this.setState(
        {
            imageIdx : newIdx
        }
    );
  }

  forward = () => {
    const {imageIdx, images} = this.state;
    let newIdx = imageIdx + 1;
    this.setIndex(newIdx);
  }

  backward = () => {
    const {imageIdx, images} = this.state;
    let newIdx = imageIdx - 1;
    this.setIndex(newIdx);
  }

  checkForBoop = (evtDetails) => {
      const imageDetails = this.state.images[this.state.imageIdx];
      const { minX, minY, maxX, maxY} = imageDetails;
      if(minX === undefined && minY !== undefined && maxX !== undefined && maxY !== undefined) {
          return;
      }
      const innerEvent = evtDetails.nativeEvent;
      const clickX = innerEvent.layerX;
      const clickY = innerEvent.layerY;
      if(clickX >= minX && clickY >=minY && clickX <= maxX && clickY <= maxY ) {
            this.boopSound.play();
      }
    console.log( clickX + "," + clickY);

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
      const currentImage = images[imageIdx].image;
    return ( 
        <Grid id="imageGrid">
            <Grid.Row id="imageRow" divided>
                <Grid.Column width={2}>
                    <Button onClick={this.backward} style={{"height":"100%", width : "100%"}} primary>
                        <Icon name='arrow left' />
                    </Button>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Image
                        id="img"
                        src={currentImage}
                        onClick={this.checkForBoop}
                        centered
                    />
                </Grid.Column>
                <Grid.Column width={2}>
                    <Button onClick={this.forward} style={{"height":"100%", width : "100%"}} primary>
                    <Icon name='arrow right' />
                    </Button>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                { images.map( (imageDetails, idx) => {
                    if(idx === imageIdx) {
                        return (
                            <Grid.Column width={2} key={idx}>
                            <Image src={imageDetails.image} onClick={ () => {
                                this.setIndex(idx);
                            } } /> 
                            </Grid.Column>
                        )
                    }
                    else {
                        return (
                            <Grid.Column width={1} key={idx}>
                                <Image src={imageDetails.image} onClick={ () => {
                                    this.setIndex(idx);
                                } } /> 
                            </Grid.Column>
                            )
                    }
                }) }
            </Grid.Row>
            <Grid.Row>
                <Button style={{width:"100%"}} onClick={this.toggleSlideshow}>
                    { this.state.isSlideshowOn ? "Stop Slideshow" : "Start Slideshow"}
                </Button>
            </Grid.Row>
        </Grid>
    );
  }
}

export default App;
