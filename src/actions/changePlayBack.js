import { PLAYBACK_CHANCE } from '../constants';

export function changePlayBack(playback) {
    return {
        type: PLAYBACK_CHANCE,
        payload: playback
    }
}