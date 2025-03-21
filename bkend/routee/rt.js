let express = require("express")
const { reg, login, islogin, isadmin } = require("../cont/cntrl")
const sendEmail = require("../services/emailService"); 
const cm = require("../model/cartmodel");
const { getprod, add, upload, edit, delprod, addcomm } = require("../cont/prodcntrl")
const { addcart, getcart, inc, dec, delcart, countcart } = require("../cont/cartcont")
let routes = express.Router()
const { placeOrder } = require("../cont/orderController");
const authMiddleware = require("../middlewares/authMiddleware");

routes.post("/order", authMiddleware, placeOrder);

routes.post("/reg",reg)
routes.post("/login",login)
routes.post("/add",upload.single("pimg"),islogin,isadmin,add)
routes.get("/products",getprod)
routes.post("/addcart",islogin,addcart)
routes.get("/getcart/:uid",islogin,getcart)
routes.get("/inc/:cid",islogin,inc)
routes.get("/dec/:cid",islogin,dec)
routes.delete("/delcart/:cid",islogin,delcart)
routes.put("/edit",islogin,isadmin,edit)
routes.delete("/delete/:pid",islogin,islogin,delprod)
routes.post("/comment",islogin,addcomm)

routes.post("/place-order", async (req, res) => {
    try {
        const { uid, email } = req.body;
        const cartItems = await cm.find({ uid });

        if (cartItems.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        let totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

        let productDetails = cartItems.map(item => `
            <li>${item.name} (Qty: ${item.qty}) - $${item.price * item.qty}</li>
        `).join("");

        let emailContent = `
            <h2>Your Order Confirmation</h2>
            <p>Thank you for shopping with us. Here are your order details:</p>
            <ul>${productDetails}</ul>
            <h3>Total: $${totalPrice}</h3>
            <p>We will process your order soon.</p>
        `;

        await sendEmail(email, "Order Confirmation", "Your order details", emailContent);

        // Clear the cart after placing the order
        await cm.deleteMany({ uid });

        res.json({ message: "Order placed successfully. Confirmation email sent." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});


module.exports = routes