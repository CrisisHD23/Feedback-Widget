import { ArrowLeft } from 'phosphor-react-native';
import React, {useState} from 'react';
import { 
    View, 
    TextInput, 
    Image, 
    Text, 
    TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system'
import { feedbackType } from '../Widget';
import { ScreenshotButton } from '../ScreenshotButton';
import { theme } from '../../theme';
import { styles } from './styles';
import { feedbackTypes } from '../../utils/feedbackTypes'
import { Button } from '../Button'
import { captureScreen } from 'react-native-view-shot' 
import { api } from '../../libs/api';

interface Props {
    feedbackType: feedbackType
    onFeedbackCancelled: () => void
    onFeedbackSent: () => void
}

export function Form({ feedbackType, onFeedbackCancelled, onFeedbackSent }: Props) {
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment,setComment] = useState("")

    const feedbackTypeInfo = feedbackTypes[feedbackType]

    function handleScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8
        })
        .then(uri => setScreenshot(uri))
        .catch(error => console.log(error))
    }

    function handleScreenshotRemove() {
        setScreenshot(null)
    }

   async function handleSendFeedback() {
    if(isSendingFeedback) {
        return;
        }

    setIsSendingFeedback(true)
    const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' })

    try{
        await api.post('/feedbacks', {
            type: feedbackType,
            screenshot: `data:image/png;base64, ${screenshotBase64}`,
            comment

        })

        onFeedbackSent()

    }catch(error){
        console.log(error)
        setIsSendingFeedback(false)
    }
   }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={onFeedbackCancelled}>
                <ArrowLeft
                size={24}
                weight="bold"
                color={theme.color.text_secondary}
                />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                <Image
                source={feedbackTypeInfo.image}
                style={styles.image}
                />
                <Text style={styles.titleText}>
                    {feedbackTypeInfo.title}
                </Text>
            </View>
        </View>
        
        <TextInput
        multiline
        style={styles.input}
        placeholder="Algo de errado? nos diga o problema..."
        placeholderTextColor={theme.color.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
        />


        <View style={styles.footer}>
            <ScreenshotButton
            onTakeShot={handleScreenshot}
            onRemoveShot={handleScreenshotRemove}
            screenshot={screenshot} 
            />

            <Button
            onPress={handleSendFeedback}
            isLoading={isSendingFeedback}

            />
        </View>
    </View>
  );
}