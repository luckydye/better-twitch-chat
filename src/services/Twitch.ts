// import jwt from 'jsonwebtoken';
import { parseSearch } from '../utils';
import IRCChatClient from './IRCChatClient';
import TwichCommands from './TwichCommands';

const CLIENT_ID = "8gwe8mu523g9cstukr8rnnwspqjykf";
const REDIRECT_URI = "https://best-twitch-chat.web.app/auth";

let logged_in_username = "";
let logged_in = false;

function openChat(username: string, token: string) {
    try {
        console.log('connecting');
        
        IRCChatClient.connectoToChat(username, token).then(() => {
            window.dispatchEvent(new Event("loggedin"));
        })
    } catch (err) {
        console.error('Error opening chat', err);
    }
}

export function joinChannel(channel: string) {
    console.log('Joining channel');
    IRCChatClient.joinChatRoom(channel);
}

export async function handleAuthenticatedUser(token: string) {
    const userinfo = await fetchTwitchAuthApi("/oauth2/userinfo", token);
    const username = userinfo.preferred_username;

    console.log('Login', username);
    if (username == null) {
        localStorage.removeItem('user-token');
        logged_in = false;
        return;
    } else {
        localStorage.setItem('user-token', token);
        logged_in = true;
    }

    openChat(username, token);
}

export async function getLoggedInUser() {
    const token = localStorage.getItem('user-token');
    const userinfo = await fetchTwitchAuthApi("/oauth2/userinfo", token);
    logged_in_username = userinfo.preferred_username;
    return userinfo;
}

export function getLoggedInUsername() {
    return logged_in_username;
}

export async function getUserInfo(user_login: string) {
    const userinfo = await fetchTwitchApi("/users", `login=${user_login}`);
    const user = userinfo.data[0];
    const stream = await TwitchAPI.getStreams(user.id);
    const data = user;
    data.stream = stream[0];
    return data;
}

function fetchTwitchAuthApi(path: string = "/oauth2/userinfo", token: string) {
    const url = `https://id.twitch.tv${path}`;
    return fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error(err);
        })
}

export function fetchTwitchApi(path: string = "/users", query = "") {
    const token = localStorage.getItem('user-token');
    const url = `https://api.twitch.tv/helix${path}?${query}&client_id=${CLIENT_ID}`;
    return fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Client-Id': CLIENT_ID
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error(err);
        })
}

export function checLogin() {
    if (localStorage.getItem('user-token') && !logged_in) {
        const token = localStorage.getItem('user-token');
        handleAuthenticatedUser(token);
        return true;
    }
    return false;
}

export async function authClientUser() {


    // check if already logged in
    if (checLogin()) {
        return;
    }

    // else start auth process
    const type = "token+id_token";
    const scopes = [
        "channel:edit:commercial",
        "channel:manage:polls",
        "channel:manage:predictions",
        "channel:manage:redemptions",
        "channel:read:hype_train",
        "channel:read:polls",
        "channel:read:predictions",
        "channel:read:redemptions",
        "moderation:read",
        "user:manage:blocked_users",
        "user:read:blocked_users",

        "bits:read",
        "channel:read:redemptions",
        "channel:moderate",
        "chat:read",
        "chat:edit",
        "whispers:read",

        "openid"
    ];

    const claims = {
        "userinfo": {
            "preferred_username": null
        }
    };

    const url = `https://id.twitch.tv/oauth2/authorize?client_id=${CLIENT_ID}` +
        `&redirect_uri=${REDIRECT_URI}` +
        `&response_type=${type}` +
        `&scope=${scopes.join("%20")}` +
        `&claims=${JSON.stringify(claims)}`;

    const win = open(url);

    if (win) {
        win.addEventListener('load', e => {
            console.log("win load event", win);

            const params = win.location.hash;
            const parsed = parseSearch(params);

            const access_token = parsed.access_token;
            handleAuthenticatedUser(access_token);

            console.log('token', access_token);
            win.close();
        })
    } else {
        throw new Error('could not open authentication window');
    }
}


// function initEventSubSubscriptions() {
//     const ws = new WebSocket('wss://eventsub.twitch.tv');
//     console.log(ws);
// }

// setTimeout(() => {
//     initEventSubSubscriptions()
// }, 2000);


export default class TwitchAPI {

    static logout() {
        localStorage.removeItem('user-token');
        location.reload();
    }

    static async getStreams(user_id: string) {
        return (await fetchTwitchApi("/streams", "user_id=" + user_id)).data;
    }

    static async getChannel(user_id: string) {
        return (await fetchTwitchApi("/channels", "broadcaster_id=" + user_id)).data;
    }

    static getAvailableCommands() {
        return TwichCommands;
    }

}