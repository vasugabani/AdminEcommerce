import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import firestore from '@react-native-firebase/firestore';

const initialState = {
    isLoading: false,
    subCatData: [],
    error: null,
}

export const getSubCatData = createAsyncThunk(
    'subCategory/get',

    async () => {
        let data = [];
        try {
            await firestore()
                .collection('subCategory')
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(documentSnapshot => {

                        data.push({
                            id: documentSnapshot.id,
                            ...documentSnapshot.data()
                        })
                    });
                });
            return data;
        } catch (error) {
            return error
        }
    }
)

export const addSubCatData = createAsyncThunk(
    'subCategory/add',

    async (data) => {
        console.log("dataaaaaaaaaaa", data);
        await firestore()
            .collection('subCategory')
            .add(data)
            .then(() => {
                console.log('User added!');
            });
        return data;
    }
)

export const deleteSubCatData = createAsyncThunk(
    'subCategory/delete',

    async (data) => {
        console.log("delete slice", data);
        await firestore()
            .collection('subCategory')
            .doc(data.id)
            .delete()
            .then(() => {
                console.log('User deleted!');
            });
        return data.id;
    }
)

const subCategorySlice = createSlice({
    name: "subCategory",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSubCatData.fulfilled, (state, action) => {
            state.subCatData = action.payload
        })
        builder.addCase(addSubCatData.fulfilled, (state, action) => {
            console.log("actionnnnnnnnnnnnnnnn", action.payload);

            state.subCatData.push(action.payload)
        })
        builder.addCase(deleteSubCatData.fulfilled,(state,action)=>{
           state.subCatData = state.subCatData.filter((v)=>v.id !== action.payload)
        })
    }
})

export default subCategorySlice.reducer