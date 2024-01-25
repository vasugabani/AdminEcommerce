import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const initialState = {
    isLoading: false,
    product: [],
    error: null
}

export const getProductData = createAsyncThunk(
    'product/get',
    async () => {
        let data = [];
        try {
            await firestore()
                .collection('product')
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

export const addProductData = createAsyncThunk(
    'product/add',

    async (data) => {
        console.log(data, "dddaaatttaaaaaaaaaaaaaaaa");

        let allData = { ...data };

        let tempArr = data.image.path.split("/")
        let imageName = tempArr[tempArr.length - 1]
        console.log(imageName);

        let rNo = Math.floor(Math.random() * 1000)
        let imgFinalName = rNo + "__" + imageName
        console.log(imgFinalName);

        const imgRef = storage().ref('product/' + imgFinalName);
        console.log(imgRef);

        const task = imgRef.putFile(data.image.path);
        console.log(task,"ttttttttttttttt");

        await task.on('state_changed', taskSnapshot => {
            console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
        });

        await task.then(async () => {
            const url = await storage().ref('product/' + imgFinalName).getDownloadURL();

            allData.image = url;
            allData.imagename = imgFinalName;

            await firestore()
                .collection('product')
                .add({ ...data, image: url, imagename: imgFinalName })
                .then((doc) => {
                    allData.id = doc.id
                    console.log('User added!');
                    
                })
                .catch((error) => console.log(error));
        })
        console.log("aallllll datttaaaaaaaaaa", allData);
        console.log(allData.id, "iiiiiiiiiiiiiiiiddddddddddddddddddddd");
        return allData;

    }
)

export const deleteProductData = createAsyncThunk(
    'product/delete',
    async (data) => {
        console.log("sliceeeeeeeeeeeeeeeeeee", data);
        const imgRef = storage().ref('product/' + data.imagename);
        console.log(imgRef);

        await imgRef.delete().then(async () => {
            await firestore()
                .collection('product')
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

const productSlice = createSlice({
    name:'product',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{

        builder.addCase(getProductData.fulfilled,(state,action)=>{
            state.product=action.payload
        })

        builder.addCase(addProductData.fulfilled, (state,action)=>{
            console.log(action.payload,"actionnnnnnnnnnnnnnnnnnnnnnn");
            state.product.push(action.payload)
        })

        builder.addCase(deleteProductData.fulfilled,(state,action)=>{
            state.product = state.product.filter((v)=>v.id !== action.payload)
        })
    }
})

export default productSlice.reducer