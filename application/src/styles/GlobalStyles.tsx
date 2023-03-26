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
  big: {
    fontSize: '35rem',
  },
  mainButton: {
    flex: 0,
    paddingHorizontal: '30rem',
    paddingVertical: '15rem',
    marginVertical: '20rem',
    alignSelf: 'stretch',
    borderRadius: '15rem',
    backgroundColor: '#0B71E7',
    fontWeight: 'bold',
    // shadowColor: 'black',
    // shadowOpacity: 0.1,
    // shadowOffset: {height: 3},
  },
  button: {
    flex: 0,
    paddingHorizontal: '30rem',
    paddingVertical: '15rem',
    marginVertical: '20rem',
    alignSelf: 'stretch',
    borderRadius: '15rem',
    backgroundColor: '#EFEFEF',
    // shadowColor: 'black',
    // shadowOpacity: 0.1,
    // shadowOffset: {height: 3},
  },
  white: {
    color: 'white',
  },
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {height: 2},
  },
  horizontal: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  transparent: {
    opacity: 0.5,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: '100%',
    textAlign: 'center',
    borderWidth: 2.5,
    borderColor: '#0B71E7',
    borderRadius: 10,
    padding: 10,
  },
  invalidInput: {
    width: '100%',
    textAlign: 'center',
    borderWidth: 2.5,
    borderColor: '#E1000F',
    borderRadius: 10,
    padding: 10,
  },
  disabled: {
    opacity: 0.5
  }
});
