import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { categoriseIngredients } from "../components/utils/categoriseIngredients";
import React from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../State/Cart/Action";
import "/styles/MenuCard.css"

function MenuCard({ item, restaurantId }) {
  const [selectedIngredients, setSelectedIngredients] = React.useState([]);
  const dispatch = useDispatch();

  const handleCheckboxChange = (itemName) => {
    console.log("itemName", itemName);
    if (selectedIngredients.includes(itemName)) {
      setSelectedIngredients(
        selectedIngredients.filter((item) => item !== itemName)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, itemName]);
    }
  };

  const handleAddItemToCart = (e) => {
    e.preventDefault();
    console.log("selectedIngredients", selectedIngredients);
    const reqData = {
      token: localStorage.getItem("token"),
      foodId: item.foodId,
      quantity: 1,
      ingredients: selectedIngredients,
    };
    dispatch(addItemToCart(reqData, localStorage.getItem("token")));
    console.log("reqData", reqData);
  };
  return (
    <div>
      <Accordion
        sx={{
          backgroundColor: "black",
          color: "white",
          "& .MuiAccordionSummary-content": {
            color: "white",
          },
          "& .MuiAccordionDetails-root": {
            backgroundColor: "black",
            color: "white",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="lg:flex items-center justify-between">
            <div className="lg:flex items-center lg:gap-5">
              <img
                className="w-[7rem] h-[7rem] object-cover"
                src={item?.images}
                alt=""
              />
            </div>
            <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
              <p className="fony-semibold text-xl">{item?.name}</p>
              <p className="text-white">₹ {item?.price}</p>
              <p className="text-gray-400">{item?.description}</p>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleAddItemToCart}>
            <div className="flex gap-5 flex-wrap bg-green-900">
              {Object.keys(categoriseIngredients(item?.ingredients)).map(
                (category) => {
                  return (
                    <div>
                      <p>{category}</p>
                      <FormGroup>
                        {categoriseIngredients(item?.ingredients)[category].map(
                          (item) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={() =>
                                    handleCheckboxChange(item.name)
                                  }
                                />
                              }
                              label={item.name}
                              key={item.name}
                            />
                          )
                        )}
                      </FormGroup>
                    </div>
                  );
                }
              )}
            </div>
            <div className="pt-5">
              <Button variant="contained" disabled={false} type="submit">
                {true ? "Add to Cart" : "Out of stock"}
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default MenuCard;
