import useAuthStore from "@/app/store/authStore";
import useCartStore from '@/app/store/cartStore';
import { useNotifications } from '@toolpad/core/useNotifications';
import axiosClient from "@/app/hooks/axiosClient";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const DeleteCartItem = ({ id }) => {
    const { user, userToken } = useAuthStore();
    const { update } = useCartStore();
    const notifications = useNotifications();

    const handleUpdate = (key, quant) => {
        update({
            [key]: quant
        });
    };

    const showNotification = (text, type) => {
        notifications.show(text, {
            severity: type,
            autoHideDuration: 3000,
        });
    };

    const deleteCartItem = async () => {
        if (!id) return;
        if (!user) return showNotification("Unauthorized, please sign in", "info");

        try {
            const response = await axiosClient(`/api/cart/item`, "DELETE", { id }, userToken);
            console.log(response);
            if (response.status === "successful") {
                handleUpdate(id, "deleted");
                showNotification(response.message, "success");
            } else if (response.status === "not_found") {
                showNotification(response.message, "info");
            } else {
                showNotification(response.message, "error");
            }
        } catch (err) {
            console.log(err);
            showNotification("Error deleting item from cart", "error");
        }
    };

    return (
        <IconButton onClick={() => deleteCartItem()}><DeleteForeverIcon sx={{ color: 'red', fontSize: 20 }} /></IconButton>

    );
};

export default DeleteCartItem;
