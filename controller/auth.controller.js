import { User } from "../models/user.model.js"
import { loginSchema } from "../schemas/login.schema.js"
import { userSchema } from "../schemas/user.schema.js"
import { errorResponse, successResponse } from "../utils/response.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = async (req, res, next) => {
    try {
        const data = userSchema.safeParse(req.body)
        if (!data.success) {
            return errorResponse(res, 400, 'The data entered is invalid')
        }
        const { name, email, age, password } = data.data
        const SALT = 10
        const hashPassword = await bcrypt.hash(password, SALT)
        const newUser = new User({
            name,
            email,
            age,
            password: hashPassword
        })
        await newUser.save()
        return successResponse(res, 201, { _id: newUser._id, name, email, age })
    } catch (error) {
        if (error.code === 11000) {
            return errorResponse(res, 409, "Email already exists");
        }
        return errorResponse(res, 500, "User has not been created");
    }
}


export const loginUser = async (req, res, next) => {
    try {
        const data = loginSchema.safeParse(req.body)
        if (!data.success) {
            return errorResponse(res, 400, 'The data entered for login is invalid')
        }
        const { email, password } = data.data
        const user = await User.findOne({ email })
        if (!user) {
            return errorResponse(res, 401, 'Invalid email or password')
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return errorResponse(res, 401, 'Invalid email or password')
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )



        return successResponse(res, 200, {
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        return errorResponse(res, 500, 'Login Failed')
    }

}