import { createStore, combineReducers } from 'redux';
import playbackReducer from '../reducers/playbackReducer';

const rootReducer = combineReducers(
    { playback: playbackReducer }
);
const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;