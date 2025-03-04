import { StyleSheet } from 'react-native';

const loginPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    paddingHorizontal: 20, 
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#EDE8D0', 
    marginBottom: 5,
    textAlign: 'left', 
  },
  subtitle: {
    fontSize: 25,
    color: '#666',
    marginBottom: 30,
    textAlign: 'left',
    fontWeight:'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  icon: {
    color: '#888',
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: '#EDE8D0',  
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default loginPageStyles;
