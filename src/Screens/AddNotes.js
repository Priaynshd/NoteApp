import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addNote, updateNote} from '../redux/NoteSlice';
import ColorPicker from 'react-native-wheel-color-picker';

const AddNotes = () => {
  const route = useRoute();
  const [title, setTitle] = useState(
    route.params.type == 'edit' ? route.params.data.title : '',
  );
  const [data, setData] = useState(
    route.params.type == 'edit' ? route.params.data.data : '',
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [color, setColor] = useState('');

  const onColorChange = color => {
    setColor(color);
  };

  const saveNote = () => {
    if (route.params.type == 'edit') {
      dispatch(
        updateNote({
          title: title,
          data: data,
          index: route.params.index,
          color: color,
        }),
      );
    } else {
      dispatch(addNote({title, data, color}));
    }
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: Dimensions.get('window').width - 10,
          height: Dimensions.get('window').height / 17,
          backgroundColor: '#4CB9E7',
          padding: 10,
          marginLeft: 1,
          marginBottom: 30,
        }}>
        <Text
          style={{
            fontWeight: '600',
            fontSize: responsiveFontSize(3),
            color: '#fff',
          }}>
          Add Notes
        </Text>
      </View>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        onChangeText={text => setTitle(text)}
        value={title}
      />

      <Text style={styles.label}>Note:</Text>
      <TextInput
        style={styles.input2}
        placeholder="Enter your note"
        onChangeText={text => setData(text)}
        value={data}
        multiline
      />
      <ColorPicker
        style={{padding: 20}}
        color={color}
        onColorChange={color => onColorChange(color)}
        thumbSize={20}
        sliderSize={20}
        noSnap={true}
        row={true}
      />

      {/* <Button title="Save Note" onPress={()=>{
       saveNote()
      }} /> */}
      <TouchableOpacity
        style={{
          width: '80%',
          height: 40,
          backgroundColor: '#000',
          marginLeft: 50,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          saveNote();
        }}>
        <Text style={{color: '#fff'}}>
          {route.params.type == 'edit' ? 'Update Note' : 'Save Note'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddNotes;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    marginLeft: 20,
  },
  input: {
    height: 50,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    marginLeft: 20,
  },
  input2: {
    height: 100,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    marginLeft: 20,
  },
  sectionContainer: {
    marginTop: 70,
    paddingHorizontal: 24,
  },
});
