import { Request, Response } from 'express';
function errorResponse (res:Response,statusCode:number,error:string) {
    const resobj = {statusCode,error};
    return res.status(statusCode).send(resobj);
}

function successResponse(res:Response,statusCode:number,message:string,data:any = []) {
    const resobj = {statusCode,message,data};
    return res.status(statusCode).send(resobj);
}

function handleError(req:Request,err:any) {
    console.log(`
        Errormessage: ${JSON.stringify(err.message)},caught at: ${JSON.stringify(req.path)}
    `)
}

export {
    errorResponse,
    successResponse,
    handleError,
}