# ✔ 에러 및 해결방법

### MySQL

- MySQL 실행 안되는 현상

  ![image-20220906155209121](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\image-20220906155209121.png)

​	editor가 열려야하는데 무한 opening 중



![image-20220906155307520](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\image-20220906155307520.png)

→ 마우스 오른쪽 버튼 클릭해서 MySQL80 중지하고 다시 실행



![image-20220906155420522](C:\Users\multicampus\AppData\Roaming\Typora\typora-user-images\image-20220906155420522.png)

→ 포트문제였다. '서비스'에 들어가서 MariaDB '중지'

<br>

<br>

## 📜참고 레퍼런스

- 특정시간별 이미지를 얻고 싶을 때

```
https://hanke-r.tistory.com/109
```



- 임시저장 처리

```
https://velog.io/@myway00/Spring-Boot-%EC%9E%84%EC%8B%9C-%EC%A0%80%EC%9E%A5%EC%9D%98-%EA%B5%AC%ED%98%84
```

데이터를 임시저장하고 싶으면 서버로 보내서 DB에 저장하는 방법과 브라우저 임시 저장공간(localStorage)을 사용하는 방법이 있다. 위 주소는 첫 번째 방법에 대한 내용.