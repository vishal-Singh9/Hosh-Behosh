import { Chip, IconButton } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCartItem, updateCartItem } from "../../State/Cart/Action";
import "/Users/indianic/Desktop/Swimmy/styles/CartItem.css";

const Cartitem = ({ item }) => {
  const { auth, cart } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleUpdateCartItem = (value) => {
    if (value === -1 && item.quantity === 1) {
      handleRemoveCartItem(); 
    } else {
      dispatch(updateCartItem({
        cartItemId: item.cartItemId, 
        quantity: item.quantity + value, 
        token: auth.token || token, 
      }));
    }
  };
  
  const handleRemoveCartItem = () => {
    dispatch(removeCartItem({ cartItemId: item.id, token: auth.token || token }));
  };

  return (
    <div className="cart-item">
      <div className="cart-item-details">
        <img src={item.food.images[0]} alt={item.food.name} />
        <div>
          <p>{item.food.name}</p>
          <div className="cart-item-actions">
            <IconButton className="icon-btn" onClick={() => handleUpdateCartItem(-1)}>
              <RemoveCircleOutlineIcon />
            </IconButton>
            <span>{item.quantity}</span>
            <IconButton className="icon-btn" onClick={() => handleUpdateCartItem(1)}>
              <AddCircleIcon />
            </IconButton>
          </div>
        </div>
        <div className="cart-item-price">₹{item.totalPrice}</div>
      </div>
      <div className="cart-item-ingredients">
        {item.ingredients.map((ingredient) => (
          <Chip label={ingredient} key={ingredient} className="chip" color="primary" />
        ))}
      </div>
    </div>
  );
};

export default Cartitem;
