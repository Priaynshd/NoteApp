import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {deleteNote} from '../redux/NoteSlice';

const Notes = () => {
  const navigation = useNavigation();
  const notes = useSelector(state => state.note);

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.mainView}>
        <Text style={styles.headertxt}>Notes</Text>
      </View>

      <FlatList
        data={notes.data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: '90%',
                // backgroundColor: 'red',
                marginLeft: 20,
                margin: 10,
                padding: 10,
                borderWidth: 1,
                justifyContent: 'space-between',
                flexDirection: 'row',
                backgroundColor: item.color,
              }}>
              <View style={{width: '85%'}}>
                <Text style={{fontWeight: '600', fontSize: 20}}>
                  {item.title}
                </Text>
                <Text style={{marginTop: 20}}>{item.data}</Text>
              </View>
              <View style={{right: 29}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('AddNotes', {
                      type: 'edit',
                      data: item,
                      index: index,
                    });
                  }}>
                  <Text
                    style={{
                      borderColor: 'blue',
                      borderWidth: 1,
                      fontSize: 17,
                      padding: 10,
                    }}>
                    Edit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(deleteNote(index));
                  }}>
                  <Text
                    style={{
                      marginTop: 10,
                      borderColor: 'red',
                      borderWidth: 1,
                      fontSize: 17,
                      padding: 10,
                      color: 'red',
                    }}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: responsiveHeight(7),
          right: responsiveWidth(6),
        }}
        onPress={() => {
          navigation.navigate('AddNotes', {type: 'add'});
        }}>
        <Image
          source={require('../Images/plus.png')}
          style={{width: 60, height: 60}}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Notes;
const styles = StyleSheet.create({
  mainView: {
    width: Dimensions.get('window').width - 10,
    height: Dimensions.get('window').height / 17,
    backgroundColor: '#4CB9E7',
    padding: 10,
    marginLeft: 1,
  },
  headertxt: {
    fontWeight: '600',
    fontSize: responsiveFontSize(3),
    color: '#fff',
  },
});
