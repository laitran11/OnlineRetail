import React, { useEffect, useState } from 'react'
import { Typography, Box, Grid, TextField, Divider, List, ListItemButton, ListItem } from '@mui/material'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PersonIcon from '@mui/icons-material/Person';
import Container from '@mui/material/Container';
import '../../index.css';
import { Widgets } from '@mui/icons-material';
import { fetchCategory, Category, fetchProduct, Products, fetchCategoryById, CategoryById } from '../../api/product';
import { Link } from 'react-router-dom';

export default function Home() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Products[]>([]);
    const [selectedCategoryId, setSelectedCategory] = useState<number | null>(null);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await fetchCategory();
                console.log(data);
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
    return (
        <>
            <Container>
                <Grid container style={{ margin: 20 }}>
                    <Grid item xs={3} style={{ marginTop: 10 }}>
                        <Typography variant='h5' style={{ fontWeight: '600', fontFamily: "Briem Hand" }}>E-Comershop</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField defaultValue="search products" style={{ width: '90%', }} />
                    </Grid>
                    <Grid item xs={3} style={{ marginTop: 10 }}>
                        <Grid container alignItems="center">

                            <LocalMallIcon style={{ marginRight: '10%' }} />
                            {
                                isLoggedIn ?
                                    (
                                        // <Link to="/login" >
                                        //     < PersonIcon />
                                        // </Link>
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
                        <Box sx={{ marginY: 3, padding: 2, border: '0.5px solid grey' }}>
                            <Typography> Showing {products.length} results</Typography>
                        </Box>
                        <Grid container>
                            {products.map(product => (
                                <Grid item xs={12} md={4}>
                                    <Box key={product.id} sx={{ border: '0.5px solid grey', margin: 1, borderRadius: 4, }}>
                                        <img src='https://picsum.photos/200/300' alt="image" style={{ width: '100%', height: 250, borderRadius: 20, }} />
                                        <Typography sx={{ paddingY: 1, textAlign: 'center' }}>{product.name}</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
                                            <Typography sx={{ textAlign: 'center', marginRight: '20%' }}>{product.price}</Typography>
                                            <LocalMallIcon sx={{ backgroundColor: '#d9d9d9', padding: 1, borderRadius: 10 }} />
                                        </Box>

                                    </Box>

                                </Grid>
                            ))}
                        </Grid>


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
