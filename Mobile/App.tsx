import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import Widget from './src/components/Widget';
import { theme } from './src/theme';

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium
  })

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: theme.color.background
    }}>

      <StatusBar
        style="auto"
        backgroundColor='transparent'
        translucent
      />
      <Widget />
    </View>
  );
}


