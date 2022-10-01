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
          <img className='dog-body' style={{ position: 'relative', width: '500px' }} src='/images/dog/dog_body.svg' onClick={soundPlay} />
          <img className='dog-leftear' style={{ position: 'absolute', width: '500px' }} src='/images/dog/dog_leftear.svg' onClick={soundPlay} />
          <img className='dog-rightear' style={{ position: 'absolute', width: '500px' }} src='/images/dog/dog_rightear.svg' onClick={soundPlay} />
          <img className='dog-tail' style={{ position: 'absolute', width: '500px' }} src='/images/dog/dog_tail.svg' onClick={soundPlay} />
        </div>
      )
    } else if (name === 'rabbit') {
      return (
        <div style={{ display: 'flex' }}>
          <img className='rabbit-body' style={{ position: 'relative', width: '500px' }} src='/images/rabbit/rabbit_body.svg' onClick={soundPlay} />
          <img className='rabbit-leftear' style={{ position: 'absolute', width: '500px' }} src='/images/rabbit/rabbit_leftear.svg' onClick={soundPlay} />
          <img className='rabbit-rightear' style={{ position: 'absolute', width: '500px' }} src='/images/rabbit/rabbit_rightear.svg' onClick={soundPlay} />
          <img className='rabbit-tail' style={{ position: 'absolute', width: '500px' }} src='/images/rabbit/rabbit_tail.svg' onClick={soundPlay} />
        </div>
      )
    } else if (name === 'elephant') {
      return (
        <div style={{ display: 'flex' }}>
          <img className='elephant-body' style={{ position: 'relative', width: '500px' }} src='/images/elephant/elephant_body.svg' onClick={soundPlay} />
          <img className='elephant-head' style={{ position: 'absolute', width: '500px' }} src='/images/elephant/elephant_head.svg' onClick={soundPlay} />
          <img className='elephant-tail' style={{ position: 'absolute', width: '500px' }} src='/images/elephant/elephant_tail.svg' onClick={soundPlay} />
        </div>
      )
    } else if (name === 'cat') {
      return (
        <div style={{ display: 'flex' }}>
          <img className='cat-body' style={{ position: 'relative', width: '500px' }} src='/images/cat/cat_body.svg' onClick={soundPlay} />
          <img className='cat-leftwhiskers' style={{ position: 'absolute', width: '500px' }} src='/images/cat/cat_leftwhiskers.svg' onClick={soundPlay} />
          <img className='cat-rightwhiskers' style={{ position: 'absolute', width: '500px' }} src='/images/cat/cat_rightwhiskers.svg' onClick={soundPlay} />
          <img className='cat-tail' style={{ position: 'absolute', width: '500px' }} src='/images/cat/cat_tail.svg' onClick={soundPlay} />
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