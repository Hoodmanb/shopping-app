import { Button } from '@mui/material';
import useAuthStore from "@/app/store/authStore";
import useCartStore from '@/app/store/cartStore';
import { useNotifications } from '@toolpad/core/useNotifications';
import axiosClient from "@/app/hooks/axiosClient";

const Update = ({ object, id, quantity }) => {

    const { user, userToken } = useAuthStore()
    const { update } = useCartStore();
    const handleUpdate = (key, quant) => {
        // console.log(key)
        update({
            [key]: quant
        })
    };

    const notifications = useNotifications();

    const showNotification = (text, type) => {
        notifications.show(text, {
            severity: type,
            autoHideDuration: 3000,
        });
    };

    const cartItem = object.items.find(item => item.chartItemId === id);
    const updateCartItem = async () => {
        if (!id) return;
        if (!user) return showNotification("unauthorised please sign in", "info")
        try {
            const response = await axiosClient(`/api/cart/${id}`, "PUT", { quantity, price: cartItem.price }, userToken);
            console.log(response)
            if (response.status === "successful" && response.data?._id) {
                handleUpdate(id, response.data.quantity)
                console.log(response.data.quantity)
                showNotification(response.message, "success")
            } else if (response.status === "not_found" && response.data?._id) {
                showNotification(response.message, "info")
            }
            else {
                showNotification(response.message, "error")
            }
        } catch (err) {
            console.log(err)
            showNotification("error adding item to cart", "error")
        }
    }



    if (cartItem && (cartItem.chartItemId === id) && (cartItem.quantity !== quantity)) {
        return (
            <Button
                onClick={() => updateCartItem()}
                size="small"
                sx={{
                    textTransform: "none",
                    backgroundColor: (theme) => theme.customColors.green,
                    color: "text.secondary",
                    fontSize: "0.5em",
                    padding: 0,
                }}
            >
                Update
            </Button>
        );
    } else return null
};

export default Update;
