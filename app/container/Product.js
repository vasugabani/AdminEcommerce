import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryData } from '../redux/slice/category.slice';
import { getSubCatData } from '../redux/slice/subCategory.slice';
import * as yup from 'yup';
import { useFormik } from 'formik';
import ImagePicker from 'react-native-image-crop-picker';
import { TextInput } from 'react-native-gesture-handler';
import { addProductData, deleteProductData, getProductData } from '../redux/slice/product.slice';
export default function Product() {
  const dispatch = useDispatch()

  const categorySel = useSelector(state => state.category)
  // console.log(categorySel, "ccccccccccccccccccccccccccc");

  useEffect(() => {
    dispatch(getCategoryData())
    dispatch(getSubCatData())
    dispatch(getProductData())
  }, [])

  const subCatSel = useSelector(state => state.subCategory)
  // console.log(subCatSel, "sssssssssssssssssssssss");

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
    dispatch(deleteProductData(data))
  }

  const productSel = useSelector(state=>state.product)
  console.log(productSel,"selectorrrrrrrrrrrrrr");

  const productSchema = yup.object({
    category: yup.string().required(),
    subCategory: yup.string().required(),
    image: yup.mixed().required(),
    title: yup.string().required(),
    discount: yup.string().test('discount', "enter valid discount", (val) => {

      if (val <= 100) {
        return true
      } else {
        return false
      }
    }).required(),
    price: yup.string().test('price', "enter valid price", (val) => {
      if (val > 0) {
        return true
      } else {
        return false
      }
    }).required(),
    brand: yup.string().required(),
    stock: yup.string().required(),
    description: yup.string().test('description', "enter minimum 2 words", (val) => {
      let arr = val.split(" ");
      if (arr.length >= 2) {
        return true
      } else {
        return false
      }
    }).required(),
  });

  const formik = useFormik({
    initialValues: {
      category: '',
      subCategory: '',
      image: '',
      title: '',
      discount: '',
      price: '',
      brand: '',
      stock: '',
      description: '',
    },
    validationSchema: productSchema,
    onSubmit: (values, { resetForm }) => {
      // resetForm();
      // console.log(values, "valuessssssssssssssssssss");
      dispatch(addProductData(values))
    }
  })

  const { handleBlur, handleChange, handleSubmit, setFieldValue, touched, errors, values, } = formik
  // console.log("jjjjjjjjjjjjjjjjjjjjjjjjj", values);

  return (
    <ScrollView style={{ marginHorizontal: 15 }}>
      <Picker
        name="category"
        selectedValue={values.category}
        onValueChange={(itemValue, itemIndex) => {
          setFieldValue("category", itemValue)

        }}>
        <Picker.Item label="select" value="select" />
        {
          categorySel.category.map((v) => {
            // console.log(v, "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
            return <Picker.Item label={v.name} value={v.id} />
          })
        }
      </Picker>
      {touched.category && errors.category ? <Text style={style.errTxt}>{errors.category}</Text> : null}

      <Picker
        name="subCategory"
        selectedValue={values.subCategory}
        onValueChange={(itemValue, itemIndex) => {
          setFieldValue("subCategory", itemValue)
        }}>
        <Picker.Item label="select" value="select" />
        {
          subCatSel.subCatData.map((v) => {
            // console.log(values.category,"vvvvffvvvvvvvvvvvvvvvvvv");

            if (v.category == values.category) {
              // console.log(v.subCatName);
              return <Picker.Item label={v.subCatName} value={v.id} />
            }
          })
        }
      </Picker>
      {touched.subCategory && errors.subCategory ? <Text style={style.errTxt}>{errors.subCategory}</Text> : null}

      <TouchableOpacity style={style.imgBox} onPress={handleImage}>
        <Text style={style.imgTxt}>UPLOAD IMAGE</Text>
      </TouchableOpacity>
      {touched.image && errors.image ? <Text style={style.errTxt}>{errors.image}</Text> : null}

      <TextInput
        style={style.inputBox}
        name='title'
        onChangeText={handleChange('title')}
        onBlur={handleBlur('title')}
        placeholder='enter title'
      />
      {touched.title && errors.title ? <Text style={style.errTxt}>{errors.title}</Text> : null}

      <TextInput
        style={style.inputBox}
        name='discount'
        onChangeText={handleChange('discount')}
        onBlur={handleBlur('discount')}
        placeholder='enter discount'
        keyboardType='numeric'
      />
      {touched.discount && errors.discount ? <Text style={style.errTxt}>{errors.discount}</Text> : null}

      <TextInput
        style={style.inputBox}
        name='price'
        onChangeText={handleChange('price')}
        onBlur={handleBlur('price')}
        placeholder='enter price'
        keyboardType='numeric'
      />
      {touched.price && errors.price ? <Text style={style.errTxt}>{errors.price}</Text> : null}

      <TextInput
        style={style.inputBox}
        name='brand'
        onChangeText={handleChange('brand')}
        onBlur={handleBlur('brand')}
        placeholder='enter brand'
      />
      {touched.brand && errors.brand ? <Text style={style.errTxt}>{errors.brand}</Text> : null}

      <TextInput
        style={style.inputBox}
        name='stock'
        onChangeText={handleChange('stock')}
        onBlur={handleBlur('stock')}
        placeholder='enter stock'
      />
      {touched.stock && errors.stock ? <Text style={style.errTxt}>{errors.stock}</Text> : null}

      <TextInput
        style={style.inputBox}
        name='description'
        onChangeText={handleChange('description')}
        onBlur={handleBlur('description')}
        placeholder='enter description'
      />
      {touched.description && errors.description ? <Text style={style.errTxt}>{errors.description}</Text> : null}

      <TouchableOpacity style={style.imgBox} onPress={handleSubmit}>
        <Text style={style.imgTxt}>SUBMIT</Text>
      </TouchableOpacity>

      {
        productSel.product.map((v)=>{
          console.log(v,"mappppppppppppppppppppppp");
          return (
            <View>
              <Image 
                style={{width:100,height:100}}
                source={{uri:v.image}}
              />
            <Text>{v.title}</Text>
            <TouchableOpacity onPress={()=>handleDelete(v)}>
              <Text style={{marginBottom:20}}>DELETE</Text>
            </TouchableOpacity>
            </View>
          )
        })
      }
    </ScrollView>
  )
}
const style = StyleSheet.create({
  imgBox: {
    width: 150,
    backgroundColor: 'blue',
    padding: 10,
    marginTop: 30,
    alignSelf: 'center'
  },
  imgTxt: {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  errTxt: {
    color: 'red',
    fontWeight: 'bold'
  },
  inputBox: {
    borderWidth: 0.5,
    marginTop: 20,

  }
})