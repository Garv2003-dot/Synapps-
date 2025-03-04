import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  hiText: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#555',
    alignSelf: 'flex-start',
    marginBottom: 25,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,  // Added space below buttons
  },
  featureButton: {
    width: '40%', 
    aspectRatio: 1,
    borderRadius: 20,
    backgroundColor: '#EDE8D0',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,  // Increased spacing for better separation
    padding: 10,
  },
  buttonIcon: {
    width: 60,  // Slightly increased for better visibility
    height: 60,
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  moreButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButtonText: {
    fontSize: 18,  // Slightly larger for better visibility
    fontWeight: 'bold',
    color: '#333',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#EDE8D0',
    paddingVertical: 12,  // Slightly more padding for a better feel
    borderRadius: 18,  // More rounded for a modern look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,  // Improved shadow effect
  },
  navButton: {
    padding: 12,  // Slightly increased for better touch area
  },
});
