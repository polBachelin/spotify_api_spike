import { Component } from "react";
import {Button, Drawer, DrawerOverlay, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerContent, useDisclosure} from '@chakra-ui/react'

function InfoDrawer() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleClick = () => {
        onOpen()
    }

    return (
        <>
        <Button
            onClick={() => handleClick()}
            key={'md'}
            m={4}
        >{`Open info Drawer`}</Button>
        <Drawer onClose={onClose} isOpen={isOpen} size='md'>
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{`Info drawer contents`}</DrawerHeader>
            <DrawerBody>
                <p><b>acousticness: </b> A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.</p>
                <br></br>
                <p>
                <b>danceability: </b> Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.
                </p>
                <br></br>
                <p>
                    <b>duration_ms: </b>
                The duration of the track in milliseconds.
                </p>
                <br></br>
                <p>
                    <b>energy: </b>
                Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.
                </p>
                <br></br>
                <p>
                    <b>instrumentalness: </b>
                Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content. Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.
                </p>
                <br></br>
                <p>
                    <b>key: </b>
                The key the track is in. Integers map to pitches using standard Pitch Class notation. E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.
                </p>
                <br></br>
                <p>
                    <b>liveness: </b>
                Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. A value above 0.8 provides strong likelihood that the track is live.
                </p>
            </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>
    )
}

export default InfoDrawer