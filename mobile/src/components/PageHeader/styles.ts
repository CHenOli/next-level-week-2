import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: '#8257e5',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 35,
    height: 12,
  },
  title: {
    fontFamily: 'Archivo_700Bold',
    color: '#fff',
    fontSize: 24,
    lineHeight: 32,
    maxWidth: 160,
    marginVertical: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
