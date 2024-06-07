// import {useState } from 'react';
import * as React from 'react';
import Select from 'react-select';



const myOptions = [
    { value: ' Trainee Developer', label: 'Trainee Developer'},
    { value: ' Junior Developer', label: 'Junior Developer'},
    { value: ' Senior Developer', label: 'Senior Developer'},
    { value: ' Trainee Tester', label: 'Trainee Tester'},
    { value: ' Market Anyalyst', label: 'Market Anyalyst'},
]

const TestingInReactSelect: React.FC = ()=> {
    return (
        <>
            <h1>Working With ReactSelect</h1>
            <Select options={myOptions}/>
        </>
    )
}
export default TestingInReactSelect;


// // Define the type for the options
// interface OptionType {
//   value: string;
//   label: string;
// }

// const TestingInReactSelect: React.FC = () => {
//   // State to hold the selected option
//   const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

//   // Define options
//   const options: OptionType[] = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
//   ];

//   // Handle change event
//   const handleChange = (option: OptionType | null) => {
//     setSelectedOption(option);
//   };

//   return (
//     <div>
//       <h2>Select your favorite flavor</h2>
//       <Select
//         value={selectedOption}
//         onChange={handleChange}
//         options={options}
//         isClearable
//       />
//       {selectedOption && (
//         <div style={{ marginTop: '10px' }}>
//           <strong>Selected Flavor: </strong>{selectedOption.label}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TestingInReactSelect;



// // TestingInReactSelect.tsx
// import { useState } from 'react';
// import * as React from 'react';
// import Select, { components } from 'react-select';

// interface OptionType {
//   value: string;
//   label: string;
// }

// const CustomOption: React.FC<any> = (props) => {
//   return (
//     <components.Option {...props}>
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <span style={{ marginRight: 10 }}>🍦</span>
//         {props.data.label}
//       </div>
//     </components.Option>
//   );
// };

// const CustomSelectComponent: React.FC = () => {
//   const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

//   const options: OptionType[] = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
//   ];

//   return (
//     <div>
//       <h2>Custom Select</h2>
//       <Select
//         value={selectedOption}
//         onChange={setSelectedOption}
//         options={options}
//         components={{ Option: CustomOption }}
//         isClearable
//       />
//       {selectedOption && (
//         <div style={{ marginTop: '10px' }}>
//           <strong>Selected Flavor: </strong>{selectedOption.label}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomSelectComponent;
