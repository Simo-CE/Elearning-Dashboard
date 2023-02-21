
 function formDataConverter (values) {
  let formData = new FormData();
  for (const field in values) {
    if (field == "image" && values[field]==null) {
       formData.append(field,"");
    }else if(field == "icon" && values[field]==null){
      formData.append(field,"");
    }else if (values[field]){
      formData.append(field, values[field]);
    }
   
  }

  return formData;
  
}

export default formDataConverter