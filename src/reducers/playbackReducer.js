import { PLAYBACK_CHANCE } from '../constants';

const initialState = {
    playback: false
};
const playbackReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLAYBACK_CHANCE:
            return {
                ...state,
                playback: action.payload
            };
        default:
            return state;
    }
}
export default playbackReducer;
