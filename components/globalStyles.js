// styles/globalStyles.js

import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background
    padding: 16,
  },
  header: {
    backgroundColor: '#03a65a', // Green background
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#FFFFFF', // White text
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#03a65a', // Green button
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#FFFFFF', // White button text
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderColor: '#CED4DA', // Light Gray border
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    fontSize: 14,
  },
  card: {
    backgroundColor: '#F8F9FA', // Light Gray background
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    color: '#333333', // Dark Gray text
    fontSize: 14,
  },
  errorText: {
    color: '#DC3545', // Red error text
    fontSize: 14,
  },
  accentText: {
    color: '#03a65a', // Green accent text
  },
  
});

export default globalStyles;
