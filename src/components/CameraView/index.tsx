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
        <CameraView>
            <View>
                <TouchableOpacity>
                    <Text>Record Video</Text>
                </TouchableOpacity>
            </View>
        </CameraView>
    )
}