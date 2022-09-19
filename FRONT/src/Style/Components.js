import styled from 'styled-components'
import './color.css'


export const FindPasswordTag = styled.a`
  color: var(--Brown-LightText);
  font-family: 'Jua', sans-serif;
  font-size: 28px;
`

export const SignUpTag = styled.a`
  color: var(--Brown-Text);
  font-family: 'Jua', sans-serif;
  font-size: 28px;
`

export const TextTag = styled.p`
  color: var(--Brown-LightText);
  font-family: 'Jua', sans-serif;
  font-size: 28px;
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
`