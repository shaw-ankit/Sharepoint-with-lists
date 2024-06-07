// import * as React from "react";
// import { sp, Web } from "@pnp/sp/presets/all";
// import {
//   DetailsList,
//   DetailsListLayoutMode,
//   Dropdown,
//   IDropdownOption,
//   Label,
//   Modal,
//   NormalPeoplePicker,
//   Pivot,
//   PivotItem,
//   getTheme,
// } from "@fluentui/react";
// import { WebPartContext } from "@microsoft/sp-webpart-base";
// import {
//   IPersonaProps,
//   Persona,
//   PersonaSize,
// } from "@fluentui/react/lib/Persona";
// import swal from "sweetalert";
// import { IIconProps } from "office-ui-fabric-react";

// import { Stack } from "office-ui-fabric-react/lib/Stack";
// import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
// import { TextField } from "office-ui-fabric-react/lib/TextField";
// import { IconButton } from "office-ui-fabric-react/lib/Button";
// import { SelectionMode } from "office-ui-fabric-react";

// interface IItem {
//   Title: string;
//   EmployeeName?: string;
//   selectedPerson?: IPersonaProps | null;
//   Address: string;
//   Role?: string;
//   ID: number; // Add ID to IItem interface
// }

// interface IMyAppProps {
//   webUrl: string;
//   context: WebPartContext;
// }

// const statusOptions: IDropdownOption[] = [
//   { key: "Developer", text: "Developer" },
//   { key: "Testing", text: "Testing" },
//   { key: "Intern", text: "Intern" },
// ];

// const CubicLogic: React.FC<IMyAppProps> = ({ context, webUrl }) => {
//   const Web1 = Web(webUrl);

//   const [listData, setListData] = React.useState<any[]>([]);
//   const [filteredData, setFilteredData] = React.useState<any[]>([]);
//   const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
//   const [isAddUpdate, setIsAddUpdate] = React.useState<boolean>(false);
//   const [isMyItemId, setIsMyItemId] = React.useState<number>(0);
//   const [inputData, setInputData] = React.useState<Partial<IItem>>({
//     Title: "",
//     EmployeeName: "",
//     selectedPerson: null,
//     Address: "",
//     Role: "",
//   });

//   const getUsers = async () => {
//     try {
//       const res = await sp.web.siteUsers.get();
//       const res2 = await Web1.siteUsers.get();

//       console.log("res---->", res);
//       console.log("res2---->", res2);

//       const suggestions = res.map((user) => ({
//         text: user.Title,
//         secondaryText: user.Email,
//         tertiaryText: user.Id.toString(),
//       }));
//       return suggestions;
//     } catch (error) {
//       console.log("error---->", error);
//       return [];
//     }
//   };

//   const getDataFromList = async () => {
//     try {
//       const res = await sp.web.lists
//         .getByTitle("AnkitExperiment")
//         .items.select(
//           "*,selectedPerson/Title,selectedPerson/EMail,selectedPerson/ID"
//         )
//         .expand("selectedPerson/ID")
//         .get();

//       console.log("Fetched Items:", res);
//       setListData(res);
//       setFilteredData(res);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       await swal("Something Went Wrong", "Check Into the console", "error");
//     }
//   };

//   const validateForm = async () => {
//     if (
//       !inputData.Title ||
//       !inputData.EmployeeName ||
//       !inputData.selectedPerson ||
//       !inputData.Role ||
//       !inputData.Address
//     ) {
//         await swal("Validation Error", "All fields are required", "error");
//       setIsModalOpen(false);
//       return false;
//     }
//     return true;
//   };

//   const insertDataIntoList = async () => {
//     if (!validateForm()) {
//       return;
//     }
//     try {
//       const res = await Web1.lists.getByTitle("AnkitExperiment").items.add({
//         Title: inputData.Title,
//         EmployeeName: inputData.EmployeeName,
//         selectedPersonStringId:
//           inputData?.selectedPerson?.tertiaryText?.toString(),
//         Address: inputData.Address,
//         Role: inputData.Role,
//       });
//       console.log("insert data clg--->", res);
//       if (res.data) {
//         setInputData({
//           Title: "",
//           EmployeeName: "",
//           selectedPerson: null,
//           Address: "",
//           Role: "",
//         });
//         setIsModalOpen(false);
//         await swal("Success", "Data inserted successfully", "success");
//         await getDataFromList();
//       }
//     } catch (error) {
//       console.error("Error inserting data:", error);
//       await swal("Error", "Error inserting data", "error");
//     }
//   };

//   const openAddModal = () => {
//     setInputData({
//       Title: "",
//       EmployeeName: "",
//       selectedPerson: null,
//       Address: "",
//       Role: "",
//     });
//     setIsModalOpen(true);
//   };

//   const filterDataByRole = (props: string) => {
//     let temp;
//     switch (props) {
//       case "All Employee":
//         setFilteredData(listData);
//         break;
//       case "Developer Team":
//         temp = listData.filter((item) => item.Role === "Developer");
//         setFilteredData(temp);
//         break;
//       case "Testing Team":
//         temp = listData.filter((item) => item.Role === "Testing");
//         setFilteredData(temp);
//         break;
//       case "Intern":
//         temp = listData.filter((item) => item.Role === "Intern");
//         setFilteredData(temp);
//         break;
//       default:
//         break;
//     }
//   };

//   const theme = getTheme();
//   const cancelIcon: IIconProps = { iconName: "Cancel" };

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const myval = event.target.value.toLowerCase();
//     if (!myval.trim()) {
//       setFilteredData(listData);
//       return;
//     }
//     const temp = listData.filter((item) => {
//       for (const key in item) {
//         if (
//           item[key] &&
//           item[key].toString().toLowerCase().includes(myval.toLowerCase())
//         ) {
//           return true;
//         }
//       }
//       return false;
//     });
//     setFilteredData(temp);
//   };

//   React.useEffect(() => {
//     getDataFromList()!;
//   }, []);

//   const picker = React.useRef(null);

//   const handleUpdate = (item: IItem) => {
//     // console.log("myitem---->",inputData.selectedPerson);
//     setIsModalOpen(true);
//     setIsAddUpdate(true);
//     setInputData(item);
//     // setInputData({
//     //   Title: "",
//     //       EmployeeName: "",
//     //       selectedPerson: null,
//     //       Address: "",
//     //       Role: "",
//     // });
//     setIsMyItemId(item.ID);
//   };

//   const UpdateDataItem = async (id: number) => {
//     // if (!validateForm()) {
//     //   return;
//     // }
//     try {
//       const myres = await sp.web.lists.getByTitle("AnkitExperiment").items.getById(id).update({
//         Title: inputData.Title,
//         EmployeeName: inputData.EmployeeName,
//         PeoplePickerImageStringId:
//           inputData?.selectedPerson?.tertiaryText?.toString(),
//         Address: inputData.Address,
//         Role: inputData.Role,
//       });
//       console.log("myresult---->",myres);

//       setInputData({
//         Title: "",
//         EmployeeName: "",
//         selectedPerson: null,
//         Address: "",
//         Role: "",
//       });
//       setIsModalOpen(false);
//       setIsAddUpdate(false);
//       await swal("Hurray!!", "Updated Successfully","success");
//       await getDataFromList();
//     } catch (error) {
//       setIsModalOpen(false);
//       console.log("Error updating Data");
//       await swal("Error", "Error updating Data", "error");
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//        await sp.web.lists
//         .getByTitle("PracticeList")
//         .items.getById(id)
//         .delete();
//         setListData(listData.filter((item) => item.ID !== id));
//       await swal({
//         title: "Data!",
//         text: "Successfully Deleted Data!",
//         icon: "success",
//       });
//     } catch (error) {
//       console.log("Error in Deleting",error);
//       await swal("Error", "Error in Deleting","error");
//     }
//   };

//   const columns = [
//     // {
//     //   key: "Id",
//     //   name: "Sl.No",
//     //   fieldName: "ID",
//     //   minWidth: 50,
//     //   maxWidth: 50,
//     // },
//     {
//       key: "Title",
//       name: "Title",
//       fieldName: "Title",
//       minWidth: 100,
//       maxWidth: 150,
//     },
//     {
//       key: "People",
//       name: "EmployeeName",
//       fieldName: "EmployeeName",
//       minWidth: 50,
//       maxWidth: 100,
//     },
//     {
//       key: "selectedPerson",
//       name: "selectedPerson",
//       fieldName: "selectedPerson",
//       minWidth: 50,
//       maxWidth: 200,
//       onRender: (item: any) => (
//         <div>
//           {item.selectedPerson && item.selectedPerson.Title ? (
//             <Persona
//               text={item.selectedPerson.Title}
//               size={PersonaSize.size48}
//               secondaryText={item.Title}
//             />
//           ) : (
//             "No person selected"
//           )}
//           {/* {item.selectedPerson && item.selectedPerson.Title ? (
//             <span>{item.selectedPerson.Title}</span>
//           ) : (
//             "No person selected"
//           )} */}
//         </div>
//       ),
//     },
//     {
//       key: "Role",
//       name: "Role",
//       fieldName: "Role",
//       minWidth: 50,
//       maxWidth: 100,
//     },
//     {
//       key: "Address",
//       name: "Address",
//       fieldName: "Address",
//       minWidth: 50,
//       maxWidth: 100,
//     },
//     {
//       key: "action",
//       name: "Actions",
//       fieldName: "action",
//       minWidth: 50,
//       maxWidth: 100,
//       onRender: (item: IItem) => (
//         <div>
//           <IconButton
//             iconProps={{ iconName: "Edit" }}
//             onClick={() => handleUpdate(item)}
//           />
//           <IconButton
//             iconProps={{ iconName: "Delete" }}
//             onClick={() => handleDelete(item.ID)}
//           />
//         </div>
//       ),
//     },
//   ];

//   const myDetailList = () => {
//     return (
//       <DetailsList
//         items={filteredData}
//         columns={columns}
//         setKey="set"
//         layoutMode={DetailsListLayoutMode.fixedColumns}
//         selectionMode={SelectionMode.none}
//       />
//     );
//   };

//   return (
//     <>
//       <h1 style={{ textAlign: "center" }}>Cubic Logics</h1>

//       <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
//         <PrimaryButton text="Add Data" onClick={openAddModal} />
//         <Stack horizontal verticalAlign="center" style={{ width: "500px" }}>
//           <TextField
//             type="text"
//             placeholder="Search..."
//             onChange={handleChange}
//             styles={{ fieldGroup: { width: "200%" } }}
//           />
//           <IconButton
//             iconProps={{ iconName: "Search" }}
//             style={{ marginLeft: "150px" }}
//           />
//         </Stack>
//       </Stack>
//       <Pivot
//         onLinkClick={(item?: PivotItem) => {
//           if (item) {
//             filterDataByRole(item.props.headerText || "");
//           }
//         }}
//       >
//         <PivotItem headerText="All Employee">{myDetailList()}</PivotItem>
//         <PivotItem headerText="Developer Team">{myDetailList()}</PivotItem>
//         <PivotItem headerText="Testing Team">{myDetailList()}</PivotItem>
//         <PivotItem headerText="Intern">{myDetailList()}</PivotItem>
//       </Pivot>

//       <Modal isOpen={isModalOpen} onDismiss={() => setIsModalOpen(false)}>
//         <div style={{ padding: "20px", maxWidth: 400 }}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <span>{isAddUpdate ? "Update Employee" : "Add Employee"}</span>
//             <IconButton
//               styles={{
//                 root: {
//                   color: theme.palette.neutralPrimary,
//                 },
//                 rootHovered: {
//                   color: theme.palette.neutralDark,
//                 },
//               }}
//               iconProps={cancelIcon}
//               ariaLabel="Close popup modal"
//               onClick={() => setIsModalOpen(false)}
//             />
//           </div>
//           <TextField
//             className="input"
//             placeholder="Enter Title here"
//             label="Title"
//             required
//             value={inputData.Title}
//             onChange={(_ev, newVal) =>
//               setInputData((prev) => ({ ...prev, Title: newVal || "" }))
//             }
//             styles={{ root: { marginBottom: 10 } }}
//           />
//           <TextField
//             className="input"
//             placeholder="Enter EmployeeName here"
//             label="EmployeeName"
//             value={inputData.EmployeeName}
//             onChange={(_ev, newVal) =>
//               setInputData((prev) => ({ ...prev, EmployeeName: newVal || "" }))
//             }
//             styles={{ root: { marginBottom: 10 } }}
//           />
//           <TextField
//             className="input"
//             placeholder="Enter your Address"
//             label="Address"
//             value={inputData.Address}
//             onChange={(_ev, newVal) =>
//               setInputData((prev) => ({ ...prev, Address: newVal || "" }))
//             }
//             styles={{ root: { marginBottom: 10 } }}
//           />
//           <Dropdown
//             className="input"
//             placeholder="Select a status"
//             label="Role"
//             required
//             options={statusOptions}
//             selectedKey={inputData.Role}
//             onChange={(_ev, option) =>
//               setInputData((prev) => ({
//                 ...prev,
//                 Role: option?.key as string,
//               }))
//             }
//           />
//           <Label> People Picker</Label>
//           <NormalPeoplePicker
//             onResolveSuggestions={getUsers}
//             className={"ms-PeoplePicker"}
//             key={"normal"}
//             componentRef={picker}
//             resolveDelay={300}
//             onChange={(item) => {
//               console.log("selected", item);
//               setInputData((c: IItem) => ({
//                 ...c,
//                 selectedPerson: item && item[0],
//               }));
//             }}
//             styles={{ root: { marginBottom: 20 } }}
//           />
//              <PrimaryButton
//             className="btn"
//             onClick={
//               isAddUpdate
//                 ? () => UpdateDataItem(isMyItemId)
//                 : () => insertDataIntoList()
//             }
//           >
//             {isAddUpdate ? "Update" : "Add"}
//           </PrimaryButton>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default CubicLogic;

import * as React from "react";
import { sp, Web } from "@pnp/sp/presets/all";
import {
  DetailsListLayoutMode,
  Dropdown,
  IDropdownOption,
  Label,
  Panel,
  PanelType,
  NormalPeoplePicker,
  Pivot,
  PivotItem,
  // getTheme,
  // IIconProps,
} from "@fluentui/react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import {
  // IPersonaProps,
  Persona,
  PersonaSize,
} from "@fluentui/react/lib/Persona";
import swal from "sweetalert";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { DetailsList, IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { SelectionMode } from "office-ui-fabric-react";
import Select, { StylesConfig, components } from "react-select";
import Swal from "sweetalert2";

// interface IPeopleImage {
//   Title: string;
//   EMail: string;
//   ID: number;
// }

interface IItem {
  Title?: any;
  EmployeeName?: string;
  Address: string;
  Role?: string;
  ID: number;
  Manager: {
    Title: string;
    Email: string;
    ID: number;
  } | null;
  Passion: string,
}

interface IMyAppProps {
  webUrl: string;
  context: WebPartContext;
}

const statusOptions: IDropdownOption[] = [
  { key: "Developer", text: "Developer" },
  { key: "Testing", text: "Testing" },
  { key: "Intern", text: "Intern" },
  { key: "HR", text: "HR" },
  { key: "Others", text: "Others" },
];

interface Option {
  value: string;
  label: string;
}
const passionOptions= [
  { value: "Photography" , label: "Photography"},
  { value: "Blogging" , label: "Blogging"},
  { value: "Video game" , label: "Video game"},
  { value: "Writing" , label: "Writing"},
  { value: "Drawing" , label: "Drawing"},
  { value: "Dance" , label: "Dance"},
  { value: "Reading" , label: "Reading"},
  { value: "Gardening" , label: "Gardening"},
  { value: "Yoga" , label: "Yoga"},
  { value: "Sports" , label: "Sports"},
  { value: "Travel" , label: "Travel"},
  { value: "Cooking" , label: "Cooking"},
  { value: "Hiking" , label: "Hiking"},
  { value: "Music" , label: "Music"},
  { value: "Singing" , label: "Singing"},
  { value: "Chess" , label: "Chess"},
  { value: "Cricket" , label: "Cricket"},
  { value: "Coding" , label: "Coding"},
]
// styles={{
//   root:{
//     width:560;
//   }
// }}
const myTitleOptions: Option[] = [
  { value: "Trainee Developer", label: "Trainee Developer" },
  { value: "Junior Developer", label: "Junior Developer" },
  { value: "Senior Developer", label: "Senior Developer" },
  { value: "Junior Tester", label: "Junior Tester" },
  { value: "Senior Tester", label: "Senior Tester" },
  { value: "Marketing Analyst", label: "Marketing Analyst" },
  { value: "Digital Marketing", label: "Digital Marketing" },
  { value: "Sales Manager", label: "Sales Manager" },
  { value: "Reporting Manager", label: "Reporting Manager" },
  { value: "Team Lead", label: "Team Lead" },
  { value: "HR", label: "HR" },
];

const CubicLogic: React.FC<IMyAppProps> = ({ context, webUrl }) => {
  const Web1 = Web(webUrl);

  const [listData, setListData] = React.useState<any[]>([]);
  const [filteredData, setFilteredData] = React.useState<any[]>([]);
  const [isPanelOpen, setIsPanelOpen] = React.useState<boolean>(false);
  const [isAddUpdate, setIsAddUpdate] = React.useState<boolean>(false);
  const [isMyItemId, setIsMyItemId] = React.useState<number>(0);
  const [inputData, setInputData] = React.useState<Partial<IItem>>({
    Title: "",
    EmployeeName: "",
    Manager: null,
    Address: "",
    Role: "",
    Passion: "",
    // PeopleImage: undefined,
  });

  const getUsers = async () => {
    try {
      const res = await sp.web.siteUsers.get();
      const res2 = await Web1.siteUsers.get();
      console.log(res2);

      const suggestions = res.map((user) => ({
        text: user.Title,
        secondaryText: user.Email,
        tertiaryText: user.Id.toString(),
        imageUrl:`/_layouts/15/userphoto.aspx?size=S&accountname=${user.Email}`,
      }));
      return suggestions;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  const getDataFromList = async () => {
    try {
      const res = await sp.web.lists
        .getByTitle("AnkitExperiment")
        .items.select("*,Manager/Title,Manager/EMail,Manager/ID")
        .expand("Manager")
        .get();

      setListData(res);
      setFilteredData(res);
    } catch (error) {
      console.error("Error fetching data:", error);
      await swal("Something Went Wrong", "Check the console", "error");
    }
  };

  const handleSelectChange = (selectedOption: Option | null) => {
    setInputData((prev) => ({
      ...prev,
      Title: selectedOption ? selectedOption.value : "",
    }));
  };

  // Function to get the selected option based on the current value
  const getSelectedOption = (value: string): Option | null => {
    // for (let i = 0; i < myTitleOptions.length; i++) {
    //   if (myTitleOptions[i].value === value) {
    //     return myTitleOptions[i];
    //   }
    // }
    // return null;
    let selectedOption: Option | null = null;
    myTitleOptions.map((option) => {
      if (option.value === value) {
        selectedOption = option;
      }
    });
    return selectedOption;
  };

  // for the Animation of the reactSelect
  // Custom styles for react-select
  const customStyles: StylesConfig<Option, false> = {
    container: (base) => ({
      ...base,
      marginBottom: 10,
      transition: "all 0.3s ease",
    }),
    control: (base) => ({
      ...base,
      transition: "all 0.3s ease",
    }),
    menu: (base) => ({
      ...base,
      animation: "fadeIn 0.3s ease",
    }),
    option: (base, state) => ({
      ...base,
      transition: "all 0.2s ease",
      backgroundColor: state.isSelected ? "#f0f0f0" : base.backgroundColor,
      "&:hover": {
        backgroundColor: "#e0e0e0",
      },
    }),
  };

  const validateForm = async () => {
    if (
      !inputData.Title ||
      !inputData.EmployeeName ||
      !inputData.Manager ||
      !inputData.Role ||
      !inputData.Address ||
      !inputData.Passion
    ) {
      setIsPanelOpen(false);
      void swal("Validation Error", "All fields are required", "error");
      console.log("Validation data -------: " ,inputData );
      
      return false;
    }
    return true;
  };

  const resetInputData = () => {
    setInputData({
      Title: "",
      EmployeeName: "",
      Manager: null,
      Address: "",
      Role: "",
      Passion: "",
      // PeopleImage: undefined,
    });
  };

  const insertDataIntoList = async () => {
    if (!(await validateForm())) {
      return;
    }
    try {
      const managerId = inputData.Manager ? inputData.Manager.ID : 0;
      const res = await Web1.lists.getByTitle("AnkitExperiment").items.add({
        Title: inputData.Title,
        EmployeeName: inputData.EmployeeName,
        // ManagerStringId: inputData?.Manager?.tertiaryText?.toString(),
        ManagerStringId: managerId.toString(),
        Address: inputData.Address,
        Role: inputData.Role,
        Passion: inputData.Passion,
      });
        console.log("checking whether the result is coming or not -----: ",res);
        
      if (res.data) {
        resetInputData();
        setIsPanelOpen(false);
        void Swal.fire("Success", "Data inserted successfully", "success");
        await getDataFromList();
      }
    } catch (error) {
      console.error("Error inserting data:", error);
      void swal("Error", "Error inserting data", "error");
    }
  };

  const openAddPanel = () => {
    resetInputData();
    setIsPanelOpen(true);
    setIsAddUpdate(false);
  };

  const filterDataByRole = (role: string) => {
    if (role === "All Employee") {
      setFilteredData(listData);
    } else {
      const filtered = listData.filter((item) => item.Role === role);
      setFilteredData(filtered);
    }
  };

  // const theme = getTheme();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    if (!value.trim()) {
      setFilteredData(listData);
      return;
    }
    const filtered = listData.filter((item) => {
      for (const key in item) {
        if (
          item[key] &&
          item[key].toString().toLowerCase().includes(value.toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    });
    setFilteredData(filtered);
  };

  React.useEffect(() => {
    void getDataFromList();
  }, []);

  const picker = React.useRef(null);

  const handleUpdate = (item: IItem) => {
    setIsPanelOpen(true);
    setIsAddUpdate(true);
    // setInputData({
    //   ...item,
    //   Manager: item.PeopleImage
    //     ? {
    //         text: item.PeopleImage.Title,
    //         secondaryText: item.PeopleImage.EMail,
    //         tertiaryText: item.PeopleImage.ID.toString(),
    //       }
    //     : null,
    // });
    setInputData(item);
    setIsMyItemId(item.ID);
  };

  const updateDataItem = async (id: number) => {
    if (!(await validateForm())) {
      return;
    }
    try {
      const managerId = inputData.Manager ? inputData.Manager.ID : 0;
      const res = await sp.web.lists
        .getByTitle("AnkitExperiment")
        .items.getById(id)
        .update({
          Title: inputData.Title,
          EmployeeName: inputData.EmployeeName,
          ManagerStringId: managerId.toString(),
          Address: inputData.Address,
          Role: inputData.Role,
          Passion:inputData.Passion,
        });
      console.log("MyResult------: ", res);
      resetInputData();
      setIsAddUpdate(false);
      setIsPanelOpen(false);
      void swal("Updated", "Updated Successfully", "success");
      await getDataFromList();
    } catch (error) {
      console.error("Error updating data:", error);
      await swal("Error", "Error updating data", "error");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await sp.web.lists
        .getByTitle("AnkitExperiment")
        .items.getById(id)
        .delete();
      await getDataFromList();
      swal("Success", "Successfully deleted data", "success")!;
    } catch (error) {
      console.error("Error deleting data:", error);
      await swal("Error", "Error deleting data", "error");
    }
  };

  const columns: IColumn[] = React.useMemo(
    () => [
      {
        key: "Title",
        name: "Title",
        fieldName: "Title",
        minWidth: 50,
        maxWidth: 120,
      },
      {
        key: "EmployeeName",
        name: "Employee Name",
        fieldName: "EmployeeName",
        minWidth: 50,
        maxWidth: 150,
      },
      {
        key: "Manager",
        name: "Manager",
        fieldName: "Manager",
        minWidth: 50,
        maxWidth: 150,
        onRender: (item: any) => (
          <div>
            {item.Manager && item.Manager.Title ? (
              <Persona
                text={item.Manager.Title}
                size={PersonaSize.size48}
                secondaryText={item.Title}
                imageUrl={`/_layouts/15/userphoto.aspx?size=S&accountname=${item.Manager?.EMail}`}
              />
            ) : (
              "No person selected"
            )}
          </div>
        ),
      },
      {
        key: "Role",
        name: "Role",
        fieldName: "Role",
        minWidth: 50,
        maxWidth: 100,
      },
      {
        key: "Address",
        name: "Address",
        fieldName: "Address",
        minWidth: 50,
        maxWidth: 100,
      },
      {
        key : "Passion",
        name: "Passion",
        fieldName : "Passion",
        minWidth:50,
        maxWidth:150,
      },
      {
        key: "Actions",
        name: "Actions",
        fieldName: "Actions",
        minWidth: 50,
        maxWidth: 100,
        onRender: (item: IItem) => (
          <div>
            <IconButton
              iconProps={{ iconName: "Edit" }}
              onClick={() => handleUpdate(item)}
            />
            <IconButton
              iconProps={{ iconName: "Delete" }}
              onClick={() => handleDelete(item.ID)}
            />
          </div>
        ),
      },
    ],
    [handleUpdate, handleDelete]
  );

  const myDetailList = () => (
    <DetailsList
      items={filteredData}
      columns={columns}
      setKey="set"
      layoutMode={DetailsListLayoutMode.fixedColumns}
      selectionMode={SelectionMode.none}
    />
  );

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Cubic Logics</h1>

      <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
        <PrimaryButton text="Insert Data" onClick={openAddPanel} />
        <Stack horizontal verticalAlign="center" style={{ width: "500px" }}>
          <TextField
            type="text"
            placeholder="Search..."
            onChange={handleChange}
            styles={{ fieldGroup: { width: "200%" } }}
          />
          <IconButton
            iconProps={{ iconName: "Search" }}
            style={{ marginLeft: "150px" }}
          />
        </Stack>
      </Stack>
      <Pivot
        onLinkClick={(item?: PivotItem) =>
          filterDataByRole(item?.props.headerText || "")
        }
      >
        <PivotItem headerText="All Employee">{myDetailList()}</PivotItem>
        <PivotItem headerText="Developer">{myDetailList()}</PivotItem>
        <PivotItem headerText="Testing">{myDetailList()}</PivotItem>
        <PivotItem headerText="Intern">{myDetailList()}</PivotItem>
        <PivotItem headerText="HR">{myDetailList()}</PivotItem>
        <PivotItem headerText="Others">{myDetailList()}</PivotItem>
      </Pivot>

      <Panel
        style={{maxHeight:"100%"}}
        isOpen={isPanelOpen}
        onDismiss={() => setIsPanelOpen(false)}
        type={PanelType.medium}
        headerText={isAddUpdate ? "Update Employee" : "Add Employee"}
        // closeButtonAriaLabel="Close"
      >
        {/* <TextField
          className="input"
          placeholder="Enter Title here"
          label="Title"
          required
          value={inputData.Title}
          onChange={(_ev, newVal) => setInputData((prev) => ({ ...prev, Title: newVal || "" }))}
          styles={{ root: { marginBottom: 10 } }}
        /> */}
        <Select
          className="input"
          placeholder="Enter Title here"
          isClearable
          value={getSelectedOption(inputData.Title || "")}
          onChange={handleSelectChange}
          options={myTitleOptions}
          // styles={{ container: (base) => ({ ...base, marginBottom: 10 }) }}
          styles={customStyles}
          components={{
            Menu: (props) => <components.Menu {...props} />,
          }}
        />
        <TextField
          className="input"
          placeholder="Enter Employee Name here"
          label="Employee Name"
          value={inputData.EmployeeName}
          onChange={(_ev, newVal) =>
            setInputData((prev) => ({ ...prev, EmployeeName: newVal || "" }))
          }
          styles={{ root: { marginBottom: 10 } }}
        />
        <TextField
          className="input"
          placeholder="Enter your Address"
          label="Address"
          value={inputData.Address}
          onChange={(_ev, newVal) =>
            setInputData((prev) => ({ ...prev, Address: newVal || "" }))
          }
          styles={{ root: { marginBottom: 10 } }}
        />
        <Dropdown
          className="input"
          placeholder="Select a status"
          label="Role"
          required
          options={statusOptions}
          selectedKey={inputData.Role}
          onChange={(_ev, option) =>
            setInputData((prev) => ({ ...prev, Role: option?.key as string }))
          }
        />
        <Label> People Picker</Label>
        <NormalPeoplePicker
          onResolveSuggestions={getUsers}
          className={"ms-PeoplePicker"}
          key={"normal"}
          resolveDelay={300}
          componentRef={picker}
          onChange={(items) => {
            const selectedPerson = items && items[0] ? items[0] : null;
            setInputData((c) => ({
              ...c,
              Manager: selectedPerson
                ? {
                    Title: selectedPerson.text || "",
                    Email: selectedPerson.secondaryText || "",
                    ID: parseInt(selectedPerson.tertiaryText || "0", 10),
                  }
                : null,
              ManagerId: selectedPerson
                ? parseInt(selectedPerson.tertiaryText || "0", 10)
                : 0,
            }));
          }}
          defaultSelectedItems={
            inputData.Manager
              ? [
                  {
                    text: inputData.Manager.Title,
                    secondaryText: inputData.Manager.Email,
                    tertiaryText: inputData.Manager.ID.toString(),
                  },
                ]
              : []
          }
        />
        <Label>Passion</Label>
        <Select
            options={passionOptions}
            placeholder={"choose Passion"}
            isMulti
            value = {passionOptions.filter(option => inputData.Passion?.includes(option.value))}
            onChange={(item) => {
              const myvalues = item ? item.map(el => el.value) : [];
              setInputData((prev)=>({...prev,Passion:myvalues.join(',')||""}));
            }}
          />
        <PrimaryButton
          style={{marginTop:50}}
          className="btn"
          onClick={
            isAddUpdate
              ? () => updateDataItem(isMyItemId)
              : () => insertDataIntoList()
          }
        >
          {isAddUpdate ? "Update" : "Add"}
        </PrimaryButton>
      </Panel>
    </>
  );
};

export default CubicLogic;

// import * as React from "react";
// import { sp, Web } from "@pnp/sp/presets/all";
// import {
//   DetailsListLayoutMode,
//   Dropdown,
//   IDropdownOption,
//   // Label,
//   Panel,
//   PanelType,
//   NormalPeoplePicker,
//   Pivot,
//   PivotItem,
// } from "@fluentui/react";
// import { WebPartContext } from "@microsoft/sp-webpart-base";
// import {
//   IPersonaProps,
//   Persona,
//   PersonaSize,
// } from "@fluentui/react/lib/Persona";
// import swal from "sweetalert";
// import { Stack } from "office-ui-fabric-react/lib/Stack";
// import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
// import { TextField } from "office-ui-fabric-react/lib/TextField";
// import { IconButton } from "office-ui-fabric-react/lib/Button";
// import { DetailsList, IColumn } from "office-ui-fabric-react/lib/DetailsList";
// import { SelectionMode } from "office-ui-fabric-react";
// import Select, { StylesConfig } from "react-select";

// interface IPeopleImage {
//   Title: string;
//   EMail: string;
//   ID: number;
// }

// interface IItem {
//   Title: any;
//   EmployeeName?: string;
//   Manager?: IPersonaProps | null;
//   Address: string;
//   Role?: string;
//   ID: number;
//   PeopleImage?: IPeopleImage;
// }

// interface IMyAppProps {
//   webUrl: string;
//   context: WebPartContext;
// }

// const statusOptions: IDropdownOption[] = [
//   { key: "Developer", text: "Developer" },
//   { key: "Testing", text: "Testing" },
//   { key: "Intern", text: "Intern" },
// ];

// interface Option {
//   value: string;
//   label: string;
// }

// const myTitleOptions: Option[] = [
//   { value: "Trainee Developer", label: "Trainee Developer" },
//   { value: "Junior Developer", label: "Junior Developer" },
//   { value: "Senior Developer", label: "Senior Developer" },
//   { value: "Junior Tester", label: "Junior Tester" },
//   { value: "Senior Tester", label: "Senior Tester" },
//   { value: "Marketing Analyst", label: "Marketing Analyst" },
//   { value: "Digital Marketing", label: "Digital Marketing" },
//   { value: "Sales Manager", label: "Sales Manager" },
//   { value: "Reporting Manager", label: "Reporting Manager" },
//   { value: "Team Lead", label: "Team Lead" },
//   { value: "HR", label: "HR" },
// ];

// const CubicLogic: React.FC<IMyAppProps> = ({ context, webUrl }) => {
//   const Web1 = Web(webUrl);

//   const [listData, setListData] = React.useState<any[]>([]);
//   const [filteredData, setFilteredData] = React.useState<any[]>([]);
//   const [isPanelOpen, setIsPanelOpen] = React.useState<boolean>(false);
//   const [isAddUpdate, setIsAddUpdate] = React.useState<boolean>(false);
//   const [isMyItemId, setIsMyItemId] = React.useState<number>(0);
//   const [inputData, setInputData] = React.useState<Partial<IItem>>({
//     Title: "",
//     EmployeeName: "",
//     Manager: null,
//     Address: "",
//     Role: "",
//     PeopleImage: undefined,
//   });

//   const getUsers = async () => {
//     try {
//       const res = await sp.web.siteUsers.get();
//       const res2 = await Web1.siteUsers.get();
//       console.log(res2);

//       const suggestions = res.map((user) => ({
//         text: user.Title,
//         secondaryText: user.Email,
//         tertiaryText: user.Id.toString(),
//       }));
//       return suggestions;
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       return [];
//     }
//   };

//   const getDataFromList = async () => {
//     try {
//       const res = await sp.web.lists
//         .getByTitle("AnkitExperiment")
//         .items.select("*,Manager/Title,Manager/EMail,Manager/ID")
//         .expand("Manager/ID")
//         .get();

//       setListData(res);
//       setFilteredData(res);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       await swal("Something Went Wrong", "Check the console", "error");
//     }
//   };

//   const handleSelectChange = (selectedOption: Option | null) => {
//     setInputData((prev) => ({
//       ...prev,
//       Title: selectedOption ? selectedOption.value : "",
//     }));
//   };

//   const getSelectedOption = (value: string): Option | null => {
//     let selectedOption: Option | null = null;
//     myTitleOptions.map((option) => {
//       if (option.value === value) {
//         selectedOption = option;
//       }
//     });
//     return selectedOption;
//   };

//   const customStyles: StylesConfig<Option, false> = {
//     container: (base) => ({
//       ...base,
//       marginBottom: 10,
//       transition: "all 0.3s ease",
//     }),
//     control: (base) => ({
//       ...base,
//       transition: "all 0.3s ease",
//     }),
//     menu: (base) => ({
//       ...base,
//       animation: "fadeIn 0.3s ease",
//     }),
//     option: (base, state) => ({
//       ...base,
//       transition: "all 0.2s ease",
//       backgroundColor: state.isSelected ? "#f0f0f0" : base.backgroundColor,
//       "&:hover": {
//         backgroundColor: "#e0e0e0",
//       },
//     }),
//   };

//   const validateForm = async () => {
//     if (
//       !inputData.Title ||
//       !inputData.EmployeeName ||
//       !inputData.Manager ||
//       !inputData.Role ||
//       !inputData.Address
//     ) {
//       setIsPanelOpen(false);
//       await swal("Validation Error", "All fields are required", "error");
//       return false;
//     }
//     return true;
//   };

//   const resetInputData = () => {
//     setInputData({
//       Title: "",
//       EmployeeName: "",
//       Manager: null,
//       Address: "",
//       Role: "",
//       PeopleImage: undefined,
//     });
//   };

//   const insertDataIntoList = async () => {
//     if (!(await validateForm())) {
//       return;
//     }
//     try {
//       const res = await Web1.lists.getByTitle("AnkitExperiment").items.add({
//         Title: inputData.Title,
//         EmployeeName: inputData.EmployeeName,
//         ManagerStringId: inputData?.Manager?.tertiaryText?.toString(),
//         Address: inputData.Address,
//         Role: inputData.Role,
//       });

//       if (res.data) {
//         resetInputData();
//         setIsPanelOpen(false);
//         await swal("Success", "Data inserted successfully", "success");
//         await getDataFromList();
//       }
//     } catch (error) {
//       console.error("Error inserting data:", error);
//       await swal("Error", "Error inserting data", "error");
//     }
//   };

//   const openAddPanel = () => {
//     resetInputData();
//     setIsPanelOpen(true);
//     setIsAddUpdate(false);
//   };

//   const filterDataByRole = (role: string) => {
//     if (role === "All Employee") {
//       setFilteredData(listData);
//     } else {
//       const filtered = listData.filter((item) => item.Role === role);
//       setFilteredData(filtered);
//     }
//   };

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value.toLowerCase();
//     if (!value.trim()) {
//       setFilteredData(listData);
//       return;
//     }
//     const filtered = listData.filter((item) => {
//       for (const key in item) {
//         if (
//           item[key] &&
//           item[key].toString().toLowerCase().includes(value.toLowerCase())
//         ) {
//           return true;
//         }
//       }
//       return false;
//     });
//     setFilteredData(filtered);
//   };

//   React.useEffect(() => {
//     void getDataFromList();
//   }, []);

//   // const picker = React.useRef(null);

//   const handleUpdate = (item: IItem) => {
//     setIsPanelOpen(true);
//     setIsAddUpdate(true);
//     setInputData({
//       ...item,
//       Manager: item.PeopleImage
//         ? {
//             text: item.PeopleImage.Title,
//             secondaryText: item.PeopleImage.EMail,
//             tertiaryText: item.PeopleImage.ID.toString(),
//           }
//         : null,
//     });
//     setIsMyItemId(item.ID);
//   };

//   const updateDataItem = async (id: number) => {
//     try {
//       const res = await sp.web.lists
//         .getByTitle("AnkitExperiment")
//         .items.getById(id)
//         .update({
//           Title: inputData.Title,
//           EmployeeName: inputData.EmployeeName,
//           ManagerStringId: inputData?.Manager?.tertiaryText?.toString(),
//           Address: inputData.Address,
//           Role: inputData.Role,
//         });
//       console.log("MyResult------: ", res);

//       resetInputData();
//       setIsPanelOpen(false);
//       setIsAddUpdate(false);
//       await swal("Updated", "Updated Successfully", "success");
//       await getDataFromList();
//     } catch (error) {
//       console.error("Error updating data:", error);
//       await swal("Error", "Error updating data", "error");
//     }
//   };

//   const columns: IColumn[] = [
//     {
//       key: "column1",
//       name: "Employee Image",
//       fieldName: "PeopleImage",
//       minWidth: 50,
//       maxWidth: 70,
//       isResizable: true,
//       onRender: (item: IItem) => {
//         const { PeopleImage } = item;
//         return PeopleImage ? (
//           <Persona
//             imageUrl={`/_layouts/15/userphoto.aspx?size=M&username=${PeopleImage.EMail}`}
//             size={PersonaSize.size40}
//           />
//         ) : (
//           <Persona size={PersonaSize.size40} />
//         );
//       },
//     },
//     {
//       key: "column2",
//       name: "Title",
//       fieldName: "Title",
//       minWidth: 100,
//       maxWidth: 150,
//       isResizable: true,
//       data: "string",
//       onRender: (item: IItem) => <span>{item.Title}</span>,
//     },
//     {
//       key: "column3",
//       name: "Employee Name",
//       fieldName: "EmployeeName",
//       minWidth: 100,
//       maxWidth: 150,
//       isResizable: true,
//       data: "string",
//       onRender: (item: IItem) => <span>{item.EmployeeName}</span>,
//     },
//     {
//       key: "column4",
//       name: "Manager",
//       fieldName: "Manager",
//       minWidth: 100,
//       maxWidth: 150,
//       isResizable: true,
//       data: "string",
//       onRender: (item: IItem) => (
//         <span>{item.PeopleImage ? item.PeopleImage.Title : ""}</span>
//       ),
//     },
//     {
//       key: "column5",
//       name: "Address",
//       fieldName: "Address",
//       minWidth: 150,
//       maxWidth: 200,
//       isResizable: true,
//       data: "string",
//       onRender: (item: IItem) => <span>{item.Address}</span>,
//     },
//     {
//       key: "column6",
//       name: "Role",
//       fieldName: "Role",
//       minWidth: 100,
//       maxWidth: 150,
//       isResizable: true,
//       data: "string",
//       onRender: (item: IItem) => <span>{item.Role}</span>,
//     },
//     {
//       key: "column7",
//       name: "Edit",
//       fieldName: "Edit",
//       minWidth: 50,
//       maxWidth: 70,
//       isResizable: true,
//       onRender: (item: IItem) => (
//         <IconButton
//           iconProps={{ iconName: "Edit" }}
//           onClick={() => handleUpdate(item)}
//         />
//       ),
//     },
//   ];

//   return (
//     <>
//       <div className="container">
//         <div className="row">
//           <div className="col-12">
//             <h1>Cubic Logics</h1>
//             <div>
//               <Pivot>
//                 <PivotItem headerText="All Employee">
//                   <DetailsList
//                     items={filteredData}
//                     columns={columns}
//                     selectionMode={SelectionMode.none}
//                     layoutMode={DetailsListLayoutMode.justified}
//                     isHeaderVisible={true}
//                   />
//                 </PivotItem>
//                 <PivotItem headerText="Filter Employee">
//                   <Dropdown
//                     placeholder="Select Role"
//                     options={statusOptions}
//                     onChange={(event, option) =>
//                       filterDataByRole(option?.key as string)
//                     }
//                     style={{ marginBottom: 10 }}
//                   />
//                   <DetailsList
//                     items={filteredData}
//                     columns={columns}
//                     selectionMode={SelectionMode.none}
//                     layoutMode={DetailsListLayoutMode.justified}
//                     isHeaderVisible={true}
//                   />
//                 </PivotItem>
//               </Pivot>
//             </div>
//             <div>
//               <TextField
//                 placeholder="Search by any column"
//                 onChange={handleChange}
//                 style={{ marginBottom: 10 }}
//               />
//               <PrimaryButton text="Add" onClick={openAddPanel} />
//             </div>
//           </div>
//         </div>
//       </div>
//       <Panel
//         isOpen={isPanelOpen}
//         type={PanelType.medium}
//         onDismiss={() => setIsPanelOpen(false)}
//         headerText={isAddUpdate ? "Update Employee" : "Add Employee"}
//       >
//         <Stack tokens={{ childrenGap: 15 }}>
//           <TextField
//             label="Title"
//             required
//             value={inputData.Title}
//             onChange={(e, newValue) =>
//               setInputData((prev) => ({ ...prev, Title: newValue || "" }))
//             }
//           />
//           <TextField
//             label="Employee Name"
//             required
//             value={inputData.EmployeeName}
//             onChange={(e, newValue) =>
//               setInputData((prev) => ({
//                 ...prev,
//                 EmployeeName: newValue || "",
//               }))
//             }
//           />
//           {/* <NormalPeoplePicker
//             onResolveSuggestions={getUsers}
//             onChange={(items) => {
//               setInputData((prev) => ({
//                 ...prev,
//                 Manager: items.length > 0 ? items[0] : null,
//               }));
//             }}
//             pickerSuggestionsProps={{
//               suggestionsHeaderText: "Suggested People",
//               noResultsFoundText: "No results found",
//             }}
//             defaultSelectedItems={inputData.Manager ? [inputData.Manager] : []}
//           /> */}
//           <NormalPeoplePicker
//             onResolveSuggestions={getUsers}
//             onChange={(items) => {
//               if (items) {
//                 setInputData((prev) => ({
//                   ...prev,
//                   Manager: items.length > 0 ? items[0] : null,
//                 }));
//               } else {
//                 setInputData((prev) => ({
//                   ...prev,
//                   Manager: null,
//                 }));
//               }
//             }}
//             pickerSuggestionsProps={{
//               suggestionsHeaderText: "Suggested People",
//               noResultsFoundText: "No results found",
//             }}
//             defaultSelectedItems={inputData.Manager ? [inputData.Manager] : []}
//           />

//           <TextField
//             label="Address"
//             required
//             value={inputData.Address}
//             onChange={(e, newValue) =>
//               setInputData((prev) => ({ ...prev, Address: newValue || "" }))
//             }
//           />
//           <Select
//             placeholder="Select a Role"
//             options={myTitleOptions}
//             value={getSelectedOption(inputData.Role || "")}
//             onChange={(selectedOption) =>
//               handleSelectChange(selectedOption as Option)
//             }
//             styles={customStyles}
//           />
//           {isAddUpdate ? (
//             <PrimaryButton
//               text="Update"
//               onClick={() => updateDataItem(isMyItemId)}
//             />
//           ) : (
//             <PrimaryButton text="Add" onClick={insertDataIntoList} />
//           )}
//         </Stack>
//       </Panel>
//     </>
//   );
// };

// export default CubicLogic;
