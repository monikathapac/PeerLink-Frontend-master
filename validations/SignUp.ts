import * as yup from "yup"

export const RegistrationSchema = yup.object().shape(
    {
        firstName: yup.string().required("Please enter your First Name!"),
        lastName: yup.string().required("Please enter your Last Name!"),
        address: yup.string().required("Please enter your Address!"),
        phoneNumber: yup.string().required("Please enter your Phone Number"),
        email: yup.string().email().required("Please enter your Email Address!"),
        password: yup.string().min(5).required(),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null]).required()
    }
)