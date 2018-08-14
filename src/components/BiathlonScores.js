import React from 'react'
import { View } from 'react-native'

function BiathlonScores({ scores = {} }) {
  const questions = [0, 1, 2, 3, 4]
  return (
    <View style={styles.container}>
      {questions.map(questionIndex => (
        <View
          key={questionIndex}
          style={scores[questionIndex] === true ? styles.targetFill : styles.target}/>
      ))}
    </View>
  )
}

const target = {
  borderRadius: 25,
  backgroundColor: '#333',
  height: 25,
  width: 25,
}
const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
  },
  target,
  targetFill: {
    ...target,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
  },
}

export default BiathlonScores
