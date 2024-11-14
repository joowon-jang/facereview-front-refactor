# Face Review
AI를 이용한 YouTube시청자(웹캠 사용자)의 감정분석 프로젝트

## 🗓️ 프로젝트 기간
- 2023.10 ~ 2023.12

## 👥 팀원
- 장주원 - _Frontend_
- 박찬진 - _Frontend_
- 김대선 - _Backend_
- 조경연 - _AI + Backend_

## 💻 기술 스택
### FE
- TypeScript, JavaScript
- React
- Zustand
- SCSS
- Git

### BE
- Flask
- Python (OpenCV, TensorFlow 등)

## 📼 시연영상

https://github.com/user-attachments/assets/094d6744-376c-4791-b302-cde04013b97b


## 🔍 프로젝트 상세

![](https://velog.velcdn.com/images/juwon98/post/4327c96f-f5e6-4024-8a0a-284c9d846771/image.png)

페이스리뷰는 이름 그대로 이용자의 표정을 통해 감정을 분석하고, 그 **분석된 감정 데이터**를 분석해서 **비슷한 감정분포를 가지는 영상들**을 추천할 수 있도록 **영상 추천 알고리즘에 활용**하였다.

![](https://velog.velcdn.com/images/juwon98/post/b7ac86dd-e418-4855-8170-8a980057b80d/image.png)

소켓 연결을 통해 실시간으로 유저의 웹캠 이미지 데이터를 서버로 전송하고, 전달받은 이미지 데이터를 훈련된 AI모델에 전달해 감정을 분석한다.

![](https://velog.velcdn.com/images/juwon98/post/0ad31b73-59e3-4f84-87c6-e1995f57b414/image.png)

분석된 감정 데이터는 DB에 저장되어 유저에게 영상을 추천하는 알고리즘에 사용되고, 해당 영상의 시간대별 타 유저들이 느낀 감정, 유저가 최근 본 영상에서 느낀 감정분포 그래프 등을 보여준다.

![](https://velog.velcdn.com/images/juwon98/post/f2b2d4f9-1278-48e0-aec7-d0e9c0c2913a/image.png)

![](https://velog.velcdn.com/images/juwon98/post/e0a77160-b421-45d9-9e51-77dc8e3c0a57/image.png)

Front-end는 AWS를 통한 CI/CD 무중단 배포를 구현하였고,
Back-end에서는 Google GCP 서버를 사용하였다.

## 🤖 AI 학습 과정

![](https://velog.velcdn.com/images/juwon98/post/f31cbb72-84de-41a2-8589-6e78fc3fde98/image.png)

![](https://velog.velcdn.com/images/juwon98/post/57d2cebe-424a-4f73-ab19-1dd8ff6e6060/image.png)

AI모델을 훈련하는 과정에서는 AI Hub에서 제공하는 '한국인 감정인식을 위한 복합 영상' 데이터셋을 사용하였으며, openCV에서 제공하는 detect_face 함수를 통해 사진에서 얼굴 부분만 잘라 resizing하고, 흑백처리를 한 뒤 진행하였다.
ResNet50 방식을 사용하였으며, 학교에서 제공해준 리눅스 서버에서 batch size 등 설정을 바꿔가며 훈련시킨 여러 모델 중 손실률이 가장 낮고, 정확도가 높은 모델을 채택하였다.
