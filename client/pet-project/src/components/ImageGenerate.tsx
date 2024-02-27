import React from 'react'
import { useDispatch } from 'react-redux'
import { addImageToCollection } from '../redux/reducers/userCollections'
import { v4 as uuidv4 } from "uuid";


const ImageGenerate = (url: any) => {
    const dispatch = useDispatch()
    const image = url.url

    const handleAddCollection = () => {
        dispatch(addImageToCollection({
            collectionId: uuidv4(),
            image:
            {
                id: uuidv4(),
                src: image
            }
        }))
    }

    return (
        <div>
            <img src={image} alt="Generated Image" />
            <button onClick={handleAddCollection}>Add to the collection</button>
        </div>
    )
}

export default ImageGenerate