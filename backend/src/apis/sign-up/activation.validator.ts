import {z} from 'zod';

export const activationSchema = z.object({
    activation: z.string({required_error: "Activation is required", invalid_type_error: "Activation must be a string"})
        .length(32, {message: "Please provide a valid profile activation token"})
})
