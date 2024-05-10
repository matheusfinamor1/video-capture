import React from "react";
import { Text, TouchableOpacity, View } from 'react-native'

import { CameraViewProps } from './props'
import { styles } from './styles'
import { CameraView } from 'expo-camera'

export default function CameraComponent({
    cameraRef,
    isRecording,
    onRecord,
    onStopRecording
}: CameraViewProps){
    return(
        <CameraView style={styles.container} ref={cameraRef}>
            <View style = {styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonRecord} onPress={isRecording ? onStopRecording : onRecord}>
                    <Text style={styles.buttonText}>
                        {isRecording ? "Stop Recording" : "Start Record"}
                    </Text>
                </TouchableOpacity>
            </View>
        </CameraView>
    )
}