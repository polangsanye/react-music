import React from 'react'
import Progress from './progress'
import {MUSIC_LIST} from '../config/config'
import {format,randomRange} from '../utils/utils'
import {HashRouter as Router, NavLink} from 'react-router-dom'
import PubSub from 'pubsub-js'
class Music extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musicTime: 0,
      percent: 0,
      musicDuration: 0,
      isPlay: true,
      volume: 0.8,
      currentIndex: this.props.match.params.id,
      type: sessionStorage.getItem("type")||"order"
    }
  }
  componentDidMount() {
    this.refs.audio.volume = this.state.volume;
  }
  handleMusic = () => {
    let audio = this.refs.audio;
    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }
    this.setState({
      isPlay: !this.state.isPlay
    })
  };
  progress = (progress) => {
    this.refs.audio.currentTime = progress * this.state.musicDuration;
  };
  handleVoice = (progress) => {
    this.refs.audio.volume = progress;
    this.setState({
      volume: progress
    })
  };
  end = () => {
    let type = sessionStorage.getItem("type")?sessionStorage.getItem("type"):this.state.type;
    let newIndex = null;
    let currentIndex = parseInt(this.state.currentIndex,10);
    switch (type) {
      case "order":
        newIndex = (currentIndex + 1) % MUSIC_LIST.length;
        break;
      case "random":
        newIndex = randomRange(0, MUSIC_LIST.length);
        break;
      default :
        newIndex = currentIndex

    }
    this.setState({
      currentIndex: newIndex
    });
    window.location = `http://localhost:3000/music/${newIndex}`;
  };
  musicType = () => (
      this.state.type === "order" ? "order" : this.state.type === "random" ? "random" : "cycle"
  );
  changeMusicType = () => {
    const type = ["order", "random", "cycle"];
    let index = type.indexOf(this.state.type);
    let currentIndex = (index + 1) % type.length;
    let currentType = type[currentIndex];
    this.setState({
      type:currentType
    });
    sessionStorage.setItem("type",currentType)
  };
  changeMusic = (type = 'next') => {
    let newIndex = null;
    let currentIndex = parseInt(this.state.currentIndex,10);
    if (type === 'next') {
      newIndex = (currentIndex + 1) % MUSIC_LIST.length;
    } else {
      newIndex = (currentIndex - 1 + MUSIC_LIST.length) % MUSIC_LIST.length;
    }
    this.setState({
      currentIndex: newIndex
    });
    PubSub.publish("changeIndex",newIndex)
    window.location = `http://localhost:3000/music/${newIndex}`
  };
  handleTime = (e) => {
    this.setState({
      musicTime: e.target.currentTime.toFixed(2),
      musicDuration: e.target.duration,
      percent: (e.target.currentTime / e.target.duration * 100).toFixed(2)
    });
  };
  render() {
    let musicItem = MUSIC_LIST[this.state.currentIndex];
    let {title, artist, file, cover}=musicItem;
    return (
        <div className="musicWrap">
          <div className="musicList"><Router><NavLink to="/" target="_self">我的音乐库</NavLink></Router></div>
          <div className="bgPlayer" style={{backgroundImage: `url(${cover})`}}></div>
          <div className="musicInfo">
            <div className="imgCont">
              <img src={cover} className={`${this.state.isPlay ? "play" : "paused"}`} alt="musicLogo"/>
            </div>
            <p className="name">歌曲：{title}</p>
            <p className="author">作者：{artist}</p>
          </div>
          <div className="time">{format(this.state.musicTime)}/{format(this.state.musicDuration)}</div>
          <div className="ctrlProgress">
            <div className="ctrlIcon">
              <span className="iconItem left" onClick={(prev) => this.changeMusic(prev)}></span>
              <span className={`iconItem ${this.state.isPlay ? "play" : "pause"}`} onClick={() => {
                this.handleMusic()
              }}></span>
              <span className="iconItem right" onClick={() => this.changeMusic()}></span>
            </div>
            <div className="progressWrap">
              <Progress percent={this.state.percent} onProgress={this.progress}></Progress>
            </div>
            <div className="ctrlIcon">
              <span className={`iconItem ${this.musicType()}`} onClick={this.changeMusicType}></span>
              <span className="iconItem volume"></span>
            </div>
            <div className="voiceWrap">
              <Progress percent={this.state.volume * 100} onProgress={this.handleVoice}></Progress>
            </div>
          </div>
          <audio ref="audio" onTimeUpdate={(e) => {
            this.handleTime(e)
          }} autoPlay onEnded={this.end} src={file}></audio>
        </div>

    )
  }
}

export default Music