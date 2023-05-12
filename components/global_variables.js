import { GlobalStore } from 'react-native-global-state-hooks';
const user = new GlobalStore(null);
const gathering = new GlobalStore('');
const category = new GlobalStore('');
const field = new GlobalStore('');
const filter = new GlobalStore('Own Gatherings');

export const currentUser = user.getHook();
export const currentGathering = gathering.getHook();
export const currentCategory = category.getHook();
export const currentField = field.getHook();
export const currentFilter = filter.getHook();