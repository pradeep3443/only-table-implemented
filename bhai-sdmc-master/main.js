$(document).ready(function () {
  $("#loader").hide();

  $("#name-dropdown").select2({
    placeholder: "Select a customer",
  });

  $("#categories-dropdown").select2({
    placeholder: "Category",
  });

  $("#gross-weight").change(() => {
    setNetWeight();
  });
  $("#less-weight").change(() => {
    setNetWeight();
  });
  $("#tunch").change(() => {
    let tunchVal = $("#tunch").val();
    let itemVal = $("#item").val().split(" ").pop();
    // console.log(itemVal);
    itemVal = `${tunchVal} ${itemVal}`;
    $("#item").val(itemVal);
    setFineWeight();
  });
  $("#wastage").change(() => {
    setFineWeight();
  });

  $("#add-item-element").click((e) => {
    e.preventDefault();
    console.log("Add Item Element Click")
    console.log("On clicking this item should be appended to the table.")    
  });
});

const populateContact = (contact) => {
  $("#contact").val(contact);

};

const setNetWeight = () => {
  let grossWeight = Number($("#gross-weight").val());
  let lessWeight = Number($("#less-weight").val());
  let netWeight = grossWeight - lessWeight;

  if (netWeight >= 0) {
    $("#net-weight").val(netWeight.toFixed(3));
  } else {
    $("#net-weight").val(0.0);
    $("#gross-weight").val("");
    $("#less-weight").val("");
    alert("Net Weight can not be NEGATIVE!");
  }
};

const setFineWeight = () => {
  let tunch = Number($("#tunch").val());
  let wastage = Number($("#wastage").val());
  let netWeight = Number($("#net-weight").val());
  let fineWeight = (netWeight * (tunch + wastage)) / 100;
  fineWeight = fineWeight.toFixed(3);

  $("#fine-weight").val(fineWeight);
};


const resetItemData = () => {
  // reset item data here
  // call this function on clicking add Item.
  

};

//hide the table unless item is added
const targetDiv = document.getElementById('item-table');
const btn = document.getElementById("add-item-element");
btn.onclick = function () {
    targetDiv.style.display = "none"; 
};
