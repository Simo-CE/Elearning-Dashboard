// import React, {useEffect} from 'react';
// import BootstrapSelect from 'react-bootstrap-select-dropdown';
// import "./BootstrapSearchable.css";

// const SearchableDropdown = ({placeholder="Search", selectedValue=1}) => {

//     const handleChange = (selectedOptions) => {
//        
//     }
//     const options = [
//         {
            
//             "value": "French New",
//             "labelKey": "1",
//             "abbrevation": "fr",
            
//             "language_direction": 0,
//             "status": 1,
//             "flag_icon": "http://safetyapis.safetytracker.be/public/storage/images/language/notfound.png",
//             "created_at": "2022-06-11T21:56:38.000000Z",
//             "default_language": 0
//         },
//         {
//             "value": "Arabic",
//             "labelKey": "6",
//             "abbrevation": "ar",
//             "language_direction": 0,
//             "status": 1,
//             "flag_icon": "http://safetyapis.safetytracker.be/public/storage/images/language/notfound.png",
//             "created_at": "2022-06-11T21:56:37.000000Z",
//             "default_language": 0
//         },
//         {
//             "labelKey": "",
//             "value": "Select age"

//         },
//         {
//             "labelKey": "",
//             "value": "Option item 1"
//         },
//         {
//             "isSelected":true,
//             "labelKey": "",
//             "value": "Option item 2"
//         }
//     ]
//     let findSelectedValue = () => {
//       let data = [...options]
//       // options.map(data => Object.assign({},data,"isSelected": false))
//       return data
//     };
//     // useEffect(() => {
//     //     findSelectedValue();
//     // }, [])
    

//     return (
//         <>
//           <Searchable
//     value=""
//     placeholder="Search" 
//     hideSelected
//     notFoundText="No result found" 
    
//     options={[
//         {
//         value: 'all',
//         label: 'All'
//     }, {
//         value: 'popular',
//         label: 'Popular'
//     },
//     {
//         value: 1,
//         label: 'French New',
//         },
//         {
//             value: 3,
//             label: "Arabic",
           
//                },

//               { value: 16,
//                label: "German",
//                 "abbrevation": "ger",
//                 "language_direction": 0,
//                 "status": 1,
//                 "flag_icon": "http://safetyapis.safetytracker.be/public/storage/images/language/german1655038832.jpg",
//                 "created_at": "2022-06-12T13:00:32.000000Z",
//                 "default_language": 0},
//         ]}
//     onSelect={value => {

//     }}
//     listMaxHeight={200} 
// />
//         </>
//     )
// }

// export default SearchableDropdown;