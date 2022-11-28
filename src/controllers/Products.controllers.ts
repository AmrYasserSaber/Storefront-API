import { NextFunction, Request, Response } from 'express';
import ProductModel from '../models/Products.model';

const Productmodel = new ProductModel();

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const Product = await Productmodel.create(req.body);
        res.json({
            status: 'succes',
            data: { ...Product },
            message: 'done creating the Product'
        });
    } catch (error) {
        next(error);
    }
};

export const getAllProducts = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const Products = await Productmodel.getAllProducts();
        res.json({
            status: 'succes',
            data: { Products },
            message: 'fetched the Products'
        });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const Product = await Productmodel.updateProduct(req.body);
        res.json({
            status: 'succes',
            data: Product,
            message: 'updated the Product'
        });
    } catch (error) {
        next(error);
    }
};
export const ChooseProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const Product = await Productmodel.ChooseProduct(
            req.params.id as unknown as string
        );
        res.json({
            status: 'succes',
            data: { Product },
            message: 'fetched the Product'
        });
    } catch (error) {
        next(error);
    }
};
export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const Product = await Productmodel.deleteProduct(
            req.params.id as unknown as string
        );
        res.json({
            status: 'succes',
            data: { Product },
            message: 'successfully deleted the Product'
        });
    } catch (error) {
        next(error);
    }
};
