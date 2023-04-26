import { GlobalStore } from 'react-native-global-state-hooks';
const user = new GlobalStore(null);
const gathering = new GlobalStore(null);
const category = new GlobalStore(null);
const field = new GlobalStore(null);
export const currentUser = user.getHook();
export const currentGathering = gathering.getHook();
export const currentCategory = category.getHook();
export const currentField = field.getHook();