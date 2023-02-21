import { store } from "../redux/store";

export default function checkPermission(name) {
  const permissions = store.getState().auth?.userPermissions;
  let newArray = permissions.filter((value) => value.name == name);
  if (newArray.length) {
    return true;
  } else {
    return false;
  }
}