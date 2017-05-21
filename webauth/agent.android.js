import {
  NativeModules,
  Linking
} from 'react-native';

const { A0Auth0 } = NativeModules;

export default class IntentActivity {

  show(url) {
    return new Promise((resolve, reject) => {
      const resume = (event) => {
        Linking.removeEventListener('url', resume);
        resolve(event.url);
      };
      A0Auth0.showUrl(url, (err) => {
        Linking.removeEventListener('url', resume);
        reject(err);
      });
      Linking.addEventListener('url', resume);
    });
  }

  hide() {
    // NOOP
  }

  newTransaction() {
    return new Promise((resolve, reject) => {
      A0Auth0.oauthParameters((parameters) => {
        resolve(parameters);
      });
    });
  }
}