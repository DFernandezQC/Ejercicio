import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function BienvenidoScreen(){
    const { email } = useLocalSearchParams();

    return(
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.title}>{email}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center'
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center'
    }
})