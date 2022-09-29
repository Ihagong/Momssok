import styled from 'styled-components'
import './color.css'


export const FindPasswordTag = styled.div`
  color: var(--Brown-LightText);
  font-family: 'Jua', sans-serif;
  font-size: 26px;
  text-align: end;
  text-decoration: underline;
  margin-right: 10px;
  margin-top: 5px;
  cursor: pointer;
  user-select: auto;
`

export const SignUpTag = styled.a`
  color: var(--Brown-Text);
  font-family: 'Jua', sans-serif;
  font-size: 28px;
  text-decoration: underline;
  cursor: pointer;
  user-select: auto;
`

export const TextTag = styled.div`
  color: var(--Brown-LightText);
  font-family: 'Jua', sans-serif;
  font-size: 28px;
  text-align: center;
  user-select: auto;
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
  user-select: auto;
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
  user-select: auto;
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
  user-select: auto;
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
  user-select: auto;
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
  user-select: auto;
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
  user-select: auto;
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
  line-height: 60px;
  cursor: pointer;
  user-select: auto;
`

export const ChildButtonTag4 = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 230px;
  height: 70px;
  color: var(--Brown-LightText);
  background-color: var(--Beige-BG);
  border-radius: 20px;
  border: 0;
  font-family: 'Dongle', sans-serif;
  font-size: 64px;
  cursor: pointer;
  user-select: auto;
`

export const ChildButtonTag5 = styled.button`
  width: 100px;
  height: 70px;
  color: white;
  background-color: var(--Brown-Text);
  border-radius: 20px;
  border: 0;
  font-family: 'Dongle', sans-serif;
  font-size: 28px;
  cursor: pointer;
  user-select: auto;
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
  user-select: auto;
`

export const AddProfileTextTag = styled.p`
  color: #FF6029CC;
  cursor: pointer;
  font-family: 'Jua', sans-serif;
  font-size: 40px;
  margin: 0;
  user-select: auto;
`

export const InputTag1 = styled.input`
  color: var(--Brown-Text);
  width: 390px;
  height: 70px;
  padding: 0 30px;
  margin-top: 20px;
  background-color: var(--Beige-Block);
  border-radius: 20px;
  border: 1px solid var(--Beige-Stroke);
  font-family: 'Jua', sans-serif;
  font-size: 28px;
  ::placeholder {
    color: var(--Beige-HintText);
  }
  user-select: auto;
`

export const ChildProfileComponentTag = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Jua', sans-serif;
  color: var(--Brown-LightText);
  font-size: 20px;
  background-color: var(--Brown-GrayText);
  cursor: pointer;
  user-select: auto;
  p {
    color: var(--Brown-Text);
    font-size: 28px;
    margin: 8px 0 0 0;
  }
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
  user-select: auto;
`

export const ProfileInfoLabelTag = styled.label`
  color: var(--Brown-Text);
  font-family: 'Jua', sans-serif;
  font-size: 36px;
  margin: 0;
  user-select: auto;
`

export const ChildMenuTag = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`

export const ChildMenuTabTag = styled.div`
  color: var(--Brown-Text);
  display: flex;
  flex-direction: column;
  font-family: 'Dongle', sans-serif;
  width: 170px;
  height: 200px;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 60px;
  font-weight: bold;
  border-radius: 30px;
  background-color: var(--Beige-Light);
  box-shadow: 0px 5px 5px #E6E6E6;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: auto;
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
  font-weight: bold;
  margin-top: -10px;
  margin-left: 10px;
  margin-right: 10px;
  width: 180px;
  height: 210px;
  font-size: 60px;
  border-radius: 30px;
  background-color: #FF6029CC;
  box-shadow: 0px 5px 5px #E6E6E6;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: auto;
  img {
    width: 110px;
    height: 110px;
  }
`

export const ChildSubMenuTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
`

export const ChildSubMenuButtonTag = styled.div`
  color: var(--Brown-Text);
  display: flex;
  flex-direction: column;
  font-family: 'Dongle', sans-serif;
  width: 350px;
  height: 350px;
  margin-right: 70px;
  margin-left: 70px;
  font-size: 96px;
  font-weight: bold;
  border-radius: 50px;
  background-color: var(--Beige-Light);
  box-shadow: 0px 5px 5px #E6E6E6;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: auto;
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
  margin-left: 20px;
  margin-bottom: -20px;
  align-items: center;
  font-family: 'Dongle', sans-serif;
  font-size: 60px;
  font-weight: bold;
  color: var(--Brown-LightText);
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
  user-select: auto;

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
  user-select: auto;
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
  user-select: auto;
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

export const PaintingCanvasTag = styled.canvas`
  background-color: var(--White-Block);
  border-radius: 20px;
`

export const PaintingToolTag = styled.div`
  width: 160px;
  cursor: pointer;
  user-select: auto;
`

export const PaintingCardTag = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--Brown-Text);
  background-color: var(--White-Block);
  border-radius: 30px;
  width: 200px;
  height: 200px;
  font-family: 'Jua', sans-serif;
  font-size: 28px;
  cursor: pointer;
  img {
    height: 100px;
  }
`

export const PaintingCardDateStyleTag = styled.p`
  font-size: 28px;
  margin: 0;
`

export const PaintingCardTagStyleTag = styled.p`
  font-family: 'Dongle', sans-serif;
  font-size: 24px;
  margin: 0 3px;
`

export const CalendarTag = styled.div`
  display: grid;
  place-items: center;
  justify-content: center;
  align-items: center;
  grid-gap: 6px;
  color: var(--Brown-Text);
  background-color: #FFE4E3;
  border-radius: 40px;
  border: 0;
  padding: 20px;
  font-family: 'Dongle', sans-serif;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  user-select: auto;
`

export const CalendarDateTag = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 90px;
  height: 90px;
  color: var(--Brown-Text);
  background-color: #FFFFFF;
  border-radius: 20px;
  border: 0;
  line-height: 40px;
  font-family: 'Dongle', sans-serif;
  font-size: 40px;
  cursor: pointer;
  user-select: auto;
  p {
    margin: 0 0 0 10px;
    line-height: 40px;
    align-items: start;
    justify-content: start;
    height: 30px;
  }
  img {
    margin: 0 0 10px 0;
  }
`

export const PromiseItemTag1 = styled.div`
  width: 160px;
  height: 120px;
  background-color: var(--Beige-Light);
  border-radius: 30px;
  border: 0;
  transform: rotate(8deg);
  cursor: pointer;
  user-select: auto;
`

export const PromiseItemTag2 = styled.div`
  width: 160px;
  height: 120px;
  background-color: var(--Beige-Light);
  border-radius: 30px;
  border: 0;
  transform: rotate(-6deg);
  cursor: pointer;
  user-select: auto;
`

export const PromiseBoardTag = styled.div`
  display: grid;
  place-items: center;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 50px;
`

export const PromiseModalComponentTag = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 550px;
  background-color: var(--Beige-Light);
  border-radius: 30px;
  z-index: 1;
`

export const PromiseTodoItemTag = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Dongle', sans-serif;
  font-size: 60px;
  margin: 0;
  color: var(--Brown-Text);
  cursor: pointer;
  user-select: auto;
`

export const PromiseTodoItemDoneTag = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Dongle', sans-serif;
  font-size: 60px;
  margin: 0;
  text-decoration: line-through;
  color: var(--Brown-Stroke);
  cursor: pointer;
  user-select: auto;
`

export const PaintingToolModalComponentTag = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  height: 280px;
  background-color: #FBDEBC;
  border-radius: 20px;
`

export const PaintingToolButtonTag = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 168px;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  border-radius: 20px;
  z-index: 1;
`

export const StrokeWidthButtonTag = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  border-radius: 20px;
`

export const StrokeWidthTag = styled.div`
  height: 100px;
  border: 0;
  background-color: white;
  cursor: pointer;
  border-radius: 100px;
  transform: rotate(-45deg);
`

export const ModalBackgroundTag = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #05050560;
`

export const ColorPickerModalComponentTag = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px;
  background-color: #FFE400;
  border-radius: 12px;
`

export const ColorTag = styled.div`
  width: 100px;
  height: 100px;
  cursor: pointer;
`

export const ProfileImageTag = styled.div`
  display: inline-block;
  width: 150px;
  height: 150px;
  border: 6px solid #00000000;
  border-radius: 50%;
  cursor: pointer;
`

export const ProfileSelectedImageTag = styled.div`
  display: inline-block;
  width: 150px;
  height: 150px;
  border: 6px solid #FF005C;
  border-radius: 50%;
  cursor: pointer;
`

export const WebCamTag = styled.div`
  cursor: pointer;
`

export const PointerTag = styled.img`
  position: absolute;
  width: 80px;
  z-index: 2;
`

export const DictionaryCardComponentTag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--White-Block);
  border: 1px solid var(--Beige-Stroke);
  border-radius: 30px;
  width: 200px;
  height: 200px;
  padding: 20px;
  color: var(--Brown-Text);
  font-family: 'Dongle', sans-serif;
  font-size: 60px;
  img {
    height: 130px;
  }
  cursor: pointer;
`

export const DictionaryDetailComponentTag = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--White-Block);
  border: 1px solid var(--Beige-Stroke);
  border-radius: 30px;
  width: 550px;
  height: 600px;
  padding: 20px;
  color: var(--Brown-Text);
  font-family: 'Dongle', sans-serif;
  font-size: 60px;
  img {
    height: 400px;
  }
`

export const PaintingGuideTag = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 550px;
  color: var(--Brown-Text);
  font-family: 'Dongle', sans-serif;
  font-size: 60px;
  img {
    height: 400px;
  }
`


































// LetterPage

export const LetterPageHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  font-family: 'Dongle', sans-serif;
`

export const BrownText100 = styled.div`
  font-weight:bold;
  font-size: 100px;
  color: var(--Brown-Text);
  margin-left: 20px;
`

export const LightButton120 = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--Beige-Light);
  box-shadow: 0px 5px 5px #E6E6E6;
  cursor: pointer;
  border: none;
  width: 120px;
  height: 70px;
  margin-left: 20px;
  border-radius: 20px;

  font-family: 'Dongle', sans-serif;
  font-size: 50px;
  font-weight: bold;
  color: var(--Brown-Text);
  white-space: nowrap;
`
export const BrownLightButton150 = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--Brown-LightText);
  box-shadow: 0px 5px 5px #E6E6E6;
  cursor: pointer;
  border: none;
  width: 150px;
  height: 70px;
  margin-left: 10px;
  border-radius: 20px;

  font-family: 'Dongle', sans-serif;
  font-size: 50px;
  font-weight: bold;
  color: var(--White-Block);
  white-space: nowrap;
`

export const OrangeButton250 = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--Orange-Button);
  opacity:0.9;
  box-shadow: 0px 5px 5px #E6E6E6;
  cursor: pointer;
  border: none;
  width: 250px;
  height: 70px;
  margin-left: 10px;
  border-radius: 20px;

  font-family: 'Dongle', sans-serif;
  font-size: 55px;
  font-weight: bold;
  color: var(--White-Block);
  white-space: nowrap;
`

export const LightButton250 = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--Beige-Light);
  opacity:0.9;
  box-shadow: 0px 5px 5px #E6E6E6;
  cursor: pointer;
  border: none;
  width: 250px;
  height: 70px;
  margin-left: 10px;
  border-radius: 20px;

  font-family: 'Dongle', sans-serif;
  font-size: 55px;
  font-weight: bold;
  color: var(--Brown-Text);
  white-space: nowrap;
`

export const LetterItem = styled.div`
  box-shadow: 0px 5px 5px #E6E6E6;
  width: 1090px;
  height: 100px;
  border-radius: 20px;
  margin-top: 30px;
  margin-left: 50px;
`

export const LetterItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-family: 'Dongle', sans-serif;
  font-size: 64px;
  font-weight: bold;
  color: var(--Brown-LightText);

  padding-left: 30px;
  padding-right: 30px;
`

export const LetterItemAuthor = styled.div`
  font-size: 48px;
  text-align: center;
  margin-bottom: -20px;
`

export const EditorBody = styled.div`
  background-color: var(--White-Block);
  border-radius: 30px;
  border: 1px solid #C5BEB6;
  box-shadow: 0px 5px 5px #E6E6E6;

  width: 700px;
  height: 740px;
  margin-top: 20px;

  font-family: 'Dongle', sans-serif;
  font-size: 50px;
  font-weight: bold;
  color: var(--Brown-Text);
  white-space: nowrap;
`

export const LetterTitleBody = styled.section`
  display: flex;
  justify-content: space-around;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
`

export const LetterTitleDiv = styled.div`
  background-color: #FFFFFF;
  border-radius: 10px;
  border: 1px solid #C5BEB6;

  width: 530px;
  height: 65px;
  margin-left: 5px;
  padding-left: 20px;

  font-family: 'Dongle', sans-serif;
  font-size: 44px;
  font-weight: bold;
  color: var(--Brown-LightText);
  white-space: nowrap;
`

export const LetterTitleInput = styled.input`
  background-color: #FFFFFF;
  border-radius: 10px;
  border: 1px solid #C5BEB6;

  width: 530px;
  height: 65px;
  margin-left: 5px;
  padding-left: 20px;

  font-family: 'Dongle', sans-serif;
  font-size: 44px;
  font-weight: bold;
  color: var(--Brown-LightText);
  white-space: nowrap;
`

export const LetterContentBody = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

export const LetterContentDiv = styled.div`
  background-color: #FFFFFF;
  border-radius: 10px;
  border: 1px solid #C5BEB6;

  width: 600px;
  height: 400px;
  padding-left: 20px;
  padding-right: 20px;

  font-family: 'Dongle', sans-serif;
  font-size: 44px;
  font-weight: bold;
  color: var(--Brown-LightText);
  white-space: normal;
  overflow:auto; 
`

export const LetterContentTextArea = styled.textarea`
  background-color: #FFFFFF;
  border-radius: 10px;
  border: 1px solid #C5BEB6;

  width: 600px;
  height: 400px;
  padding-left: 20px;
  padding-right: 20px;

  font-family: 'Dongle', sans-serif;
  font-size: 44px;
  font-weight: bold;
  color: var(--Brown-LightText);
  white-space: normal;
`

export const LetterEditorComponentBody = styled.div`
  display: flex;
  justify-content: center;
`

export const LetterButton = styled.div`
  display: flex;
  flex-direction: column;
`

export const LetterButtonBack = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--Beige-Light);
  box-shadow: 0px 5px 5px #E6E6E6;
  cursor: pointer;
  border: none;
  width: 200px;
  height: 75px;
  margin-right: 20px;
  border-radius: 20px;
  margin-top: 20px;
  margin-left: 30px;

  font-family: 'Dongle', sans-serif;
  font-size: 60px;
  font-weight: bold;
  color: var(--Brown-Text);
  white-space: nowrap;
`

export const LetterButtonGo = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--Brown-LightText);
  box-shadow: 0px 5px 5px #E6E6E6;
  cursor: pointer;
  border: none;
  width: 200px;
  height: 75px;
  margin-right: 20px;
  border-radius: 20px;
  margin-top: 15px;
  margin-left: 30px;

  font-family: 'Dongle', sans-serif;
  font-size: 60px;
  font-weight: bold;
  color: var(--White-Block);
  white-space: nowrap;
`

export const LetterButtonDel = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--Orange-Button);
  opacity: 0.8;
  box-shadow: 0px 5px 5px #E6E6E6;
  cursor: pointer;
  border: none;
  width: 200px;
  height: 75px;
  margin-right: 20px;
  border-radius: 20px;
  margin-top: 10px;
  margin-left: 30px;

  font-family: 'Dongle', sans-serif;
  font-size: 60px;
  font-weight: bold;
  color: var(--White-Block);
  white-space: nowrap;
`

export const LetterItemTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`


// LoginPage
export const LoginPageBody = styled.div`
  display: flex;
  justify-content: space-around;
`

export const JuaBrown = styled.div`
  font-family: 'Jua', sans-serif;
  color: var(--Brown-Text);
  white-space: nowrap;
`

export const JuaBrownLight = styled.div`
  font-family: 'Jua', sans-serif;
  color: var(--Brown-LightText);
  white-space: nowrap;
`

export const GugiPink = styled.span`
  font-family: 'Gugi', cursive;
  color: #FC3F83;
  white-space: nowrap;
`

export const GugiBrown = styled.span`
  font-family: 'Gugi', cursive;
  color: var(--Brown-Text);
  white-space: nowrap;
`