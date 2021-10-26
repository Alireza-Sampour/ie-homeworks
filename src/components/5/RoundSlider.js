import React from 'react';
import $ from 'jquery';
import 'round-slider';
import 'round-slider/dist/roundslider.min.css';

class RoundSlider extends React.Component {

    componentDidMount() {
        this.$rsEle = $(this.refs.roundSlider);
        const options = Object.assign({ svgMode: true }, this.props);
        this.$rsEle.roundSlider(options);
    }

    componentWillReceiveProps(nextProps) {
        var color = nextProps.value > nextProps.startValue ? "#FF5722" : "#8BC34A";
        this.$rsEle.roundSlider({
            "rangeColor": color,  
            "tooltipColor": color
          });
        if (nextProps.value !== this.props.value) {
            this.$rsEle.roundSlider("option", "value", nextProps.value);
        }
    }

    render() {
        return (
            <div ref="roundSlider"></div>
        );
    }
};

export default RoundSlider;