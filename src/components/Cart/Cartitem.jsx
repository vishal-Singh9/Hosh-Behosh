import { Chip, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCartItem, updateCartItem } from "../../State/Cart/Action";

const Cartitem = ({item}) => {
  console.log(item,"items")

  const {auth,cart} = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleUpdateCartItem = (value) => {
    if (value === -1 && item.quantity === 1) {
      handleRemoveCartItem();
    }
    const data = { cartItemId: item._id, quantity: item.quantity+value };
dispatch(updateCartItem({data,token:auth.token || token}))
  
  };
const handleRemoveCartItem = () => {
 dispatch(removeCartItem({cartItemId:item._id,token:auth.token || token}))


  };

  return (
    <div className="px-5 ">
      <div className="lg:flex items-center lg:space-x-5">
        <div>
          <img
            className="w-[5rem] h-[5rem] object-cover"
            src={item.food.images[0]}
            alt=""
          />
        </div>
        <div className="flex items-center justify-between lg:w-[70%]">
          <div className="space-y-1 lg:space-y-3 w-full">
            <p>{item.food.name}</p>
            <div className="flex items-center space-x-1">
              <IconButton onClick={() => handleUpdateCartItem(-1)}>
                <RemoveCircleOutlineIcon />
              </IconButton>
              <div className="w-5 h-5 text-xs flex items-center justify-center  ">
                {item.quantity}
              </div>
              <IconButton>
                <AddCircleIcon onClick={() => handleUpdateCartItem(1)}/>
              </IconButton>
            </div>
            <div className="flex justify-between items-center"></div>
          </div>
          <p>₹{item.totalPrice}</p>
        </div>
      </div>
      <div className="pt-3 space-x-2">
        {item.ingredients.map((ingredients) => (
          <Chip label={ingredients} key={ingredients} color="primary" />
        ))}
      </div>
    </div>
  );
};

export default Cartitem;