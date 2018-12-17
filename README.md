# Study Helper - Web

Web & App Project

## Guide

1. NodeJS 설치 `https://nodejs.org`.
2. Angular CLI 설치 `npm install -g @angular/cli`.
3. 다운로드 Project `https://github.com/EM-HJ-YH/study-helper-web.git`.
4. 다운로드 폴더에 가서 `npm install` 실행.
5. `node_modules/@types/googlemaps/index.d.ts` 파일 수정.
    - -> `declare module 'googlemaps';`을 추가.
6. `src/app/service`의 모든 파일에서 모든 url을 본인의 것으로 수정.
7. `src/index.html`의 `<script async defer src="//maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>`에서 YOUR_API_KEY 부분을 본인의 것으로 수정.
8. Google Map API KEY 발급은 `https://blog.cosmosfarm.com/archives/389/%EA%B5%AC%EA%B8%80-%EC%A7%80%EB%8F%84-api-%ED%82%A4-%EB%B0%9C%EA%B8%89-%EB%B0%9B%EB%8A%94-%EB%B0%A9%EB%B2%95-maps-javascript-api/` 사이트 참조
9. 로컬에서 실행 시 `ng serve --open` 사용.
10. AWS 인스턴스에서 실행 시 `ng serve --host 0.0.0.0` 사용.
