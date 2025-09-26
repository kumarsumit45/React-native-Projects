import Icons from "@/components/Icons";
import * as Haptics from 'expo-haptics';
import React, { useState } from "react";
import { Alert, FlatList, Platform, Pressable, StatusBar, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  const [isCross, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>("");
  const [gameState, setGameState] = useState(new Array(9).fill("empty", 0, 9));

   const showToast = (message: string) => {
    if (Platform.OS === 'android') {
      return ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      return Alert.alert('Game Info', message);
    }
  };

  const reloadGame = ()=>{
    setIsCross(false)
    setGameWinner('')
    setGameState(new Array(9).fill('empty',0,9))
  }

  const checkIsWinner = ()=> {
     if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setGameWinner(`${gameState[3]} won the game! 🥳`);
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setGameWinner(`${gameState[6]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setGameWinner(`${gameState[1]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (!gameState.includes('empty', 0)) {
      setGameWinner('Draw game... ⌛️');
    }
  } 

  const onChnageItem = (itemNumber: number)=>{
    if(gameWinner){
        return showToast(gameWinner);
    }

    if (gameState[itemNumber]==='empty'){
        gameState[itemNumber] = isCross ?'cross':'circle'
        setIsCross(!isCross)
    }else{
        return showToast("Position already filled");
    }
    checkIsWinner()
}
  

  return (
    <SafeAreaView style={{backgroundColor:"#5c6a76ff",flex:1}}>
      <StatusBar />
      {gameWinner?(
        <View style={[styles.playerInfo,styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ):
      (
        <View style={[styles.playerInfo,isCross ? styles.playerX : styles.playerO]}>
          <Text style={styles.gameTurnTxt}>Player {isCross ? 'X' : 'O'}'s Turn</Text>
        </View>
      )}

      <FlatList 
      numColumns={3}
      data={gameState}
      style={styles.grid}
      renderItem={({item,index})=>(
        <Pressable
        key={index}
        style={styles.card}
        onPress={()=>{ onChnageItem(index);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)

        }}
        >
          <Icons name={item} />
        </Pressable>
      )}
      />
      <View style={{flex:8}}>
      <Pressable
      style={styles.gameBtn}
      onPress={()=>{reloadGame();
         Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
      }}
      >
        <Text style={styles.gameBtnText}>
          {
            gameWinner ? 'Start new Game' : 'Reload Game'
          }
        </Text>
      </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  playerInfo: {
    height: 56,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 12,
    marginHorizontal: 14,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  playerX: {
    backgroundColor: '#38CC77',
  },
  playerO: {
    backgroundColor: '#F7CD2E',
  },
  grid: {
    margin: 12,
  },
  card: {
    height: 100,
    width: '33.33%',

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 0.5,
    borderColor: '#333',
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: '#38CC77',

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  gameBtn: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: '#8D3DAF',
    marginVertical:10,
  },
  gameBtnText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});
