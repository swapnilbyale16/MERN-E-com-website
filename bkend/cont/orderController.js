const sendEmail = require("../services/emailService");

exports.placeOrder = async (req, res) => {
    try {
        const { email, cart } = req.body; // Extract user email and cart details

        if (!email) {
            return res.status(400).json({ message: "User email is required!" });
        }

        let orderItems = cart.map(item => `<li>${item.name} - Qty: ${item.qty}, Price: ${item.price}</li>`).join("");
        let orderDetails = `
            <h2>Your Order is Confirmed!</h2>
            <p>Thank you for shopping with us.</p>
            <ul>${orderItems}</ul>
            <p><strong>Total: ₹${cart.reduce((acc, item) => acc + item.qty * item.price, 0)}</strong></p>
        `;

        // Send order confirmation email to the user
        await sendEmail(email, "Order Confirmation", "Your order has been placed!", orderDetails);

        res.status(200).json({ message: "Order placed & email sent successfully!" });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Failed to place order" });
    }
};
