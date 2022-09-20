import styled from 'styled-components'
import './color.css'


export const FindPasswordTag = styled.a`
  color: var(--Brown-LightText);
  font-family: 'Jua', sans-serif;
  font-size: 28px;
  user-select: none;
`

export const SignUpTag = styled.a`
  color: var(--Brown-Text);
  font-family: 'Jua', sans-serif;
  font-size: 28px;
  user-select: none;
`

export const TextTag = styled.p`
  color: var(--Brown-LightText);
  font-family: 'Jua', sans-serif;
  font-size: 28px;
  user-select: none;
`

export const ButtonTag1 = styled.button`
  width: 450px;
  height: 70px;
  color: white;
  background-color: var(--Brown-LightText);
  border-radius: 20px;
  border: 0;
  font-family: 'Jua', sans-serif;
  font-size: 36px;
  cursor: pointer;
  user-select: none;
`

export const ButtonTag2 = styled.button`
  width: 100px;
  height: 70px;
  color: white;
  background-color: var(--Brown-Text);
  border-radius: 20px;
  border: 0;
  font-family: 'Jua', sans-serif;
  font-size: 28px;
  cursor: pointer;
  user-select: none;
`

export const ButtonTag3 = styled.button`
  width: 230px;
  height: 70px;
  color: var(--Brown-Text);
  background-color: var(--Beige-Light);
  border-radius: 20px;
  border: 0;
  font-family: 'Jua', sans-serif;
  font-size: 40px;
  cursor: pointer;
  user-select: none;
`

export const ButtonTag4 = styled.button`
  width: 230px;
  height: 70px;
  color: white;
  background-color: #FF6029CC;
  border-radius: 20px;
  border: 0;
  font-family: 'Jua', sans-serif;
  font-size: 40px;
  cursor: pointer;
  user-select: none;
`

export const ChildButtonTag1 = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 230px;
  height: 70px;
  color: var(--Brown-Text);
  background-color: var(--Beige-Light);
  border-radius: 20px;
  border: 0;
  font-family: 'Dongle', sans-serif;
  font-size: 64px;
  cursor: pointer;
  user-select: none;
`

export const ChildButtonTag2 = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 230px;
  height: 70px;
  color: white;
  background-color: var(--Brown-LightText);
  border-radius: 20px;
  border: 0;
  font-family: 'Dongle', sans-serif;
  font-size: 64px;
  cursor: pointer;
  user-select: none;
`

export const ChildButtonTag3 = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 230px;
  height: 70px;
  color: white;
  background-color: #FF6029CC;
  border-radius: 20px;
  border: 0;
  font-family: 'Dongle', sans-serif;
  font-size: 64px;
  cursor: pointer;
  user-select: none;
`

export const AddProfileButtonTag = styled.button`
  width: 140px;
  height: 140px;
  color: white;
  background-color: #FF6029CC;
  border-radius: 50%;
  border: 0;
  cursor: pointer;
  img {
    width: 70px;
    height: 70px;
  }
  user-select: none;
`

export const AddProfileTextTag = styled.p`
  color: #FF6029CC;
  cursor: pointer;
  font-family: 'Jua', sans-serif;
  font-size: 40px;
  margin: 0;
  user-select: none;
`

export const InputTag1 = styled.input`
  color: var(--Brown-Text);
  width: 390px;
  height: 70px;
  padding: 0 30px;
  background-color: var(--Beige-Block);
  border-radius: 20px;
  border: 1px solid var(--Beige-Stroke);
  font-family: 'Jua', sans-serif;
  font-size: 28px;
  ::placeholder {
    color: var(--Beige-HintText);
  }
  user-select: none;
`

export const ChildProfileComponentTag = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--Brown-GrayText);
  cursor: pointer;
  user-select: none;
`

export const ProfileInfoInputTag = styled.input`
  color: var(--Brown-Text);
  height: 70px;
  padding: 0 30px;
  background-color: var(--Beige-Light);
  border-radius: 20px;
  border: 2px solid var(--Beige-Stroke);
  font-family: 'Jua', sans-serif;
  font-size: 28px;
  user-select: none;
`

export const ProfileInfoLabelTag = styled.label`
  color: var(--Brown-Text);
  font-family: 'Jua', sans-serif;
  font-size: 36px;
  margin: 0;
  user-select: none;
`

export const ChildMenuTag = styled.div`
  display: flex;
`

export const ChildMenuTabTag = styled.div`
  color: var(--Brown-Text);
  display: flex;
  flex-direction: column;
  font-family: 'Dongle', sans-serif;
  width: 170px;
  height: 200px;
  font-size: 60px;
  border-radius: 30px;
  background-color: var(--Beige-Light);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  img {
    width: 110px;
    height: 110px;
  }
`

export const ChildMenuSelectedTabTag = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  font-family: 'Dongle', sans-serif;
  width: 180px;
  height: 210px;
  font-size: 60px;
  border-radius: 30px;
  background-color: #FF6029CC;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  img {
    width: 110px;
    height: 110px;
  }
`

export const ChildSubMenuTag = styled.div`
  display: flex;
`

export const ChildSubMenuButtonTag = styled.div`
  color: var(--Brown-Text);
  display: flex;
  flex-direction: column;
  font-family: 'Dongle', sans-serif;
  width: 350px;
  height: 350px;
  font-size: 96px;
  border-radius: 50px;
  background-color: var(--Beige-Light);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  img {
    height: 180px;
  }
`

export const LogoTag = styled.img`
  width: 160px;
`

export const ChildProfileTag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Dongle', sans-serif;
  font-size: 60px;
  cursor: pointer;
  img {
    height: 130px;
  }
`

export const DiaryComponentTag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--White-Block);
  border: 1px solid var(--Beige-Stroke);
  border-radius: 30px;
  width: 700px;
  padding: 20px;
  font-family: 'Dongle', sans-serif;
  font-size: 60px;
  img {
    height: 130px;
  }
`

export const DiaryInputTag = styled.input`
  color: var(--Brown-LightText);
  border-radius: 10px;
  padding: 0 20px;
  height: 70px;
  border: 1px solid var(--Beige-Stroke);
  font-family: 'Dongle', sans-serif;
  font-size: 40px;
`

export const DiaryContentInputTag = styled.textarea`
  color: var(--Brown-LightText);
  border-radius: 10px;
  padding: 0 20px;
  height: 70px;
  border: 1px solid var(--Beige-Stroke);
  font-family: 'Dongle', sans-serif;
  font-size: 40px;
`

export const DiaryPaintingTag = styled.div`
  color: var(--Brown-LightText);
  background-color: white;
  border: 1px solid var(--Beige-Stroke);
  border-radius: 10px;
  width: 600px;
  height: 300px;
`

export const DiaryWeatherBoxTag = styled.div`
  background-color: white;
  position: relative;
  display: flex;
  width: 96px;
  height: 70px;
  border-radius: 10px;
  border: 1px solid var(--Beige-Stroke);
  cursor: pointer;
  user-select: none;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    width: 100%;
    background: transparent;
    cursor: pointer;
  }

  ul {
    border: 1px solid var(--Beige-Stroke);
    background-color: white;
    position: absolute; 
    top: 20px;
    width: 100%;
    padding: 0;
    border-radius: 10px;
    overflow: hidden;
  }

  li {
    border-bottom: 2px dashed var(--Brown-LightText);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70px;
  }

  li:hover {
    background-color: var(--Brown-GrayText);
  }

  li:last-child {
    border-bottom: 0 none;
  }

  img {
    height: 50px;
  }
`

export const EditProfileButtonTag = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 90px;
  color: white;
  background-color: #FF6029CC;
  border-radius: 24px;
  border: 0;
  font-family: 'Jua', sans-serif;
  font-size: 36px;
  cursor: pointer;
  user-select: none;
`

export const ParentMenuButtonTag = styled.div`
  color: var(--Brown-LightText);
  display: flex;
  flex-direction: column;
  font-family: 'Jua', sans-serif;
  width: 220px;
  height: 330px;
  font-size: 20px;
  border-radius: 40px;
  padding: 10px;
  background-color: var(--Beige-Light);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  h4 {
    margin: 0;
    color: var(--Brown-Text);
    font-size: 36px;
  }
  p {
    margin: 0;
  }
  img {
    height: 150px;
  }
`