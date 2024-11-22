import React, { useReducer } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { useRouter } from 'expo-router';

// Definimos el estado inicial
const initialState = {
  email: '',
  emailError: '',
  password: '',
  confirmPassword: '',
  passwordError: '',
  showPassword: false,
  showConfirmPassword: false,
};

// Reducer para manejar cambios de estado
const reducer = (state:any, action: any) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_EMAIL_ERROR':
      return { ...state, emailError: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_CONFIRM_PASSWORD':
      return { ...state, confirmPassword: action.payload };
    case 'SET_PASSWORD_ERROR':
      return { ...state, passwordError: action.payload };
    case 'TOGGLE_SHOW_PASSWORD':
      return { ...state, showPassword: !state.showPassword };
    case 'TOGGLE_SHOW_CONFIRM_PASSWORD':
      return { ...state, showConfirmPassword: !state.showConfirmPassword };
    default:
      return state;
  }
};

export default function RegisterScreen() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  // Validación de correo
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.email)) {
      dispatch({ type: 'SET_EMAIL_ERROR', payload: 'Por favor ingresa un correo válido.' });
      return false;
    } else {
      dispatch({ type: 'SET_EMAIL_ERROR', payload: '' });
      return true;
    }
  };

  // Validación de contraseñas
  const validatePasswords = () => {
    if (!state.password || !state.confirmPassword) {
      dispatch({
        type: 'SET_PASSWORD_ERROR',
        payload: 'Los campos de contraseña no pueden estar vacíos.',
      });
      return false;
    }

    if (state.password !== state.confirmPassword) {
      dispatch({
        type: 'SET_PASSWORD_ERROR',
        payload: 'Las contraseñas no coinciden.',
      });
      return false;
    }

    dispatch({ type: 'SET_PASSWORD_ERROR', payload: '' });
    return true;
  };

  // Manejar el clic en "Regístrate"
  const handleRegister = () => {
    const isEmailValid = validateEmail();
    const arePasswordsValid = validatePasswords();

    if (isEmailValid && arePasswordsValid) {
      router.push({
        pathname: '/bienvenido',
        params: { email: state.email },
      });
      
    } else {
      Alert.alert('Error', 'Por favor corrige los errores antes de continuar.');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Regístrate</Text>
        <Text style={styles.subtitle}>
          Crea Tu Cuenta Y Comienza A Aprender
        </Text>

        {/* Input de correo electrónico */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu Correo Electrónico"
            placeholderTextColor="#A0A0A0"
            value={state.email}
            onChangeText={(text) => dispatch({ type: 'SET_EMAIL', payload: text })}
            onBlur={validateEmail}
          />
        </View>
        {state.emailError ? <Text style={styles.errorText}>{state.emailError}</Text> : null}

        {/* Input de contraseña */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu Contraseña"
            placeholderTextColor="#A0A0A0"
            secureTextEntry={!state.showPassword}
            value={state.password}
            onChangeText={(text) => dispatch({ type: 'SET_PASSWORD', payload: text })}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => dispatch({ type: 'TOGGLE_SHOW_PASSWORD' })}
          >
            <Text style={styles.eyeText}>{state.showPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>

        {/* Input de confirmación de contraseña */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirma tu Contraseña"
            placeholderTextColor="#A0A0A0"
            secureTextEntry={!state.showConfirmPassword}
            value={state.confirmPassword}
            onChangeText={(text) => dispatch({ type: 'SET_CONFIRM_PASSWORD', payload: text })}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => dispatch({ type: 'TOGGLE_SHOW_CONFIRM_PASSWORD' })}
          >
            <Text style={styles.eyeText}>{state.showConfirmPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>
        {state.passwordError ? <Text style={styles.errorText}>{state.passwordError}</Text> : null}

        <Text style={styles.termsText}>
          Al Hacer Clic En “Comenzar”, Acepto Los{' '}
          <Text style={styles.linkText}>Términos De Uso</Text> Y Reconozco Que Mi
          Información Personal Se Utilizará De Acuerdo Con La{' '}
          <Text style={styles.linkText}>Política De Privacidad</Text> De Quasar.
        </Text>

        <Text style={styles.loginText}>
          Ya Tienes Una Cuenta?{' '}
          <Text 
            style={styles.linkText}
            onPress={() => router.push('/iniciarSesion')}
          >Iniciar Sesión</Text>
        </Text>
      </View>

      {/* Botón de registro */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingTop: 80
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#FFF',
    height: 50,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  eyeText: {
    color: '#FFF',
    fontSize: 16,
  },
  errorText: {
    color: '#FF4D4D',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 15,
  },
  termsText: {
    fontSize: 12,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  linkText: {
    color: '#007BFF',
  },
  loginText: {
    fontSize: 14,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#2E469C',
    paddingVertical: 15,
    borderRadius: 8,
  },
  registerButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
