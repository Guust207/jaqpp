import { GlobalStore } from 'react-native-global-state-hooks';
const user = new GlobalStore(null);
export const currentUser = user.getHook();