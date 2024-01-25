import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategoryData, getCategoryData } from '../redux/slice/category.slice';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { addSubCatData, deleteSubCatData, getSubCatData } from '../redux/slice/subCategory.slice';
export default function SubCategory() {
    const categoryData = useSelector(state => state.category);
    // console.log(categoryData, "categoryyyyyyyyyyyyy");

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategoryData())
    }, [])

    useEffect(()=>{
        dispatch(getSubCatData())
    },[])

    const subCatSel = useSelector(state=>state.subCategory)
    console.log("selectorrrrrrrrrr",subCatSel);

    const handleDelete = (data) => {
        console.log(data,"deleteeee");
        dispatch(deleteSubCatData(data))
    }

    const [subCategory, setSubCategory] = useState();

    const subCatSchema = yup.object({
        category:yup.string().required(),
        subCatName:yup.string().required(),
    });

    const formik=useFormik({
        initialValues:{
            category:'',
            subCatName:'',
        },
        validationSchema:subCatSchema,
        onSubmit:(values,{resetForm}) => {
            // resetForm();
            console.log(values,"valuessssssssssssssssssss");
            dispatch(addSubCatData(values));
            
        }
    })

    const {handleBlur, handleChange, handleSubmit, setFieldValue, touched, errors, values,} = formik
    console.log(values);

    return (
        <View>
            <Picker
            
                name="category"
                selectedValue={subCategory}
                onValueChange={(itemValue, itemIndex) => {
                    setFieldValue("category",itemValue)
                    setSubCategory(itemValue)
                }}>
                <Picker.Item label="select" value="select" />
                {
                    categoryData.category.map((v) => {
                        // console.log(v,"vvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");
                        return <Picker.Item label={v.name} value={v.id} />
                    })
                }
            </Picker>
            {touched.category && errors.category ? <Text>{errors.category}</Text> : null}

            <TextInput
                // value={values.subCatName}
                name='subCatName'
                onChangeText={handleChange('subCatName')}
                onBlur={handleBlur('subCatName')}
                placeholder='SubCategory Name'
                style={{borderWidth:0.5,marginHorizontal:15,marginTop:40}}
            />
            {touched.subCatName && errors.subCatName ? <Text>{errors.subCatName}</Text> : null}

            <TouchableOpacity onPress={handleSubmit} style={{backgroundColor:'green',width:80,padding:10,marginTop:70,alignSelf:'center'}}>
                <Text style={{color:'white',fontWeight:'bold',textAlign:'center'}}>SUBMIT</Text>
            </TouchableOpacity>

            {
                subCatSel.subCatData.map((v,i)=>{
                    return (
                        <View key={v.id}>
                        <Text style={{marginTop:20}}>{v.subCatName}</Text>
                        <TouchableOpacity onPress={()=>handleDelete(v)}>
                            <Text>DELETE</Text>
                        </TouchableOpacity>
                        </View>
                    )
                })
            }
            
        </View>
    )
}