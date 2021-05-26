## 토닥토닥
토닥토닥은 개인의 고민을 작성하고, 공유하며 서로를 위로해줄 수 있는 앱입니다.

## Motivation
개인의 고민을 친한 친구들이나 가족들에게 말할 수 있지만 때론 나라는 걸 밝히지 않고,
이야기하고 싶은 고민들을 편하게 털어놓고 싶은 공간이 필요했습니다.

더불어 이와 같은 의도를 가지고 만들기 위해 웹이 좋을지 앱이 좋을지를 생각했습니다.
사용자가 고민이 있을 때 앱이라는 플랫폼을 통해 보다 빠르고 쉽게 접근할 수 있을 것 같아
앱으로 개발하게 되었습니다.

## Feather
- 나의 고민을 작성, 수정, 삭제를 할 수 있습니다.
- 작성된 고민에 좋아요(토닥 토닥) 기능을 사용할 수 있습니다.
- 작성된 고민에 댓글을 달거나, 댓글들을 확인할 수 있습니다.
- 작성된 댓글에 좋아요 및 친구 추가 기능을 사용할 수 있습니다.
- 요청 들어온 친구 목록들을 관리할 수 있습니다.
- 수락된 친구들과 1 대 1 채팅을 할 수 있습니다.
- 내가 읽지 않는 메시지 수를 보여줍니다.

## Installation
### Client
```
SERVER_URL=<YOUR_NETWORK_ADDRESS>
```
- 개인의 인터넷 주소가 필요합니다.

### Server
```
MONGO_URL=<YOUR_MONGO_URL>
SECRET_TOKEN=<SECRET_STRING>
```

- 개인의 MongoDB 계정 및 Cluster가 필요합니다.

## Technology stack
### Client
- React-Native
  - 앱 개발을 위해 React-native를 선택했습니다.
- Expo
- Redux-toolkit
  - 기존 Redux뿐만 아니라 toolkit을 통한 데이터 flow 관리를 통해
    프로젝트를 진행했습니다.
- Thunk
  - thunk를 통해 비동기적 흐름을 제어했습니다.
- Socket.io
  - 채팅 기능 구현을 위해 socket.io를 사용했습니다.

### Server
- Node.js
- MongoDB
- Mogoose
- Socket.io
- Joi


## Develop period
<2021/05/03 ~ 2021/05/21>

### 05/03 ~ 05/06
- 개발 아이디어 선정 및 Figma를 통한 mockup design 및 Schema 작성
  - Figma 주소: [https://www.figma.com/file/wCZKddLMLTedTdmOQCdiCU/토닥-토닥?node-id=0%3A1&frame-preset-name=iPhone 11 Pro %2F X](https://www.figma.com/file/wCZKddLMLTedTdmOQCdiCU/%ED%86%A0%EB%8B%A5-%ED%86%A0%EB%8B%A5?node-id=0%3A1&frame-preset-name=iPhone%2011%20Pro%20%2F%20X)

  - Schema 주소: https://lucid.app/lucidchart/invitations/accept/inv_64ccebb4-c87b-4aa6-8b8d-cb89bd36c925

### 05/06 ~ 07
- Client쪽 초기 Layout 작업 및 Server 초기 상태 구축, schema 작성

### 05/08 ~ 14
- 메인 기능에 대한 상세 Layout 작업 및 Server DB 메인 기능 controller logic 구현

### 05/15 ~ 16
- Redux Toolkit을 통한 상태 관리

### 05/17 ~ 21
- 버그 수정 및 코드 리팩토링 작업

## 구현 중 어려웠고, 고민했던 점
- React Native를 활용한 프로젝트 시작에 앞서 기본 React와의 차이점 그리고
  개념적인 골자를 이해하는데 시간을 투자했습니다.

  기본적으로 React Native는 HTML 문법을 사용하지 않는다는 점과 같은 기본적인 내용과
  Route 되는 방식의 차이를 알 수 있었는데, 이 부분은 어떤 개념인지 와닿지 않았기에
  직접 경험해봐야 알 수 있겠다는 생각이 들었습니다.

  이는 개발을 시작한지 얼마되지 않아 발생되었고, 현상은 아래와 같았습니다.
  유저가 글을 작성한 후 정상적으로 글이 등록이 된 경우 개인 문서 보관 Screen으로 이동하는데
  이 때 작성한 글이 추가된 상태가 아닌 추가 전 상태로 유저에게 보여지는 문제가 첫 번째 문제였으며,

  두 번째 문제는 좋아요 기능을 누른 후 이전 페이지로 돌아갔을 때 좋아요에 대한 카운트 횟수가 반영되지 않고
  이전의 내용을 보여주는 위 두가지의 문제를 겪었습니다.

  이와 같은 문제 해결을 위해 공식 문서의 navigation와 이러한 특징을 기반으로 구글링을 하여,
  첫 번째 해결안으로 `navigation.addListener("focus", () => {})`을 통해
  해당 Screen에 focus 될 때 해당 함수를 호출하여 갱신된 데이터를 받는 방식을 사용했습니다.

  두 번째 해결안으로 `useFocusEffect` hook을 통해 위와 동일한 방식이지만
  React Native에서 제공하는 hook을 통해 문제를 해결했습니다. 현재는 hook을 사용한 방식입니다.

  Category 별 고민들을 관리하는 부분에서도 많은 고민을 했습니다.
  기존 방식은 각 Category 이동 시 새로운 데이터를 갱신 받기 위해 매번 fetch 함수를 호출했습니다.
  이는 곧 서버에 많은 트래픽을 요구하는 문제를 야기했으며,
  처음에는 이를 해결하기 위해 Pagination을 통해 가져오는 데이터 수를 제한했지만, 근본적인 해결책은 아니였습니다.

  해결책을 강구하고자 많은 트래픽을 요구하는 다른 SNS 설치 후 사용해보며 해당 어플들의 데이터 관리법을
  사용자의 입장으로 느껴보는 시간을 가져보았습니다.
  이를 통해 항상 새로운 데이터를 받지 않는다는 점을 알게 되었으며,
  기존의 내용을 보다가 다른 페이지로 이동 후 기존의 내용 중 못 본 내용을 보고 싶어하는 유저를
  위해 갱신하지 않으며, 갱신을 위해 어떠한 수단 이를테면 갱신 버튼 혹은 특정 제스쳐를 통해 해결한다는 점을 알게되었습니다.

  기능에 대한 개발 방향을 계속해서 새로운 데이터를 보여주는 것이 아닌 해당 Screen에서 Category 별 이동 시에는
  기존의 데이터를 보여주고, 유저가 특정 제스처를 통해 갱신할 경우, 아예 다른 스크린을 왔다 오는 두 가지에서 갱신하는 방향으로
  변경했습니다.

  이를 위해 Redux을 통한 post state 관리가 필요하다고 생각했으며, 비동기 로직 관리를 위한 thunk 그리고
  toolkit과 Redux slice 방식을 사용했습니다.
  비동기 로직의 pending, rejected, fulfilled 3 개의 상태 관리로
  유저에게 fetch 중이라는 걸 알려주는 Loading 시점을 조절했습니다.

  위와 같은 과정을 통해 내가 개발하는 앱이지만, 시장에 나와있는 수많은 아이템들을 사용하여 어떤 방식으로 데이터를 관리하고
  이렇게 관리함으로서 얻을 수 있는 이점이 무엇인지 생각하는 법을 터득할 수 있었으며, 이와 같은 방법이 굉장히 중요하다는 점을
  깨달을 수 있었습니다.

  더불어 Redux toolkit을 통한 state 관리가 기존 Redux의 boiler plate가 상대적으로 많다는 점
  한 곳에서 해당 내용을 확인할 수 있다는 것이 얼마나 중요한지에 대해서 알 수 있었습니다.
