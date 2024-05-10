
import { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native';

import { CameraView, Camera } from 'expo-camera'
import { Video } from 'expo-av'
import { shareAsync } from 'expo-sharing'
import * as MediaLibrary from 'expo-media-library'

import VideoPlayer from './src/components/VideoPlayer';
import CameraComponent from './src/components/CameraView';
import { CameraViewProps } from './src/components/CameraView/props';

export default function App() {
  const cameraRef = useRef<CameraView>(null)
  const [isRecording, setIsRecording] = useState(false)

  const [hasCameraPermission, setHasCameraPermission] = useState(false)
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false)
  const [hasMediaPermission, setHasMediaPermission] = useState(false)

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync()
      const microphonePermission = await Camera.requestMicrophonePermissionsAsync()
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync()

      setHasCameraPermission(cameraPermission.status === "granted")
      setHasMicrophonePermission(microphonePermission.status === "granted")
      setHasMediaPermission(mediaLibraryPermission.status === "granted")
    })()
  }, [])

  if(hasCameraPermission === false || hasMicrophonePermission === false){
    return <Text>Não há permissão de camera ou audio</Text>
  }
  if(hasMediaPermission === false){
    return <Text>Não há acesso as bibliotecas</Text>
  }

  return (
    <CameraComponent
    cameraRef={cameraRef}
    isRecording ={isRecording}
    onRecord={recordVideo}
    onStopRecording={stopRecording}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
