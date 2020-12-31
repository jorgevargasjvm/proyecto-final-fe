import React, {useState} from 'react'
import Video from '../../assets/videos/video.mp4'
import {Button} from '../Buttons'
import {
    AnimationContainer,
    AnimationBg,
    VideoBg,
    AnimationContent,
    AnimationH1,
    AnimationP,
    AnimationBtnWrapper,
    ArrowForward,
    ArrowRight
} from './AnimatedBackgroundElements';
import {animateScroll as scroll} from 'react-scroll'

const AnimatedBackground = () => {
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover)
    };

    const toggleHome = () => {
        scroll.scrollTo(950)
    };

    return (
        <AnimationContainer>
            <AnimationBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4'/>
            </AnimationBg>
            <AnimationContent>
                <AnimationH1>Bienvenidos!</AnimationH1>
                <AnimationP>Lorem ipsum lorem ipsum lorem ipsum lorem ipsum?</AnimationP>
                <AnimationBtnWrapper>
                    <Button to="/" onClick={toggleHome} onMouseEnter={onHover} onMouseLeave={onHover} primary='true'
                            dark='true'>
                        Desplazarse hacia abajo {hover ? <ArrowForward/> : <ArrowRight/>}
                    </Button>
                </AnimationBtnWrapper>
            </AnimationContent>
        </AnimationContainer>
    )
}

export default AnimatedBackground;
