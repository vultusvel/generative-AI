import { useDispatch } from 'react-redux'
import { addImageToCollection } from '../redux/reducers/userCollections'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { v4 as uuidv4 } from "uuid";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface ImageGenerateProps {
    url: any;
    handleClose: any
}

const ImageGenerate: React.FC<ImageGenerateProps> = ({ url, handleClose }) => {
    const dispatch = useDispatch()
    const [selectedCollectionId, setSelectedCollectionId] = useState('');
    const [click, setClick] = useState<boolean>(false)
    const [localCollections, setLocalCollections] = useState<any[]>([]);

    const savedCollections = localStorage.getItem('userCollections');
    useEffect(() => {
        if (savedCollections !== null) {
            const collections = JSON.parse(savedCollections);
            setLocalCollections(collections);
        }

    }, [savedCollections])

    const image = url
    const id = uuidv4()

    const handleAddCollection = () => {
        const newImage = {
            id: id,
            src: url,
        };
        dispatch(addImageToCollection({
            collectionId: selectedCollectionId,
            image: newImage
        }));
        const storedImages = [];
        storedImages.push(newImage);


        const updatedCollection = {
            collectionId: selectedCollectionId,
            images: storedImages
        }

        localStorage.setItem('images', JSON.stringify([updatedCollection]));
        setClick(true)

    }

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedCollectionId(event.target.value as string);
    };

    return (
        <div>
            <img src={image} alt="Generated Image" />
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="select-label">Select collection</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={selectedCollectionId}
                        label="SellectCollection"
                        onChange={handleChange}
                    >
                        {localCollections.map(collection => (
                            <MenuItem key={collection.collectionId} value={collection.collectionId}>{collection.collectionName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {click && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="success">Image has been added to the collection</Alert>
                </Stack>
            )}

            <Button onClick={handleAddCollection}>Add to the collection</Button>
            <Button onClick={handleClose}>Close</Button>

        </div>
    )
}

export default ImageGenerate
