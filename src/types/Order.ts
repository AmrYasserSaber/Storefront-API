type Order = {
    id?: string;
    ids_of_products: string[];
    quantity_of_each_product: number;
    user_id: string;
    status: string;
};
export default Order;
