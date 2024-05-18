const API = 'https://localhost:7029/api/'
export interface Carts {
    id: number;
    categoryId: number;
    name: string;
    price: number;
}
export interface AddCart {
    number: string;
    totalPrice: number;
    productId: number;
}
export const fetchInsertProduct = async (insertData: AddCart): Promise<Carts[] | null> => {
    try {
        const response = await fetch(API + 'cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(insertData)
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data: Carts[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data', error);
        return null;
    };

}