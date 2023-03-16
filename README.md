# Better Twitch Chat

!! This is very work in progress, though not much work is happening at the moment.

A new Twitch Chat Client with some third party things.

![Screenshot](https://i.imgur.com/Zw0NifK.jpeg)

## Features

#### Config cloud

Settings and joined channels will be synced across devices.

#### Emotes
- [x] Twitch
- [x] BetterTTV
- [x] FFZ
- [x] 7TV

#### All Mentions collected in one place in a Mentions tab.

#### Command Sugestions and Autocomplete
- [x] Twitch
- [x] StreamElements
- [x] Nightbot
- [ ] Fossabot

![Command Sugestions](https://i.imgur.com/A8eRDpW.jpeg)

#### IRC replies

![Screenshot Replise](https://i.imgur.com/8DjfJK0.jpeg)

#### One Click Sub/Follower/Emoteonly mode

![State Buttons](https://i.imgur.com/1vHIidZ.jpeg)

## Install

Look at [Latest Releases](https://github.com/luckydye/better-twitch-chat/releases).

I am open to any feedback, please contact me on [Twitter](https://twitter.com/timh4v)

## Development

Install [NodeJS](https://nodejs.org/en/) and [Rust](https://www.rust-lang.org/).

Run ```npm install```

Run ```npm run build:cw``` to start the watch build process for the client.

Start a local dev server using the LiveServer extension in VSCode.  
Or temporarily change 
```"devPath": "http://localhost:5500/client",``` 
in src-tauri/tauri.conf.json to 
```"devPath": "../client",```.

Run ```npm run tauri dev``` or hit F5 in VSCode to compile the app.

## Roadmap

- manage predictions and polls through twitch.tv/popout/*/predictions
- custom commands: define custom / commands, for less "!command" spam.

- [x] fix the scrolling when switching channels
- [x] bookmark line
- [x] show point redemtions in chat !important
- [x] make the profile ring red on a mention
- [x] Chat commands and names sugestions
- [x] finish Emote Picker
- [ ] Fix room drag n drop
- [ ] update title and game via websocket, not interval
- [ ] (implement dialog for one-click timeout, to prevent missclicks)
- [ ] Edit stream information like title and game

## Ideas (TODOs):
- [x] sub mode toggle
- [x] All the emotes
- [x] Stream Title
- [x] Uptime/Live indicator
- [x] Put the bio n stuff at the top of the chatroom
- [x] open in browser
- [x] per chat user appearence
- [x] added rooms not appearing
- [x] colse chats
- [x] open user list
- [x] mod tools
- [x] Auth flow
- [x] follower mode + mode dropdown
- [x] (MessageParser) seperate out the message log part of the chat for seperate mention and whisper tab wihtout, chat-input, bio and room state stuff
- [ ] Notifications
- [ ] Reccomend channels from follow list
- [ ] UI for
    - Pols
    - Predictions
- [ ] Redo the chat renderer component. Only render messages to doc that are visible. Then scroll that buffer up and down by line.

#### Visibility panel
- [ ] Show/Hide deleted messages
- [ ] adjustable chat font size
- [ ] Hide emtoes by service
- [ ] Streamer features
    - Hide names
    - Hide badges
- [ ] Spam grouping
    - find a way to get a value based on the difference between messages
    - group messages if msg.unique_words == msg.unique_words
    - make content IDs/hashes.
    - find existing chat messages that match that id/hash
    - move message down to latest and add to a counter on the message
- [ ] Hide messages from bots
- [ ] Timestamps

#### Chat
- [x] emote and badge tool tips
- [x] User panel (used the twitch userpanel as popout)
- [ ] Inline Notifications
    - Game change
    - Stream Title change
- [ ] "Threads" (Mentions and replies)
    - Optin thread
    - Person gets added to thread on mention

#### Text Inputs
- [x] input history navigation
- [x] Chat commands
- [x] Suggest bot commands aswell if posible
- [ ] Username color picker
- [ ] Input emote parsing
