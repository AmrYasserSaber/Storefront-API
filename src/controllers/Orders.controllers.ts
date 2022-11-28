import { NextFunction, Request, Response } from 'express';
import OrderModel from '../models/Orders.model';

const Ordermodel = new OrderModel();

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const Order = await Ordermodel.create(req.body);
        res.json({
            status: 'succes',
            data: { ...Order },
            message: 'done creating the Order'
        });
    } catch (error) {
        next(error);
    }
};

export const getAllOrders = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const Orders = await Ordermodel.getAllOrders();
        res.json({
            status: 'succes',
            data: { Orders },
            message: 'fetched the Orders'
        });
    } catch (error) {
        next(error);
    }
};

export const updateOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const Order = await Ordermodel.updateOrder(req.body);
        res.json({
            status: 'succes',
            data: Order,
            message: 'updated the Order'
        });
    } catch (error) {
        next(error);
    }
};
export const ChooseOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const Order = await Ordermodel.ChooseOrder(
            req.params.id as unknown as string
        );
        res.json({
            status: 'succes',
            data: { Order },
            message: 'fetched the Order'
        });
    } catch (error) {
        next(error);
    }
};
export const deleteOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const Order = await Ordermodel.deleteOrder(
            req.params.id as unknown as string
        );
        res.json({
            status: 'succes',
            data: { Order },
            message: 'successfully deleted the Order'
        });
    } catch (error) {
        next(error);
    }
};