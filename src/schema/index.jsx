import * as Yup from 'yup'

export const addProductSchema = Yup.object({
    title:Yup.string().min(2).max(25).required("Please Enter The Product"),
    description:Yup.string().min(5).max(60).required("Please Enter The Description"),
    brand:Yup.string().min(2).max(25).required("Please Enter The Brand"),
    category:Yup.string().min(2).max(25).required("Please Enter The Category"),
    price:Yup.string().min(1).max(25).required("Please Enter The Price"),
})