import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function InicioSesionScreen(){
    return(
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Iniciar Sesión</Text>
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