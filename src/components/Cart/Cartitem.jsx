import { Chip, IconButton } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  findCart,
  removeCartItem,
  updateCartItem,
} from "../../State/Cart/Action";
import "/Users/indianic/Desktop/Swimmy/styles/CartItem.css";
import { toast } from "react-toastify";

const CartItem = ({ item }) => {
  const { auth, cart } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleUpdateCartItem = async (value) => {
    if (value === -1 && item.quantity === 1) {
      handleRemoveCartItem();
      return;
    }

    try {
      await dispatch(
        updateCartItem({
          cartItemId: item.cartItemId,
          quantity: item.quantity + value,
          token: auth.token || token,
        })
      );

      await dispatch(findCart(token));
      toast.success(
        value === 1 ? "Item quantity increased!" : "Item quantity decreased!"
      );
    } catch (error) {
      toast.error("Failed to update item quantity. Please try again.");
    }
  };

  const handleRemoveCartItem = () => {
    dispatch(
      removeCartItem({
        cartItemId: item.cartItemId,
        token: auth.token || token,
      })
    );
    toast.success("Item removed from cart!");
  };

  return (
    <div className="cart-item">
      <div className="cart-item-close">
        <IconButton onClick={handleRemoveCartItem} className="close-btn">
          <CloseIcon />
        </IconButton>
      </div>

      <div className="cart-item-details">
        <img src={item.food.images[0]} alt={item.food.name} />
        <div>
          <p>{item.food.name}</p>
          <div className="cart-item-actions">
            <IconButton
              className="icon-btn"
              onClick={() => handleUpdateCartItem(-1)}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
            <span>{item.quantity}</span>
            <IconButton
              className="icon-btn"
              onClick={() => handleUpdateCartItem(1)}
            >
              <AddCircleIcon />
            </IconButton>
          </div>
        </div>
        <div className="cart-item-price">₹{item.totalPrice}</div>
      </div>
      <div className="cart-item-ingredients">
        {item.ingredients.map((ingredient) => (
          <Chip
            label={ingredient}
            key={ingredient}
            className="chip"
            color="primary"
          />
        ))}
      </div>
    </div>
  );
};

export default CartItem;
