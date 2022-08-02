import productService from "../services/product.service";
import { Request, Response } from 'express'
import { ApiError } from "../utils/error.utility";


export async function find(req: Request, res: Response): Promise<void> {
    let { page, limit } = req.query
    const items = await productService.find(page, limit)
    res.json(items)
}


export async function findOne(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id
    const instance = await productService.findOne(id)
    if(!instance) throw(ApiError.badRequest('invalid id'))
    res.json(instance)
}


export async function create(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id
    const data = req.body
    const instance = await productService.create(data)
    res.json(instance)
}


export async function patch(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id
    const data: object = req.body
    const success = await productService.patch(id, data) ? true : false
    res.json({ success })
}


export async function remove(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id
    const success = await productService.delete(id) ? true : false
    res.json({ success })
}


/* CUSTOM */

export async function productNameIsAvailable(req: Request, res: Response): Promise<void> {
    const { name } = req.params
    let available: boolean = true
    if (name) available = await productService.findOneByProductName(name) ? false : true
    res.json({ available })
}