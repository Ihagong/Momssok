import { render } from '@testing-library/react'
import React, { useEffect } from 'react'


export function DictionaryDetailImageComponent({ name }) {
  const sound = new Audio('/sounds/sound_dog.mp3') 
  
  const soundPlay = () => {
    // sound.play()
  }

  const getImage = (name) => {
    if (name === 'dog') {
      return (
        <div style={{ display: 'flex' }}>
          <img className='dogBody' style={{ position: 'relative', width: '500px' }} src='/images/dog/dog_body.svg' onClick={soundPlay} />
          <img className='dogLeftEar' style={{ position: 'absolute', width: '500px' }} src='/images/dog/dog_leftear.svg' onClick={soundPlay} />
          <img className='dogRightEar' style={{ position: 'absolute', width: '500px' }} src='/images/dog/dog_rightear.svg' onClick={soundPlay} />
          <img className='dogTail' style={{ position: 'absolute', width: '500px' }} src='/images/dog/dog_tail.svg' onClick={soundPlay} />
        </div>
      )
    } else if (name === 'rabbit') {
      return (
        <div style={{ display: 'flex' }}>
          <img className='rabbitBody' style={{ position: 'relative', width: '500px' }} src='/images/rabbit/rabbit_body.svg' onClick={soundPlay} />
          <img className='rabbitLeftEar' style={{ position: 'absolute', width: '500px' }} src='/images/rabbit/rabbit_leftear.svg' onClick={soundPlay} />
          <img className='rabbitRightEar' style={{ position: 'absolute', width: '500px' }} src='/images/rabbit/rabbit_rightear.svg' onClick={soundPlay} />
          <img className='rabbitTail' style={{ position: 'absolute', width: '500px' }} src='/images/rabbit/rabbit_tail.svg' onClick={soundPlay} />
        </div>
      )
    } else if (name === 'elephant') {
      return (
        <div style={{ display: 'flex' }}>
          <img className='elephantBody' style={{ position: 'relative', width: '500px' }} src='/images/elephant/elephant_body.svg' onClick={soundPlay} />
          <img className='elephantHead' style={{ position: 'absolute', width: '500px' }} src='/images/elephant/elephant_head.svg' onClick={soundPlay} />
          <img className='elephantTail' style={{ position: 'absolute', width: '500px' }} src='/images/elephant/elephant_tail.svg' onClick={soundPlay} />
        </div>
      )
    } else if (name === 'cat') {
      return (
        <div style={{ display: 'flex' }}>
          <img className='catBody' style={{ position: 'relative', width: '500px' }} src='/images/cat/cat_body.svg' onClick={soundPlay} />
          <img className='catLeftWhiskers' style={{ position: 'absolute', width: '500px' }} src='/images/cat/cat_leftwhiskers.svg' onClick={soundPlay} />
          <img className='catRightWhiskers' style={{ position: 'absolute', width: '500px' }} src='/images/cat/cat_rightwhiskers.svg' onClick={soundPlay} />
          <img className='catTail' style={{ position: 'absolute', width: '500px' }} src='/images/cat/cat_tail.svg' onClick={soundPlay} />
        </div>
      )
    }
  }

  return (
    <div>
      { getImage(name) }
    </div>
  )
}