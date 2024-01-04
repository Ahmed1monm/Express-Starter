import { Request, Response} from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IBlablabla } from "dtos/blablabla.dto";
import { 
    createBlablabla, findAllBlablablas, findBlablablaById, deleteBlablabla, updateBlablabla, countBlablablas
 } from "services/blablabla.service";

dotenv.config();

/**
 * @async
 * @description update product data
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export async function updateBlablablaController  (req: Request, res: Response): Promise<Response> {
    // TODO: validate data
    try {
        const { id} = req.params;
        const { name, email } = req.body;
        const {user}: jwt.JwtPayload = req;
        const image = req.file;
        let image_path : string|null = null;

        if(image !== undefined){
             image_path = `${req.hostname}:${process.env.PORT || 3000}/${image?.path}`;
        }

        const existingBlablabla:IBlablabla|null = await findBlablablaById(parseInt(id));

        if(!existingBlablabla) return res.status(404).json({ message: "product not found" });
        // if(existingBlablabla.user_id !== user?.id) return res.status(401).json({ message: "unauthorized: you can only update your own product" });

        const blablabla: IBlablabla = updateBlablabla(parseInt(id), { id: parseInt(id), name, email, password: existingBlablabla.password , created_at: existingBlablabla.created_at, updated_at: new Date()});

        return res
            .status(200)
            .json({
                message: "blablabla data updated successfully",
                data: blablabla
            });
    } catch (error) {
        return res.status(500).json({ message: `error ${error}` });
    }

}
/**
 * @async
 * @description create product
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export async function createBlablablaController  (req: Request, res: Response): Promise<Response> {
    // TODO: validate data
    try {
        const { id} = req.params;
        const {user}: jwt.JwtPayload = req;
        const { name, email } = req.body;
        const image = req.file;

        if(image === undefined) return res.status(400).json({ message: "image is required" });
        const existingBlablabla:IBlablabla|null = findBlablablaById(parseInt(id));

        const blablabla:IBlablabla = 
        await createBlablabla({ id: parseInt(id), name, email, password: existingBlablabla.password , created_at: existingBlablabla.created_at, updated_at: new Date()});

        return res
            .status(201)
            .json({
                message: "blablabla created successfully",
                blablabla
            });
    } catch (error) {
        return res.status(500).json({ message: `error ${error}` });
    }
}

/**
 * @async
 * @description delete user
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export async function deleteBlablablaController (req: Request, res: Response): Promise<Response> {
    try {
        const  id: number = parseInt( req.params.id );
        const product: IBlablabla|null = findBlablablaById(id);
        const {user}: jwt.JwtPayload = req;

        if(!product) return res.status(404).json({ message: "blablabla not found" });
        // if(product.user_id !== user?.id) 
        // return res.status(401).json({
        //         message: "unauthorized: you can only delete your own product" 
        //     });


        const affectedRow: number = deleteBlablabla(id);
        return res
            .status(200)
            .json({message: "product deleted successfully", affectedRow });
    } catch (error) {
        return res.status(500).json({ message: `error ${error}` });
    }
}

/**
 * @async
 * @description list users with pagination
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export async  function getAllBlablablas (req: Request, res: Response): Promise<Response> {
    try {
        const { page = 1, count = 10 } = req.query;
        const offset = (parseInt(page.toString()) - 1) * parseInt(count.toString());

        const blablablas: IBlablabla[] = findAllBlablablas();
        const blablablasCount: number = countBlablablas();

        return res.status(200).json({ data: blablablas, total: blablablasCount, page, offset });
    } catch (error) {
        return res.status(500).json({ message: `Error: ${error}` });
    }
}

/**
 * @async
 * @description return user by id
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 */
export async  function getBlablablaController (req: Request, res: Response): Promise<Response> {
    try {

        const { id } = req.params;
        const blablabla: IBlablabla|null = findBlablablaById(parseInt(id));

        return res.status(200).json({ data: blablabla });

    } catch (error) {
        return res.status(500).json({ message: `Error: ${error}` });
    }
}