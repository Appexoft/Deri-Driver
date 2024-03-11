import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  separation: {
    marginBottom: 20,
    width: '100%',
  },
  alignStart: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  scrollContainer: {
    minHeight: '100%',
  },
  onlySeparation: {
    marginBottom: 20,
  },
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  photoContainer: {
    marginRight: 10,
    marginBottom: 10,
  },
  inputStyle: {
    marginBottom: 10,
  },
  agencyForm: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  alignedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  customImage: {
    height: 38,
    alignSelf: 'flex-start',
  },
  maxHeightAddress: {
    maxHeight: 120,
  },
  addressInputContainer: {
    height: 120,
  },
  flexContainer: {
    flex: 1,
  },
  rightSeparation: {
    marginRight: 10,
  },
});

export default styles;
