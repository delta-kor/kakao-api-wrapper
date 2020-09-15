# KAKAO-API-WRAPPER
NodeJS Kakao REST API Wrapper

## Getting Started

### Installation
[![NPM](https://nodei.co/npm/kakao-api-wrapper.png)](https://npmjs.org/package/kakao-api-wrapper)  

**Node.js 8.0 or newer is required.**  
Installation can be done by using ```npm``` command

```
$ npm install kakao-api-wrapper
```

or with ```yarn```

```
$ yarn add kakao-api-wrapper
```

### Features
* Daum search API
    - Web Search
    - Video Search
    - Image Search and more!
* Map ( Local ) API
    - Address Search
    - Coord to address
    - Transcoord and more!

## Usage

### Searching Web Content
```javascript
const { Kakao } = require('kakao-api-wrapper');
const kakao = new Kakao(/* api key */);

const search = kakao.daum.web('iz one');
search.then(function(result) {
  console.log(result.documents[0].title);
});
```

### Searching Address
```javascript
const { Kakao } = require('kakao-api-wrapper');
const kakao = new Kakao(/* api key */);

const search = kakao.map.coordToAddress(127.423084873712, 37.0789561558879);
search.then(function(result) {
  console.log(result.documents.address.address_name);
});
```
