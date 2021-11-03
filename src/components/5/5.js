import React from 'react';
import click from '../../assets/click.wav';
import RoundSlider from './RoundSlider.js';

class Metronome extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            playing: false,
            bpm: 129    
        };

        this.click = new Audio(click);
    }

    componentDidMount() {
        document.title = "Metronome"
    }

    handleBpmChange = event => {
        const bpm = event.value;

        if (this.state.playing) {
            clearInterval(this.timer);
            this.timer = setInterval(() => this.click.play(), (60 / bpm) * 1000);
        }

        this.setState({ bpm });
    };

    startStop = event => {
        event.target.blur()
        if (this.state.playing) {
            clearInterval(this.timer);
            this.setState({ playing: false });
        } else {
            this.timer = setInterval(() => this.click.play(), (60 / this.state.bpm) * 1000);
            this.setState({ playing: true }, () => this.click.play());
        }
    };

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <div className="metronome" id="onCenter">
                <div className="bpm-slider">
                    <RoundSlider 
                        sliderType="min-range" 
                        circleShape="pie"
                        startAngle="315"
                        lineCap="round"
                        radius="130"
                        width="20"
                        min="40"
                        max="218"
                        pathColor="#eee"
                        borderWidth="0"
                        startValue="129"
                        update={this.handleBpmChange} 
                        value={this.state.bpm}
                    />
                </div>
                <button className="btn btn-lg btn-success" onClick={this.startStop}>{this.state.playing ? 'Stop' : 'Start'}</button>
            </div>
        );
    }
}

export default Metronome;