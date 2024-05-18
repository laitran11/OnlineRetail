const API = 'https://localhost:7029/api/'
export interface Category {
    id: number;
    categoryName: string;
}
export const fetchCategory = async (): Promise<Category[] | null> => {
    try {
        const response = await fetch(API + 'category');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data: Category[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    };

}
export interface Products {
    id: number;
    categoryId: number;
    name: string;
    price: number;
}
export const fetchProduct = async (): Promise<Products[] | null> => {
    try {
        const response = await fetch(API + 'products');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data: Products[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    };
}

export interface CategoryById {
    id: number,
    categoryName: string;
    products: Products[];
}
export const fetchCategoryById = async (id: number): Promise<CategoryById[] | null> => {
    try {
        const response = await fetch(API + `category/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data: CategoryById[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    };
}
export interface InsertProduct {
    name: string;
    price: number;
    categoryId: number;
    productImages: [{ imageUrl: string }]
}
export const fetchInsertProduct = async (insertData: InsertProduct): Promise<Products[] | null> => {
    try {
        const response = await fetch(API + 'products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(insertData)
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data: Products[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data', error);
        return null;
    };

}
export const fetchDeleteProduct = async (id: number): Promise<Products[] | null> => {
    try {
        const response = await fetch(`${API}products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        return null;
    } catch (error) {
        console.error('Error fetching data', error);
        return null;
    };

}
export const fetchUpdateProduct = async (updatedData: InsertProduct, id: number): Promise<Products[] | null> => {
    try {
        const response = await fetch(`${API}products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data: Products[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data', error);
        return null;
    };
}

export const fetchSearchByName = async(Name:string,p: number) : Promise<Products[] | null> =>{
    try{
        const response = await fetch(`${API}products/search?name=${Name}&page=${p}`);
        if(!response.ok)
            {
                throw new Error('Failed to fetch data');
            }
            const data :Products[] = await response.json();
            return data;
    }catch(error)
    {
        console.error('Error fetching data:', error);
        return null;
    };
}
export const fetchSort = async(comparison:string, price: number) : Promise<Products[] | null> =>{
    try{
        const response = await fetch(`${API}products/sort?maxPrice=${price}&comparison=${comparison}`);
        if(!response.ok)
            {
                throw new Error('Failed to fetch data');
            }
            const data :Products[] = await response.json();
            return data;
    }catch(error)
    {
        console.error('Error fetching data:', error);
        return null;
    };
}