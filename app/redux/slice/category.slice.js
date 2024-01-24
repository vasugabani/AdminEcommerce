import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const initialState = {
    isLoading: false,
    category: [],
    error: null
}

export const getCategoryData = createAsyncThunk(
    'category/get',

    async () => {
        let data = [];
        try {
            await firestore()
                .collection('category')
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(documentSnapshot => {

                        data.push({
                            id: documentSnapshot.id,
                            ...documentSnapshot.data()
                        })
                    });
                });
            // console.log(data, "oooooooooooooooooooooooooooooooooooo");
            return data;
        } catch (error) {
            return error;
        }

    }
)

export const addCategoryData = createAsyncThunk(

    'category/add',

    async (data) => {
        // console.log("addddddddddddddddd", data);
        let allData = { ...data }

        let tempArr = data.image.path.split('/')
        let imageName = tempArr[tempArr.length - 1]
        // console.log(imageName);

        let rNo = Math.floor(Math.random() * 1000);

        let imgFinalName = rNo + "_" + imageName;
        // console.log(imgFinalName);

        const imgRef = storage().ref('category/' + imgFinalName);

        const task = imgRef.putFile(data.image.path);

        await task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        });

        await task.then(async () => {
            const url = await storage().ref('category/' + imgFinalName).getDownloadURL();

            allData.image = url;
            allData.imagename = imgFinalName;

            await firestore()
                .collection('category')
                .add({ ...data, image: url, imagename: imgFinalName })
                .then((doc) => {
                    allData.id = doc.id;
                })
                .catch((error) => console.log(error));
        });

        // console.log("aallllll datttaaaaaaaaaa", allData);
        return allData;

    }
)
export const deleteCategoryData = createAsyncThunk(
    'category/delete',

    async (data) => {
        console.log("sliceeeeeeeeeeeeeeeeeee", data);
        const imgRef = storage().ref('category/' + data.imgFinalName);
        console.log(imgRef);

        imgRef.delete().then(async () => {
            await firestore()
                .collection('category')
                .doc(data.id)
                .delete()
                .then(() => {
                    console.log('User deleted!');
                });
        })
        console.log(data.id, "iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
        return data.id;
    }
)
// const handleLoading = (state, action) => {
//     state.isLoading = true;
//     state.error = null;
// }

// const handleError = (state, action) => {
//     state.category = [];
//     state.isLoading = false;
//     state.error = action.payload.message;
// }

const categorySlice = createSlice({
    name: "category",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // builder.addCase(getCategoryData.pending,handleLoading)
        builder.addCase(getCategoryData.fulfilled, (state, action) => {
            // console.log(action, "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
            state.category = action.payload
            state.isLoading = false
            state.error = null
        })
        // builder.addCase(getCategoryData.rejected,handleError)

        // builder.addCase(addCategoryData.pending,handleLoading)
        builder.addCase(addCategoryData.fulfilled, (state, action) => {
            // console.log("actionnnnnnnnnnnnnnnnnn", action);
            state.category.push(action.payload)
            state.isLoading = false
            state.error = null
        })
        // builder.addCase(getCategoryData.rejected,handleError)

        builder.addCase(deleteCategoryData.fulfilled, (state, action) => {
            state.category = state.category.filter((val) => val.id !== action.payload)
        })
    }
})

export default categorySlice.reducer