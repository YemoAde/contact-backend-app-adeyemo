import jwt from 'jsonwebtoken';

export const STATUS_SUCCESS = 'success';
export const STATUS_ERROR = 'error';

export const responseHandler  = (res, status_code, message, data = null) => {
    let status = status_code == 200 ? STATUS_SUCCESS : STATUS_ERROR

    if(data == null) {
        res.status(status_code).json({
        'status': status,
        'message': message
        })
    } else {
        res.status(status_code).json({
            'status': status,
            'message': message,
            'data': data
        })
    }
}

export const generateToken = data => {
    const token = jwt.sign(
        data, 
        process.env.JWT_SECRET,
        { expiresIn: 86400 }
    );
    return token;
}

export default {
    responseHandler,
    generateToken,
    STATUS_SUCCESS,
    STATUS_ERROR
}