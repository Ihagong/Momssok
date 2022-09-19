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
  background-color: white;
  border-radius: 20px;
  border: 0;
  font-family: 'Jua', sans-serif;
  font-size: 40px;
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