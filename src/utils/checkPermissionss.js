import { store } from "../redux/store";
export default function checkPermission2(name){
  const permissions = store.getState().auth?.userPermissions;
  //name = name.replace(/ /g, '')
  let newArray = permissions.filter((value) => value.main_group.replace(/ /g, '') == name);
  if (newArray.length) {
    return true;
  } else {
    return false;
  }
}


