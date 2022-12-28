$(document).ready( function () {
  
  // user form
  let paidCheckbox = $("#full-paid")
  let lastOutstandings = $("#last-outstandings")
  let paid =  $("#paid")

    $("#loader").hide();
    $('#user-table').DataTable();
    $("#transaction-table").DataTable({
      columnDefs: [
        {
            searchable: false,
            orderable: false,
            targets: 5,
        },
    ],
    order: [],
});

    $("#name-dropdown").select2({
      placeholder: "Select a customer",
    })

    $("#categories-dropdown").select2({
      placeholder: "Category",
    })

    paidCheckbox.change(()=>{
      let hasPaid = paidCheckbox.is(":checked")
      let lastOutstandingsVal = lastOutstandings.val()
      let paidVal = $("#paid").val()

      if(hasPaid){
        paid.val(lastOutstandingsVal)
        lastOutstandings.val("0.0")
      }else{
        lastOutstandings.val(paidVal)
        paid.val("0.0")
      }
    })

    lastOutstandings.change(()=>{
      paidCheckbox.prop("checked", false)
      paid.val("0.0")
    })

    paid.change(()=>{
      let diff = 0
      let paidVal = Number(paid.val())
      let lastOutstandingsVal = Number(lastOutstandings.val())
      diff = lastOutstandingsVal - paidVal
      if(diff > 0){
        lastOutstandings.val(diff.toFixed(3))
      }else{
        paid.val(0.0)
        alert("Last outstandings can not be negative!")
        //cannot store negative number
      }
    })

    $("#gross-weight").change(()=>{
      setNetWeight()
    })
    $("#less-weight").change(()=>{
      setNetWeight()
    })
    $("#tunch").change(()=>{
      let tunchVal = $("#tunch").val()
      let itemVal = $("#item").val().split(" ").pop()
      console.log(itemVal);
      itemVal = `${tunchVal} ${itemVal}`
      $("#item").val(itemVal)
      setFineWeight()
    })
    $("#wastage").change(()=>{
      setFineWeight()
    })

    $("#add-item-element").click((e)=>{
      e.preventDefault();
      $("#all-items").append()
    });

} );

const populateContact = (contact) =>{
  $("#contact").val(contact)
}

const setNetWeight = () =>{
  let grossWeight = Number($("#gross-weight").val())
  let lessWeight = Number($("#less-weight").val())
  let netWeight = grossWeight - lessWeight

  if(netWeight >= 0){
    $("#net-weight").val(netWeight.toFixed(3))
  }else{
    $("#net-weight").val(0.0)
    $("#gross-weight").val("")
    $("#less-weight").val("")
    alert("Net Weight can not be NEGATIVE!")
  }
}

const setFineWeight = () =>{

  let tunch = Number($("#tunch").val())
  let wastage = Number($("#wastage").val())
  let netWeight = Number($("#net-weight").val())
  let fineWeight = (netWeight * (tunch + wastage ))/100
  fineWeight = fineWeight.toFixed(3)

  $("#fine-weight").val(fineWeight)
}

const resetItemData = () =>{
  $("#net-weight").val()
}