import React, { useEffect } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar, Button } from 'react-native-paper';
import {useFonts,Poppins_700Bold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListItemMyTransaction from '../components/listItemMyTransaction';
import { setMyTransactionsAsync } from '../store/actions/transactions'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = ({route,navigation}) =>{
    const dispatch = useDispatch()
    const { myTransactions, loading } = useSelector(state => state.transactionsReducer)
    const { desa } = useSelector(state => state.desaReducer)

    const clearAsyncStorage = async() => {
        await AsyncStorage.clear();
    }
    
    useEffect (()  => {
        dispatch(setMyTransactionsAsync())
    }, [])

    let [fontsLoaded] = useFonts({Poppins_700Bold,Poppins_600SemiBold,Poppins_500Medium})
    if (!fontsLoaded) {
        return <Text>loading</Text>;
    }
    console.log(desa)
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/logoBlue.png')} style={styles.logo}></Image>
                <Icon name="sign-out" style={{fontSize:28, color: '#3c5cac', marginRight: 10}} onPress={()=>{clearAsyncStorage(); navigation.navigate('Login');}}></Icon>
            </View>
            <LinearGradient colors={['#8ec5fc', '#3c5cac']} style={styles.card}>
                <Image source={require('../assets/test.png')} style={styles.ilustrasi}></Image>
                <View style={{flexDirection:"column",justifyContent:"space-between", height: "100%"}}>
                    <Text style={styles.desaName}>{desa.name}</Text>
                    <View>
                        <Text style={styles.judulSaldo}>Balance</Text>
                        <Text style={styles.saldo}> Rp {desa.balance?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>

                    </View>
                </View>
            </LinearGradient>
            <View style={styles.buttonContainer}>
                <Button onPress={()=>{navigation.navigate("Pay")}} mode="contained" style={{flexGrow: 1, backgroundColor: '#3C5CAC', marginRight:6, paddingVertical:5, borderRadius:10}}>Pay</Button>
                <Button onPress={()=>{navigation.navigate("Chat")}} mode="contained" style={{ backgroundColor: '#3C5CAC', alignContent:"center", justifyContent:"center", borderRadius:10}}>
                    <Icon name="commenting" style={{fontSize:20,  }}></Icon>
                </Button>
            </View>
            <View style={{marginTop:15, flex:1, marginBottom:8}}>
                <Text style={{...styles.desaName, color:"#3C5CAC"}}>My Transactions</Text>
                <FlatList
                    data={myTransactions}
                    renderItem={({item,index})=>(
                        <ListItemMyTransaction transaction={item} key={index}/>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    refreshing={loading}
                    onRefresh={()=>{dispatch(setMyTransactionsAsync())}}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      paddingHorizontal: 10,
      backgroundColor: '#ecf0f1',
    },
    logo:{
        width: 140,
        height: 60
    },
    header:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    card:{
        marginTop: 10,
        backgroundColor: "red",
        width : "100%",
        height : 200,
        borderRadius: 20,
        padding: 10
    },
    desaName:{
        fontFamily:'Poppins_700Bold',
        fontSize: 25,
        color: "white",
    },
    myTransactionsJudul:{
        fontFamily:'Poppins_700Bold',
        fontSize: 25,
        color: "white",
        marginTop: 10
    },
    judulSaldo:{
        fontFamily:'Poppins_600SemiBold',
        fontSize: 20,
        color: "white",
        paddingLeft: 6,
        marginBottom: -8,
    },
    saldo:{
        fontFamily:'Poppins_600SemiBold',
        fontSize: 30,
        color: "white",
    },
    ilustrasi :{
        position: "absolute",
        bottom: 25,
        right :20,
        width: 120,
        height: 100,
        opacity: 0.5
    },
    buttonContainer : {
        flexDirection: "row",
        marginTop: 12
    }
    
});

export default Home