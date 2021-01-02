import React, { useState } from 'react';
import { Button } from '../Buttons';
import {
    InfoContainer,
    InfoWrapper,
    InfoRow,
    Column1,
    Column2,
    TextWrapper,
    TopLine,
    Heading,
    Subtitle,
    BtnWrap,
    ImgWrap,
    Img,
    Row
} from './InfoElements';
import CircularProgress from '@material-ui/core/CircularProgress';

function InfoSection(props) {
    return (
        <div>
            <InfoContainer lightBg={props?.lightBg} id={props?.id}>
                <InfoWrapper>
                    <InfoRow imgStart={props?.imgStart}>
                        <Column1>
                            <TextWrapper>
                                <TopLine>{props?.topLine}</TopLine>
                                <Heading lightText={props?.lightText}>{props?.headline}</Heading>
                                <Subtitle darkText={props?.darkText}>{props?.description}</Subtitle>
                                <BtnWrap>
                                    {props?.isChoseFile ?
                                        <input type="file"
                                            ref={props?.hiddenFileInput}
                                            onChange={props?.handleChange}
                                            style={{ display: 'none' }}
                                            accept="image/x-png,image/gif,image/jpeg" /> : <></>}
                                    <Row>
                                        <Button
                                            onClick={props?.handleClick}
                                            to={props?.to}
                                            smooth={true}
                                            duration={500}
                                            spy={true}
                                            exact='true'
                                            offset={-80}
                                            primary={props?.primary ? 1 : 0}
                                            dark={props?.dark ? 1 : 0}
                                            dark2={props?.dark2 ? 1 : 0}>
                                            {props?.buttonLabel}
                                        </Button>
                                        {props?.showProcedButton ?
                                            <Button to="#" onClick={props?.handleImageProced}>
                                                {props?.loading ? <CircularProgress /> : "RUN PROCESSING"}
                                            </Button> : <></>}</Row>
                                </BtnWrap>
                            </TextWrapper>
                        </Column1>
                        <Column2>
                            <ImgWrap>
                                <Img src={props?.img} alt={props?.alt} />
                            </ImgWrap>
                        </Column2>
                    </InfoRow>
                </InfoWrapper>
            </InfoContainer>
        </div>
    )
};

export default InfoSection
