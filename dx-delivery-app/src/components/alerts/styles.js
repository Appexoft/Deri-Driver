import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  container_dialog: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image_dialog: {
    width: 130,
    height: 130,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 20,
  },
  title_dialog: {
    fontSize: 26,
    fontWeight: '400',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle_dialog: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 15,
    marginBottom: 26,
    textAlign: 'center',
  },
  container_overlay: {
    borderRadius: 10,
    borderWidth: 1,
  },
  image: {
    width: 120,
    height: 120,
  },
});

export default styles;
