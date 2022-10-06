import React, { useEffect } from 'react'


export function DictionaryDetailImageComponent({ name }) {
  
  const soundPlay = (animal) => {
    let sound = new Audio(`/sounds/sound_${animal}.mp3`)
    sound.play()
  }

  const getImage = (name) => {
    if (name === 'dog') {
      return (
        <div style={{ display: 'flex', cursor: 'pointer' }} onClick={() => {soundPlay(name)}}>
          <img className='dog-body' style={{ position: 'relative', width: '500px' }} src='/images/dog/dog_body.svg' />
          <img className='dog-leftear' style={{ position: 'absolute', width: '500px' }} src='/images/dog/dog_leftear.svg' />
          <img className='dog-rightear' style={{ position: 'absolute', width: '500px' }} src='/images/dog/dog_rightear.svg' />
          <img className='dog-tail' style={{ position: 'absolute', width: '500px' }} src='/images/dog/dog_tail.svg' />
        </div>
      )
    } else if (name === 'rabbit') {
      return (
        <div style={{ display: 'flex', cursor: 'pointer' }} onClick={() => {soundPlay(name)}}>
          <img className='rabbit-body' style={{ position: 'relative', width: '500px' }} src='/images/rabbit/rabbit_body.svg' />
          <img className='rabbit-leftear' style={{ position: 'absolute', width: '500px' }} src='/images/rabbit/rabbit_leftear.svg' />
          <img className='rabbit-rightear' style={{ position: 'absolute', width: '500px' }} src='/images/rabbit/rabbit_rightear.svg' />
          <img className='rabbit-tail' style={{ position: 'absolute', width: '500px' }} src='/images/rabbit/rabbit_tail.svg' />
        </div>
      )
    } else if (name === 'elephant') {
      return (
        <div style={{ display: 'flex', cursor: 'pointer' }} onClick={() => {soundPlay(name)}}>
          <img className='elephant-body' style={{ position: 'relative', width: '500px' }} src='/images/elephant/elephant_body.svg' />
          <img className='elephant-head' style={{ position: 'absolute', width: '500px' }} src='/images/elephant/elephant_head.svg' />
          <img className='elephant-tail' style={{ position: 'absolute', width: '500px' }} src='/images/elephant/elephant_tail.svg' />
        </div>
      )
    } else if (name === 'cat') {
      return (
        <div style={{ display: 'flex', cursor: 'pointer' }} onClick={() => {soundPlay(name)}}>
          <img className='cat-body' style={{ position: 'relative', width: '500px' }} src='/images/cat/cat_body.svg' />
          <img className='cat-leftwhiskers' style={{ position: 'absolute', width: '500px' }} src='/images/cat/cat_leftwhiskers.svg' />
          <img className='cat-rightwhiskers' style={{ position: 'absolute', width: '500px' }} src='/images/cat/cat_rightwhiskers.svg' />
          <img className='cat-tail' style={{ position: 'absolute', width: '500px' }} src='/images/cat/cat_tail.svg' />
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