import React, { useEffect, useState } from 'react'
import { Typography, Box, Grid, TextField, Divider, List, ListItemButton, ListItem, Modal, Button, Select, MenuItem, InputLabel } from '@mui/material'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PersonIcon from '@mui/icons-material/Person';
import Container from '@mui/material/Container';
import '../../index.css';
import { Widgets } from '@mui/icons-material';
import {
    fetchCategory, Category, fetchProduct, Products, fetchCategoryById,
    CategoryById, InsertProduct, fetchInsertProduct, fetchDeleteProduct,
    fetchUpdateProduct, fetchSearchByName, fetchSort
} from '../../api/product';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Products[]>([]);
    const [selectedCategoryId, setSelectedCategory] = useState<number | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');// Ensure price is treated as a number
    const [categoryId, setCategoryId] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [openModalUpdate, setOpenModalUpdate] = useState<{ [id: number]: boolean }>({});
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [searchkey, setSearchKey] = useState<string>('');
    const [searchdata, setSearchData] = useState<Products[]>([]);
    const [searching, setSearching] = useState<boolean>(false);
    const [comparison, setComparison] = useState('');
    const [sortData, setSortData] = useState<Products[]>([]);
    const [sorting, setSorting] = useState<boolean>(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    // const handleOpenModalUpdate = (id: number) => {
    //     setOpenModalUpdate(prevState => ({ ...prevState, [id]: true }));
    //     setSelectedId(id);
    // };
    const handleOpenModalUpdate = (id: number) => {
        const productToUpdate = products.find(product => product.id === id);
        if (productToUpdate) {
            setName(productToUpdate.name);
            setPrice(productToUpdate.price.toString());
            setCategoryId(productToUpdate.categoryId ? productToUpdate.categoryId.toString() : '');
            setSelectedId(id);
            setOpenModalUpdate(prevState => ({ ...prevState, [id]: true }));
        } else {
            console.error('Product not found for update');
        }
    };

    const handleCloseModalUpdate = () => {
        if (selectedId !== null) {
            setOpenModalUpdate(prevState => ({ ...prevState, [selectedId]: false }));
            setSelectedId(null);
        }
    };

    /* ---------------------- view product ------------------*/
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await fetchCategory();
                //console.log(data);
                if (data !== null)
                    setCategories(data);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };
        const fetchProducts = async () => {
            try {
                const data = await fetchProduct();
                // console.log(data);
                if (data !== null)
                    setProducts(data);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        fetchCategories();
        fetchProducts();
    }, [])


    const handleCategoryId = async (categoryId: number | null) => {
        try {
            setSearching(false);
            setSorting(false);
            if (categoryId === null) {
                const allProducts = await fetchProduct();
                if (allProducts !== null) {
                    setProducts(allProducts);
                    setSelectedCategory(null); // Reset selected category
                }
            }
            else {
                const data = await fetchCategoryById(categoryId);
                if (data) {
                    setProducts(data[0].products);
                    setSelectedCategory(categoryId);
                }
            }
        }
        catch (error) {
            console.error('Error fetching products:', error);
        }
    }
    const handleLogout = () => {
        // Remove login status from local storage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user')
        window.location.reload();
        // Redirect to login page or perform any other necessary actions
    }

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    /* ---------------------- insert product ------------------*/
    const handleInsert = async () => {
        try {
            const insertData: InsertProduct = {
                name: name,
                price: parseFloat(price),
                categoryId: parseInt(categoryId),
                productImages: [{ imageUrl: imageUrl }]
            };
            console.log(insertData);
            const data = await fetchInsertProduct(insertData);
            // if (data !== null)
            // setProducts(data);
        } catch (error) {
            console.error('Error inserting data:', error);
        }
    }
    /* ---------------------- delete product ------------------*/
    const handleDelete = async (id: number) => {
        try {
            await fetchDeleteProduct(id);
            setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error inserting data:', error);
        }
    }
    /* ---------------------- Update product ------------------*/
    const handleUpdate = async (id: number) => {
        try {
            const updatedProduct = products.find(product => product.id === id);
            if (!updatedProduct) {
                console.error('Product not found for update');
                return;
            }
            const updateData: InsertProduct = {
                name: name,
                price: parseFloat(price),
                categoryId: parseInt(categoryId),
                productImages: [{ imageUrl: imageUrl }]
            };
            console.log(updateData);
            await fetchUpdateProduct(updateData, id);
            const updatedProducts = products.map(product =>
                product.id === id ? { ...product, ...updateData } : product
            );
            setProducts(updatedProducts);
            handleCloseModalUpdate();
        } catch (error) {
            console.error('Error inserting data:', error);
        }
    }
    /* ---------------------- Search product by name ------------------*/
    const handleSearch = async () => {
        try {
            setSearching(true);
            const data = await fetchSearchByName(searchkey, 1);
            console.log(data);
            if (data !== null)
                setSearchData(data);
        } catch (error) {
            console.error('Error inserting data:', error);
        }
    }
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }
    /* ---------------------- Sort product by price ------------------*/

    const fetchSortByPrice = async () => {
        try {
            if (!comparison) {
                // If no comparison selected, don't make the API call
                return;
            }
            setSorting(true);
            const data = await fetchSort(comparison, 1000);
            console.log(data);
            if (data !== null)
                setSortData(data);
        } catch (error) {
            console.error('Error fetching products', error);
        }
    };


    return (
        <>
            <Container>
                <Grid container style={{ margin: 20 }}>
                    <Grid item xs={3} style={{ marginTop: 10 }}>
                        <Typography variant='h5' style={{ fontWeight: '600', fontFamily: "Briem Hand" }}>E-Comershop Dashboard</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField defaultValue="search products" style={{ width: '90%', }} onChange={(e) => setSearchKey(e.target.value)} onKeyDown={handleKeyPress} onFocus={(e) => { if (e.target.value === "search products") e.target.value = ""; }} />
                    </Grid>
                    <Grid item xs={3} style={{ marginTop: 10 }}>
                        <Grid container alignItems="center">

                            <LocalMallIcon style={{ marginRight: '10%' }} />
                            {
                                isLoggedIn ?
                                    (
                                        <Typography onClick={handleLogout} style={{ cursor: 'pointer' }}>Log out</Typography>
                                    )
                                    :
                                    (
                                        <Link to="/login" >
                                            < PersonIcon />
                                        </Link>
                                    )
                            }
                        </Grid>
                    </Grid>
                </Grid>
                <Divider />
                <Grid container style={{ margin: 20 }}>
                    <Grid item xs={4} md={4}>
                        <Box sx={{ border: '0.5px solid grey', padding: '5px', flex: 1, borderRadius: 2, textAlign: 'center', paddingBottom: 10, paddingTop: 5 }}>
                            <Typography variant='h6' style={{ fontWeight: '600', marginBottom: 10 }}>Product Categories</Typography>
                            <List>
                                <ListItem>
                                    <ListItemButton sx={{ marginY: 1 }} onClick={() => handleCategoryId(null)}>
                                        All Products
                                    </ListItemButton>
                                </ListItem>
                                {categories.map(category => (
                                    <ListItem key={category.id}>
                                        <ListItemButton sx={{ marginY: 1 }} onClick={() => handleCategoryId(category.id)}>{category.categoryName}</ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Grid>
                    <Grid item xs={8} md={8} sx={{ paddingX: 5 }}>
                        {searching ? (
                            <>
                                <Box sx={{ marginY: 3, padding: 2, border: '0.5px solid grey' }}>
                                    <Typography> Searched {searchdata.length} results</Typography>
                                </Box>
                                <Grid container>
                                    {searchdata.map(product => (
                                        <>
                                            <Grid item xs={12} md={4}>
                                                <Box key={product.id} sx={{ border: '0.5px solid grey', margin: 1, borderRadius: 4, }}>
                                                    <img src='https://product.hstatic.net/200000641225/product/thiet_ke_chua_co_ten_-_2023-10-05t140939.692_e43c5297ce8549609162c6a6a53ac904_master.jpg' alt="image" style={{ width: '100%', height: 250, borderRadius: 20, }} />
                                                    <Typography sx={{ paddingY: 1, textAlign: 'center' }}>{product.name}</Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
                                                        <Typography sx={{ textAlign: 'center', marginRight: '20%' }}>{product.price} $</Typography>
                                                        <LocalMallIcon sx={{ backgroundColor: '#d9d9d9', padding: 1, borderRadius: 10 }} />
                                                    </Box>
                                                    <Box sx={{ textAlign: 'center' }}>
                                                        <Button onClick={() => handleOpenModalUpdate(product.id)} >Edit</Button>
                                                        <Button onClick={() => handleDelete(product.id)}>Delete</Button>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Modal open={openModalUpdate[product.id]} onClose={handleCloseModalUpdate} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 5 }}>
                                                    <Typography variant='h5' align='center' style={{ fontWeight: '600', fontFamily: "Briem Hand", marginBottom: 20, color: 'GrayText' }}>Update product</Typography>
                                                    <Divider />

                                                    <TextField fullWidth variant='outlined' margin='normal' label="name" value={name} onChange={(e) => setName(e.target.value)} />
                                                    <TextField fullWidth variant='outlined' margin='normal' label="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                                    <Select
                                                        fullWidth
                                                        variant='outlined'
                                                        margin='none'
                                                        value={categoryId}
                                                        onChange={(e) => setCategoryId(e.target.value as unknown as string)}
                                                        label="Category"
                                                    >
                                                        {categories.map(category => (
                                                            <MenuItem key={category.id} value={category.id}>{category.categoryName}</MenuItem>
                                                        ))}
                                                    </Select>
                                                    <TextField fullWidth variant='outlined' margin='normal' label="imagelink" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                                                    <Box sx={{ textAlign: 'right' }}>
                                                        <Button onClick={() => handleUpdate(product.id)}>Add</Button>
                                                        <Button onClick={handleCloseModalUpdate}>Close</Button>
                                                    </Box>
                                                </Box>
                                            </Modal>
                                        </>
                                    ))}

                                </Grid>
                            </>
                        ) : (
                            <>

                                <Grid container>
                                    <Button onClick={handleOpenModal}>
                                        Insert Product
                                    </Button>
                                    <Modal open={openModal} onClose={handleCloseModal} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 5 }}>
                                            <Typography variant='h5' align='center' style={{ fontWeight: '600', fontFamily: "Briem Hand", marginBottom: 20, color: 'GrayText' }}>Add new product</Typography>
                                            <Divider />

                                            <TextField fullWidth variant='outlined' margin='normal' label="name" onChange={(e) => setName(e.target.value)} />
                                            <TextField fullWidth variant='outlined' margin='normal' label="price" onChange={(e) => setPrice(e.target.value)} />
                                            <Select
                                                fullWidth
                                                variant='outlined'
                                                margin='none'
                                                value={categoryId}
                                                onChange={(e) => setCategoryId(e.target.value as unknown as string)} // Ensure categoryId is treated as a number or string
                                                label="Category"
                                            >
                                                {categories.map(category => (
                                                    <MenuItem key={category.id} value={category.id}>{category.categoryName}</MenuItem>
                                                ))}
                                            </Select>
                                            <TextField fullWidth variant='outlined' margin='normal' label="imagelink" onChange={e => setImageUrl(e.target.value)} />
                                            <Box sx={{ textAlign: 'right' }}>
                                                <Button onClick={handleInsert}>Add</Button>
                                                <Button onClick={handleCloseModal}>Close</Button>
                                            </Box>
                                        </Box>
                                    </Modal>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={10}>
                                        <Box sx={{ marginY: 3, padding: 2, border: '0.5px solid grey' }}>
                                            <Typography> Showing {products.length} results</Typography>

                                        </Box>
                                    </Grid>
                                    <Grid item xs={2} sx={{ marginY: 1, padding: 2 }}>
                                        <Select
                                            fullWidth
                                            variant='outlined'
                                            margin='none'
                                            value={comparison} onChange={(e) => { setComparison(e.target.value); fetchSortByPrice() }}
                                            label="Sort"
                                        >
                                            <MenuItem value="<">Larger than 1000$</MenuItem>
                                            <MenuItem value=">">Less than 1000$</MenuItem>

                                        </Select>

                                    </Grid>
                                </Grid>
                                {
                                    sorting ?
                                        (
                                            <>
                                            <Typography> Sorting results</Typography>
                                                <Grid container>
                                                    
                                                    {sortData.map(product => (
                                                        <>

                                                            <Grid item xs={12} md={4}>

                                                                <Box key={product.id} sx={{ border: '0.5px solid grey', margin: 1, borderRadius: 4, }}>
                                                                    <img src='https://product.hstatic.net/200000641225/product/thiet_ke_chua_co_ten_-_2023-10-05t140939.692_e43c5297ce8549609162c6a6a53ac904_master.jpg' alt="image" style={{ width: '100%', height: 250, borderRadius: 20, }} />
                                                                    <Typography sx={{ paddingY: 1, textAlign: 'center' }}>{product.name}</Typography>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
                                                                        <Typography sx={{ textAlign: 'center', marginRight: '20%' }}>{product.price} $</Typography>
                                                                        <LocalMallIcon sx={{ backgroundColor: '#d9d9d9', padding: 1, borderRadius: 10 }} />
                                                                    </Box>
                                                                    <Box sx={{ textAlign: 'center' }}>
                                                                        <Button onClick={() => handleOpenModalUpdate(product.id)} >Edit</Button>
                                                                        <Button onClick={() => handleDelete(product.id)}>Delete</Button>
                                                                    </Box>
                                                                </Box>
                                                            </Grid>
                                                            <Modal open={openModalUpdate[product.id]} onClose={handleCloseModalUpdate} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 5 }}>
                                                                    <Typography variant='h5' align='center' style={{ fontWeight: '600', fontFamily: "Briem Hand", marginBottom: 20, color: 'GrayText' }}>Update product</Typography>
                                                                    <Divider />

                                                                    <TextField fullWidth variant='outlined' margin='normal' label="name" value={name} onChange={(e) => setName(e.target.value)} />
                                                                    <TextField fullWidth variant='outlined' margin='normal' label="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                                                    <Select
                                                                        fullWidth
                                                                        variant='outlined'
                                                                        margin='none'
                                                                        value={categoryId}
                                                                        onChange={(e) => setCategoryId(e.target.value as unknown as string)}
                                                                        label="Category"
                                                                    >
                                                                        {categories.map(category => (
                                                                            <MenuItem key={category.id} value={category.id}>{category.categoryName}</MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                    <TextField fullWidth variant='outlined' margin='normal' label="imagelink" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                                                                    <Box sx={{ textAlign: 'right' }}>
                                                                        <Button onClick={() => handleUpdate(product.id)}>Add</Button>
                                                                        <Button onClick={handleCloseModalUpdate}>Close</Button>
                                                                    </Box>
                                                                </Box>
                                                            </Modal>
                                                        </>
                                                    ))}

                                                </Grid></>
                                        )
                                        :
                                        (
                                            <>
                                                <Grid container>
                                                    { products && products.map(product => (
                                                        <>
                                                            <Grid item xs={12} md={4}>
                                                                <Box key={product.id} sx={{ border: '0.5px solid grey', margin: 1, borderRadius: 4, }}>
                                                                    <img src='https://product.hstatic.net/200000641225/product/thiet_ke_chua_co_ten_-_2023-10-05t140939.692_e43c5297ce8549609162c6a6a53ac904_master.jpg' alt="image" style={{ width: '100%', height: 250, borderRadius: 20, }} />
                                                                    <Typography sx={{ paddingY: 1, textAlign: 'center' }}>{product.name}</Typography>
                                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
                                                                        <Typography sx={{ textAlign: 'center', marginRight: '20%' }}>{product.price} $</Typography>
                                                                        <LocalMallIcon sx={{ backgroundColor: '#d9d9d9', padding: 1, borderRadius: 10 }} />
                                                                    </Box>
                                                                    <Box sx={{ textAlign: 'center' }}>
                                                                        <Button onClick={() => handleOpenModalUpdate(product.id)} >Edit</Button>
                                                                        <Button onClick={() => handleDelete(product.id)}>Delete</Button>
                                                                    </Box>
                                                                </Box>
                                                            </Grid>
                                                            <Modal open={openModalUpdate[product.id]} onClose={handleCloseModalUpdate} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 5 }}>
                                                                    <Typography variant='h5' align='center' style={{ fontWeight: '600', fontFamily: "Briem Hand", marginBottom: 20, color: 'GrayText' }}>Update product</Typography>
                                                                    <Divider />

                                                                    <TextField fullWidth variant='outlined' margin='normal' label="name" value={name} onChange={(e) => setName(e.target.value)} />
                                                                    <TextField fullWidth variant='outlined' margin='normal' label="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                                                    <Select
                                                                        fullWidth
                                                                        variant='outlined'
                                                                        margin='none'
                                                                        value={categoryId}
                                                                        onChange={(e) => setCategoryId(e.target.value as unknown as string)}
                                                                        label="Category"
                                                                    >
                                                                        {categories.map(category => (
                                                                            <MenuItem key={category.id} value={category.id}>{category.categoryName}</MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                    <TextField fullWidth variant='outlined' margin='normal' label="imagelink" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                                                                    <Box sx={{ textAlign: 'right' }}>
                                                                        <Button onClick={() => handleUpdate(product.id)}>Add</Button>
                                                                        <Button onClick={handleCloseModalUpdate}>Close</Button>
                                                                    </Box>
                                                                </Box>
                                                            </Modal>
                                                        </>
                                                    ))}

                                                </Grid></>
                                        )
                                }
                            </>)}
                    </Grid>
                </Grid>
            </Container>
            <Box sx={{ width: '100%', height: 150, display: 'flex', flexDirection: 'column', backgroundColor: 'ActiveCaption', justifyContent: 'center' }}>
                <Grid container>
                    <Grid item xs={4}>
                        <Typography variant='h5' style={{ fontWeight: '600', fontFamily: "Briem Hand", color: '#fff', textAlign: 'center' }}>E-Comershop</Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography sx={{ color: '#fff', textAlign: 'center', paddingY: 1 }}> GET 20% OFF DISCOUNT COUPON</Typography>
                        <TextField defaultValue="Enter your email" sx={{ width: 250, backgroundColor: '#fff', textAlign: 'center', borderRadius: 2, mt: 1 }} />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
