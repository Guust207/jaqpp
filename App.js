import { StyleSheet} from 'react-native';
import {login} from "./components/loginView";



export default function App() {
  return (login());
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
