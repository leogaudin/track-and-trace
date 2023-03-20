import React from 'react';
import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
EStyleSheet.build({$rem: width / 380});

export default EStyleSheet.create({
  view: {
    padding: '10rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '25rem',
    marginTop: '20rem',
  },
  big: {
    fontSize: '35rem',
  },
  button: {
    padding: '20rem',
    margin: '20rem',
    borderRadius: '50rem',
    backgroundColor: '#0B71E7',
    fontWeight: 'bold',
    textAlign: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {height: 3},
  },
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {height: 3},
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
    width: width,
    height: height,
  },
  modal: {
    backgroundColor: 'white',
    margin: '20rem',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
