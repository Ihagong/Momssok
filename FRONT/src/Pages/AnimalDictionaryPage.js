import React from 'react'
import { DogTag } from '../Style/AnimalTags'
import '../Style/animalAnimation.css'


const AnimalDictionaryPage = () => {
  const sound = new Audio('/sounds/sound_dog.mp3') 
  
  const soundPlay = () => {
    sound.play()
  }

  return (
    <div>
      <DogTag className='dog' style={{ position: 'absolute', width: '1100px' }} src='/images/dog.png' onClick={soundPlay} />
      <DogTag className='dogTail' style={{ width: '1100px' }} src='/images/dog_tail.png' onClick={soundPlay} />
    </div>
  )
}

export default AnimalDictionaryPage