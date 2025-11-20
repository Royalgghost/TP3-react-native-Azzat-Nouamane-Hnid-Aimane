import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [operator, setOperator] = useState('');
    const [result, setResult] = useState('');

    const handleLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;
        console.log('Layout:', width, height);
    };

    const handleNumberInput = (text, setter) => {
        // Vérifie si le texte est un nombre ou vide
        if (text === '' || /^\d*\.?\d*$/.test(text)) {
            setter(text);
        }
    };

    const calculate = () => {
        if (!num1 || !num2 || !operator) return;

        const n1 = parseFloat(num1);
        const n2 = parseFloat(num2);
        let res;

        switch (operator) {
            case '+':
                res = n1 + n2;
                break;
            case '-':
                res = n1 - n2;
                break;
            case '*':
                res = n1 * n2;
                break;
            default:
                return;
        }

        setResult(res.toString());
    };

    const clearAll = () => {
        setNum1('');
        setNum2('');
        setOperator('');
        setResult('');
    };

    const OperationButton = ({ op }) => ( <
        TouchableOpacity style = {
            [styles.operatorButton, operator === op && styles.selectedOperator]
        }
        onPress = {
            () => setOperator(op)
        } >
        <
        Text style = { styles.operatorText } > { op } < /Text> < /
        TouchableOpacity >
    );

    return ( <
        View style = { styles.container }
        onLayout = { handleLayout } >
        <
        Text style = { styles.title } > Calculatrice < /Text>

        <
        View style = { styles.inputContainer } >
        <
        TextInput style = { styles.input }
        keyboardType = "numeric"
        value = { num1 }
        onChangeText = {
            (text) => handleNumberInput(text, setNum1)
        }
        placeholder = "Premier nombre" /
        >

        <
        View style = { styles.operators } >
        <
        OperationButton op = "+" / >
        <
        OperationButton op = "-" / >
        <
        OperationButton op = "*" / >
        <
        /View>

        <
        TextInput style = { styles.input }
        keyboardType = "numeric"
        value = { num2 }
        onChangeText = {
            (text) => handleNumberInput(text, setNum2)
        }
        placeholder = "Deuxième nombre" /
        >
        <
        /View>

        <
        View style = { styles.buttonContainer } >
        <
        TouchableOpacity style = {
            [styles.button, styles.calculateButton]
        }
        onPress = { calculate }
        disabled = {!num1 || !num2 || !operator } >
        <
        Text style = { styles.buttonText } > Calculer < /Text> < /
        TouchableOpacity >

        <
        TouchableOpacity style = {
            [styles.button, styles.clearButton]
        }
        onPress = { clearAll } >
        <
        Text style = { styles.buttonText } > Clear < /Text> < /
        TouchableOpacity > <
        /View>

        {
            result !== '' && ( <
                View style = { styles.resultContainer } >
                <
                Text style = { styles.resultText } > Résultat: { result } < /Text> < /
                View >
            )
        }

        <
        StatusBar style = "auto" / >
        <
        /View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    operators: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15,
    },
    operatorButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 25,
    },
    selectedOperator: {
        backgroundColor: '#4CAF50',
    },
    operatorText: {
        fontSize: 24,
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    calculateButton: {
        backgroundColor: '#2196F3',
    },
    clearButton: {
        backgroundColor: '#f44336',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#e8f5e9',
        borderRadius: 5,
    },
    resultText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#2e7d32',
    },
});