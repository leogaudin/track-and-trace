import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
EStyleSheet.build({$rem: WIDTH / 380});

export default EStyleSheet.create({
  view: {
    padding: '10rem',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '25rem',
    marginVertical: '20rem',
  },
  horizontal: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: WIDTH,
    height: HEIGHT,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  modal: {
    flex: 0,
    backgroundColor: 'white',
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: WIDTH * 0.9,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderRadius: 10,
  }
});
