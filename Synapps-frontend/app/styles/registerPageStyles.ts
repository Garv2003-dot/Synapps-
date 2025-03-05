import { StyleSheet } from 'react-native';

const registerPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#F8F8F8',
    color: '#333',
  },
  signUpButton: {
    backgroundColor: '#EDE8D0',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  alreadyHaveAccountContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  alreadyHaveAccount: {
    fontSize: 16,
    color: '#666',
  },
  loginLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
    marginLeft: 5,
  },
  termsContainer: {
    position: 'absolute',
    bottom: 20, // Moves text to the bottom properly
    width: '90%',
  },
  termsText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  termsLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});

export default registerPageStyles;
