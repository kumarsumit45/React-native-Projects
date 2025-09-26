import DiceFive from '@/assets/images/Five.png'
import DiceFour from '@/assets/images/Four.png'
import DiceOne from '@/assets/images/One.png'
import DiceSix from '@/assets/images/Six.png'
import DiceThree from '@/assets/images/Three.png'
import DiceTwo from '@/assets/images/Two.png'
import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

import * as Haptics from 'expo-haptics'

const Dice = ({imageUrl})=>{
    return(
        <View style={styles.diceContainer}>
            <Image source={imageUrl} style={styles.diceImage}/>
        </View>
    )
}


const Dice_Roll = () => {
    const[diceImage,setDiceImage]=useState(DiceOne)

    const errorMsg = ()=> {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }

    const vibrate =()=>{
       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }

    const rollDiceOnTap = ()=>{
        let randomNumber = Math.floor(Math.random()*6)+1

        switch(randomNumber){
            case 1:
                setDiceImage(DiceOne)
                break;
            case 2:
                setDiceImage(DiceTwo)
                break;
            case 3:
                setDiceImage(DiceThree)
                break;
            case 4:
                setDiceImage(DiceFour)
                break;
            case 5:
                setDiceImage(DiceFive)
                break;
            case 6:
                setDiceImage(DiceSix)
                break;
            default:
                setDiceImage(DiceOne)
                break;

        }
    }
  return (
    <View style={styles.container}>
      
      <Dice imageUrl={diceImage}/>
      <Pressable 
      onPress={()=>{
        rollDiceOnTap();
        vibrate();
      }}
      >
        <Text style={styles.rollDiceBtnText}>ROLL THE DICE</Text>
      </Pressable>

       
    </View>
   
  )
}

export default Dice_Roll

const styles = StyleSheet.create({
    container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#8e1212ff',
    paddingVertical: 200
  },
  diceContainer: {
    margin: 12,
  },
  diceImage: {
    width: 200,
    height: 200,
  },
  rollDiceBtnText: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#9289d7ff',
    fontSize: 18,
    color: '#3b658fff',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
})