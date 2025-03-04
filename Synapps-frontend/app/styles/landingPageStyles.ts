import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20, 
  },
  logo: {
    width: 280,
    height: 180,
    marginBottom: 50,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#EDE8D0',
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 12,
    marginBottom: 25,
  },
  buttonText: {
    color: '#000000',
    fontSize: 22,
    fontWeight: 'bold',
  },
  orText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  registerText: {
    color: '#007BFF', // Blue color for visibility
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },  
  googleButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12, 
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,  
    height: 65,
    marginBottom: 20,
  },
  googleLogo: {
    width: 32,
    height: 32,
  },
  newUserText: {
    fontSize: 16,
    color: '#555',
    marginTop: 15,
  },
});
