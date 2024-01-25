import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import * as yup from 'yup';
import { addCategoryData, deleteCategoryData, getCategoryData } from "../redux/slice/category.slice";
import Feather from 'react-native-vector-icons/Feather';

function category() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleImage = () => {
    ImagePicker.openPicker({
      name: 'image',
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      setFieldValue("image", image)
    });
  }

  const handleDelete = (data) => {
    // console.log(data,"data data data dtat data data data data ");

    dispatch(deleteCategoryData(data))
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategoryData())
  }, [])

  const categorySel = useSelector(state => state.category)
  // console.log(categorySel, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

  const categorySchema = yup.object({
    name: yup.string().min(2, "minimum 2 letter required").required(),
    image: yup.mixed().required()
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      image: ''
    },
    validationSchema: categorySchema,
    onSubmit: (values ,{resetForm}) => {
      // console.log(values, "valuesssssss");

      toggleModal(false);
      dispatch(addCategoryData(values))
      resetForm();
    },
  });

  const { handleBlur, handleChange, handleSubmit, touched, errors, setFieldValue, values } = formik
  console.log(values);

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={style.addCatBox} onPress={toggleModal}>
        <Text style={style.addCatTxt}>Add Category</Text>
      </TouchableOpacity>
      {/* <Button title="Show modal"  /> */}

      <Modal isVisible={isModalVisible}>
        <View style={{ backgroundColor: 'white', width: 350, alignSelf: 'center', height: 320, borderRadius: 10, }}>

          <TextInput
            style={style.inputBox}
            name="name"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            placeholder="Category Name"
          />
          {
            touched.name && errors.name ? <Text style={style.errorTxt}>* {errors.name} *</Text> : null
          }

          <TouchableOpacity style={style.imageBox} onPress={handleImage}>
            <Text style={style.imageTxt}>UPLOAD IMAGE</Text>
          </TouchableOpacity>
          {
            touched.image && errors.image ? <Text style={style.imgErrorTxt}>* {errors.image} *</Text> : null
          }

          <TouchableOpacity style={style.submitBox} onPress={handleSubmit}>
            <Text style={style.submitTxt}>Submit</Text>
          </TouchableOpacity>


        </View>
      </Modal>

      {
        categorySel.isLoading ?
          <Text>Loading.....</Text> :

          categorySel.error ?
            <Text>error</Text> :
            categorySel.category.map((v, i) => {
              return (
                <View key={i}>
                  <Image
                    style={{ height: 100, width: 100 }}
                    source={{ uri: v.image }}
                  />
                  <Text>{v.name}</Text>
                  <TouchableOpacity onPress={()=>handleDelete(v)} style={style.deleteBtn}>
                    {/* <Feather name="delete" color={'red'} size={25} /> */}
                    <Text style={style.deleteTxt}>DELETE</Text>
                  </TouchableOpacity>
                </View>
              )

            })
      }
    </View>
  );
}



export default category;

const style = StyleSheet.create({
  addCatBox: {
    width: 180,
    // borderWidth:1,
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
    marginTop: 40,
    alignSelf: 'center'
  },
  addCatTxt: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: 'bold'
  },
  inputBox: {
    borderWidth: 0.5,
    marginHorizontal: 15,
    borderRadius: 5,
    marginTop: 20
  },
  errorTxt: {
    marginHorizontal: 15,
    color: "red",
  },
  imageBox: {
    width: 180,
    // borderWidth:1,
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 10,
    marginTop: 40,
    alignSelf: 'center'
  },
  imageTxt: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: 'bold'
  },
  imgErrorTxt: {
    marginHorizontal: 15,
    color: "red",
    marginLeft: 90
  },
  submitBox: {
    width: 100,
    backgroundColor: 'red',
    padding: 10,
    marginTop: 50,
    alignSelf: 'center',
    borderRadius: 5,
  },
  submitTxt: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: 'bold'
  },
  deleteBtn:{
    backgroundColor:'red',
    width:80,
    marginBottom:10,
    borderRadius:5
  },
  deleteTxt:{
    color:'white',
    fontWeight:'bold',
    textAlign:'center',
    padding:5,
    
  }
})