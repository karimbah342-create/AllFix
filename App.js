import { useEffect, useRef } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import appHtml from './appHtml';

// Androids bakåtknapp: gå tillbaka inne i appen, stäng appen först på startsidan.
const BACK_JS = `
  (function(){
    try {
      if (typeof S !== 'undefined' && S.stack.length > 1) { back(); }
      else if (typeof S !== 'undefined' && S.tab !== 'home') { tab('home'); }
      else { window.ReactNativeWebView.postMessage('exit'); }
    } catch (e) { window.ReactNativeWebView.postMessage('exit'); }
  })(); true;
`;

export default function App() {
  const web = useRef(null);

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      web.current?.injectJavaScript(BACK_JS);
      return true;
    });
    return () => sub.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <StatusBar style="light" backgroundColor="#0f2a26" />
        <View style={styles.root}>
          <WebView
            ref={web}
            source={{ html: appHtml, baseUrl: 'https://alltfix.local/' }}
            originWhitelist={['*']}
            domStorageEnabled
            javaScriptEnabled
            bounces={false}
            overScrollMode="never"
            setSupportMultipleWindows={false}
            style={styles.web}
            onMessage={(e) => { if (e.nativeEvent.data === 'exit') BackHandler.exitApp(); }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0f2a26' },
  web: { flex: 1, backgroundColor: '#f3f6f4' },
});
