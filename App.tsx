
import { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native';

import { CameraView, Camera, CameraRecordingOptions } from 'expo-camera'
import { shareAsync } from 'expo-sharing'
import * as MediaLibrary from 'expo-media-library'

import VideoPlayer from './src/components/VideoPlayer';
import CameraComponent from './src/components/CameraComponent'

export default function App() {
  const cameraRef = useRef<CameraView>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [video, setVideo] = useState<any>()

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

  const recordVideo = () =>{
    setIsRecording(true)

    const options : CameraRecordingOptions = {
      maxDuration: 60
    }

    if(cameraRef && cameraRef.current){
      cameraRef.current.recordAsync(options).then((recordedVideo: any) =>{
          setVideo(recordedVideo)
          setIsRecording(false)
      })
    }else {
      console.error("Referência da câmera não disponível para gravação");
      
    }
  }

  const stopRecording = () => {
      setIsRecording(false)
      if(cameraRef && cameraRef.current){
        cameraRef.current.stopRecording()
      }
  }

  if(video){
    const shareVideo = () => {
      shareAsync(video.uri).then(() => {
        setVideo(undefined)
      })
    }
    const saveVideo = () => {
      MediaLibrary.saveToLibraryAsync(video.uri).then(()=> {
        setVideo(undefined)
      })
    }
    const discardVideo = () => {
      setVideo(undefined)
    }

      return (
        <VideoPlayer
          video={video}
          onShare={shareVideo}
          onSave={saveVideo}
          onDiscard={discardVideo}
        />
      )
  }

  return (
    <CameraComponent
    cameraRef={cameraRef}
    isRecording ={isRecording}
    onRecord={recordVideo}
    onStopRecording={stopRecording}/>
  );
}