# color_consensus
This project aims to find a relationship between sound and color in a decentralized way. Users can upload audio files and match them with a color to participate in a database of sound/color values.

color_consensus is part of my bachelor project, which researches how decentralized blockchain systems can impact creative collaboration in sample based music prodution. All users I've personally invited to participate are artists/sound designers who agreed to share their own files.

If you want to participate, keep a few things in mind:
- All files are stored publicly using IPFS. If you want users to be able to access the file, you'll have to run a node (or a web extension)
- All stored links are immutable, so only upload what you own and are comfortable storing in an open database
- Uploading anything other than audio files (wav/mp3) will result in dead squares which simply won't play. Make sure you post the exact hash, otherwise you'll waste gas

TODO
- [x] basic layout
- [x] smart contract communication
- [] demo samples
- [] save sample as color hex value
- [] test raspi deployment
- [] rinkeby deployment
