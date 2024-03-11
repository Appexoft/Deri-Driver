import {StyleSheet} from 'react-native';
import {useColors} from '@theme';
// eslint-disable-next-line react-hooks/rules-of-hooks
const colors = useColors();

const styles = StyleSheet.create({
  container: {
    padding: 4,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  itemText: {
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  closeContainer: {
    borderRadius: 100,
    padding: 6,
  },
  closeImg: {
    width: 10,
    height: 10,
  },
  removeMargin: {
    marginTop: 0,
    marginRight: 0,
  },
  editImg: {
    width: 15,
    height: 15,
  },
  addPadding: {
    paddingHorizontal: 9,
    paddingVertical: 9,
  },
  photoContainer: {
    width: 94,
    height: 95,
    borderRadius: 9,
    overflow: 'hidden',
  },
  closeImage: {
    position: 'absolute',
    right: -10,
    top: -10,
    zIndex: 999,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  tagContainer: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 2,
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'IBMPlexSans-Regular',
  },
  rowItem: {
    flexDirection: 'row',
  },
  packageText: {
    marginLeft: 5,
    fontSize: 12,
    fontFamily: 'IBMPlexSans-Regular',
    lineHeight: 15,
  },
  packageItem: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeLeftMargin: {
    marginLeft: 0,
  },
  marginRight: {
    marginRight: 10,
  },
  locationImg: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  circle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 26,
    height: 26,
    borderRadius: 13,
    borderColor: colors.common.white,
    borderWidth: 1.5,
  },
});

export default styles;
