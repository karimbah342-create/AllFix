import { useEffect, useRef } from 'react';
import { BackHandler, Linking, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import appHtml from './appHtml';

// Appens gränssnitt finns i web/alltfix.html (byggs till appHtml.js med `npm run build:web`).

// Androids bakåtknapp: gå tillbaka inne i appen, stäng appen först på startsidan.
const BACK_JS = `
  (function(){
    try {
      if (typeof S !== 'undefined' && (S.stack.length > 1 || S.tab !== 'home')) { back(); }
      else { window.ReactNativeWebView.postMessage('exit'); }
    } catch (e) { window.ReactNativeWebView.postMessage('exit'); }
  })(); true;
`;

const BASE_URL = 'https://alltfix.local/';

// Länkar ut ur appen (t.ex. Google Maps) öppnas i rätt app i stället för inne i appen.
function handleNavigation(req) {
  const url = req.url || '';
  if (url === 'about:blank' || url.startsWith(BASE_URL) || url.startsWith('data:')) return true;
  Linking.openURL(url).catch(() => {});
  return false;
}

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
        <StatusBar style="dark" backgroundColor="#ffffff" />
        <View style={styles.root}>
          <WebView
            ref={web}
            source={{ html: appHtml, baseUrl: BASE_URL }}
            originWhitelist={['*']}
            domStorageEnabled
            javaScriptEnabled
            bounces={false}
            overScrollMode="never"
            setSupportMultipleWindows={false}
            onShouldStartLoadWithRequest={handleNavigation}
            style={styles.web}
            onMessage={(e) => { if (e.nativeEvent.data === 'exit') BackHandler.exitApp(); }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#ffffff' },
  web: { flex: 1, backgroundColor: '#ffffff' },
});
