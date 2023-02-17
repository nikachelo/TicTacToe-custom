import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Pressable, Alert } from 'react-native';
import React, {useState} from 'react';
import bg from "./assets/bg.jpeg";
export default function App() {

  const emptyMap = [
    ["", "", ""], // 1 xazi
    ["", "", ""], // 2 xazi
    ["", "", ""], // 3 xazi
  ]

  const [map, setMap] = useState(emptyMap);

  const [currentTurn, setCurrentTurn] = useState("x");

    const onPress = (cellId, rowId) => {
      if(map[rowId][cellId] !== ''){
        console.warn("უჯრა დაკავებულია")
        return; 
        }
        setMap((existingMap) => {
          const updatedMap = [...existingMap];
          updatedMap[rowId][cellId] = currentTurn;
          return updatedMap;
        });

        setCurrentTurn(currentTurn === "x" ? "o" : "x");
        let winner = getWinner();
        if(winner){
          gameWon(winner);
        }else{
          checkTieState();
        }

    };


    const getWinner = () => {

      //check rows

      for(let i = 0; i < 3; i++){
        const isRowXWinning = map[i].every(cell => cell === 'x');
        const isRowOWinning = map[i].every(cell => cell === 'o');
        if(isRowXWinning){
          return 'X';
        }
        if(isRowOWinning){
          return 'O';
        }
      }

      //check columns
      for(let col=0; col<3; col++){

        let isColumnXWinner = true;
        let isColumnOWinner = true;

        for(let row = 0; row<3; row++){
          if(map[row][col] !== 'x') {
            isColumnXWinner = false;
          }
          if(map[row][col] !== 'o'){
            isColumnOWinner = false;
          }
        }

        if(isColumnOWinner){
          return 'O';
        }
        if(isColumnXWinner){
          return 'X';
        }

      }

      //check diagonals
      let isDiagonal1OWinning = true;
      let isDiagonal1XWinning = true;

      let isDiagonal2OWinning = true;
      let isDiagonal2XWinning = true;

      for(let i = 0; i<3; i++){
        if(map[i][i] !== 'o'){
          isDiagonal1OWinning = false;
        } 
        if(map[i][i] !== 'x'){
          isDiagonal1XWinning = false;
        }
        if(map[i][2-i] !== 'x'){
          isDiagonal2XWinning = false;
        }
        if(map[i][2-i] !== 'o'){
          isDiagonal2OWinning = false;
        }
      }

      if(isDiagonal1OWinning){
        return 'O';
      }
      if(isDiagonal2OWinning){
        return 'O';
      }
      if(isDiagonal1XWinning){
        return 'X';
      }
      if(isDiagonal2XWinning){
        return 'X';
      }


    };

    const gameWon = (player) => {
      Alert.alert("გილოცავთ", `თამაში მოიგო ${player} მოთამაშემ`, [
        {
          text: "თავიდან დაწყება",
          onPress: resetGame,
        }
        ]);
    };

    const resetGame = () => {
      setMap([
        ["", "", ""], // 1 xazi
        ["", "", ""], // 2 xazi
        ["", "", ""] // 3 xazi
      ]);
    
      setCurrentTurn("x");
      Alert.alert("თამაშს იწყებს X");
    }
    
    const checkTieState = () => {
      if (!map.some(row => row.some(cell=> cell === ''))){
        Alert.alert("ფრე", `თამაში ფრედ დასრულდა`, [
          {
            text: "თავიდან დაწყება",
            onPress: resetGame,
          }
          ]);
      }
    }


  return (
    <View style={styles.container}>
      <ImageBackground source = {bg} style = {styles.bg} resizeMode = "contain">
        <Text style={styles.turnIndicator}>შემდეგი სვლა: X</Text>
        <View style = {styles.map}>
          {map.map( (row, rowId) => (
            <View style = {styles.row}>
              {row.map( (cell, cellId) => 
              <Pressable style = {styles.cell} onPress = {() => onPress(cellId, rowId)}>
                {cell === 'o' && <View style = {styles.circle} />}
                {cell === 'x' && (
                  <View style = {styles.cross}>
                  <View style={styles.crossLine} />
                  <View style={[styles.crossLine, styles.crossLineReversed]} />
                </View>
                )}
              </Pressable>)}
            </View>
            ))}
          </View> 
        
        
      </ImageBackground>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#242D34'
  },
  bg : {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 17,
  },
  turnIndicator: {
    color: "white",
    position: 'absolute',
    top: 60,
    fontSize: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    width: 100,
    height: 100,
  },

  circle : {
    flex: 1,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: "white",
    margin: 12,
  },
  cross : {
    flex: 1,
  },
  crossLine: {
    position: 'absolute',
    left: '45%',
    width: 10,
    height: 85,
    borderRadius: 50,
    backgroundColor: 'white',
    transform: [
      {
      rotate : '45deg'
      },
    ],
  },
  crossLineReversed: {
    transform: [
      {
      rotate: '-45deg'
      },
    ],
  },

  map: {
    width: '71%',
    aspectRatio: 1,
  },

});
