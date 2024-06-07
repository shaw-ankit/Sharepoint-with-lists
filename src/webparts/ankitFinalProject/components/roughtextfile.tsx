

// import * as React from "react";
// import { sp, Web } from "@pnp/sp/presets/all";
// import {
//   DetailsListLayoutMode,
//   Dropdown,
//   IDropdownOption,
//   Label,
//   Panel,
//   PanelType,
//   NormalPeoplePicker,
//   Pivot,
//   PivotItem,
//   // getTheme,
//   // IIconProps,
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
// import Select , { StylesConfig, components }  from "react-select";

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

// const myTitleOptions : Option[] =[
//   { value: 'Trainee Developer', label: 'Trainee Developer'},
//   { value: 'Junior Developer', label: 'Junior Developer'},
//   { value: 'Senior Developer', label: 'Senior Developer'},
//   { value: 'Junior Tester', label: 'Junior Tester'},
//   { value: 'Senior Tester', label: 'Senior Tester'},
//   { value: 'Marketing Analyst', label: 'Marketing Analyst'},
//   { value: 'Digital Marketing', label: 'Digital Marketing'},
//   { value: 'Sales Manager', label: 'Sales Manager'},
//   { value: 'Reporting Manager', label: 'Reporting Manager'},
//   { value: 'Team Lead', label: 'Team Lead'},
//   { value: 'HR', label: 'HR'},
// ]

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
//       console.log(res2)

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
//     setInputData((prev) => ({ ...prev, Title: selectedOption ? selectedOption.value : "" }));
//   };

//   // Function to get the selected option based on the current value
//   const getSelectedOption = (value: string): Option | null => {
//     // for (let i = 0; i < myTitleOptions.length; i++) {
//     //   if (myTitleOptions[i].value === value) {
//     //     return myTitleOptions[i];
//     //   }
//     // }
//     // return null;
//     let selectedOption: Option | null = null;
//     myTitleOptions.map(option => {
//       if (option.value === value) {
//         selectedOption = option;
//       }
//     });
//     return selectedOption;
//   };


//   // for the Animation of the reactSelect
//   // Custom styles for react-select
//   const customStyles: StylesConfig<Option, false> = {
//     container: (base) => ({
//       ...base,
//       marginBottom: 10,
//       transition: 'all 0.3s ease',
//     }),
//     control: (base) => ({
//       ...base,
//       transition: 'all 0.3s ease',
//     }),
//     menu: (base) => ({
//       ...base,
//       animation: 'fadeIn 0.3s ease',
//     }),
//     option: (base, state) => ({
//       ...base,
//       transition: 'all 0.2s ease',
//       backgroundColor: state.isSelected ? '#f0f0f0' : base.backgroundColor,
//       '&:hover': {
//         backgroundColor: '#e0e0e0',
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
//     setIsAddUpdate(false)
//   };

//   const filterDataByRole = (role: string) => {
//     if (role === "All Employee") {
//       setFilteredData(listData);
//     } else {
//       const filtered = listData.filter((item) => item.Role === role);
//       setFilteredData(filtered);
//     }
//   };

//   // const theme = getTheme();

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value.toLowerCase();
//     if (!value.trim()) {
//       setFilteredData(listData);
//       return;
//     }
//     const filtered = listData.filter((item) =>{
//       for (const key in item) {
//         if (
//           item[key] &&
//           item[key].toString().toLowerCase().includes(value.toLowerCase())
//         ) {
//           return true;
//         }
//       }
//       return false;
//       });
//     setFilteredData(filtered);
//   };

//   React.useEffect(() => {
//     void getDataFromList();
//   }, []);

//   const picker = React.useRef(null);

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
//     // setInputData(item);
//     setIsMyItemId(item.ID);
//   };

//   const updateDataItem = async (id: number) => {
//     // if (!(await validateForm())) {
//     //   return;
//     // }
//     try {
//       const res = await sp.web.lists.getByTitle("AnkitExperiment").items.getById(id).update({
//         Title: inputData.Title,
//         EmployeeName: inputData.EmployeeName,
//         ManagerStringId: inputData?.Manager?.tertiaryText?.toString(),
//         Address: inputData.Address,
//         Role: inputData.Role,
//       });
//       console.log("MyResult------: " , res);
      
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

//   const handleDelete = async (id: number) => {
//     try {
//       await sp.web.lists.getByTitle("AnkitExperiment").items.getById(id).delete();
//       await getDataFromList();
//       swal("Success", "Successfully deleted data", "success")!;
//     } catch (error) {
//       console.error("Error deleting data:", error);
//       await swal("Error", "Error deleting data", "error");
//     }
//   };

//   const columns : IColumn[]= React.useMemo( 
//     () => [
//     {
//       key: "Title",
//       name: "Title",
//       fieldName: "Title",
//       minWidth: 100,
//       maxWidth: 150,
//     },
//     {
//       key: "EmployeeName",
//       name: "Employee Name",
//       fieldName: "EmployeeName",
//       minWidth: 50,
//       maxWidth: 100,
//     },
//     {
//       key: "Manager",
//       name: "Manager",
//       fieldName: "Manager",
//       minWidth: 50,
//       maxWidth: 200,
//       onRender: (item: any) => (
//         <div>
//           {item.Manager && item.Manager.Title ? (
//             <Persona text={item.Manager.Title} size={PersonaSize.size48} secondaryText={item.Title}/>
//           ) : (
//             "No person selected"
//           )}
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
//       key: "Actions",
//       name: "Actions",
//       fieldName: "Actions",
//       minWidth: 50,
//       maxWidth: 100,
//       onRender: (item: IItem) => (
//         <div>
//           <IconButton iconProps={{ iconName: "Edit" }} onClick={() => handleUpdate(item)} />
//           <IconButton iconProps={{ iconName: "Delete" }} onClick={() => handleDelete(item.ID)} />
//         </div>
//       ),
//     },
//   ],[handleUpdate,handleDelete]
//   ); 

//   const myDetailList = () => (
//     <DetailsList
//       items={filteredData}
//       columns={columns}
//       setKey="set"
//       layoutMode={DetailsListLayoutMode.fixedColumns}
//       selectionMode={SelectionMode.none}
//     />
//   );

//   return (
//     <>
//       <h1 style={{ textAlign: "center" }}>Cubic Logics</h1>

//       <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
//         <PrimaryButton text="Insert Data" onClick={openAddPanel} />
//         <Stack horizontal verticalAlign="center" style={{ width: "500px" }}>
//           <TextField
//             type="text"
//             placeholder="Search..."
//             onChange={handleChange}
//             styles={{ fieldGroup: { width: "200%" } }}
//           />
//           <IconButton iconProps={{ iconName: "Search" }} style={{ marginLeft: "150px" }} />
//         </Stack>
//       </Stack>
//       <Pivot onLinkClick={(item?: PivotItem) => filterDataByRole(item?.props.headerText || "")}>
//         <PivotItem headerText="All Employee">{myDetailList()}</PivotItem>
//         <PivotItem headerText="Developer Team">{myDetailList()}</PivotItem>
//         <PivotItem headerText="Testing Team">{myDetailList()}</PivotItem>
//         <PivotItem headerText="Intern">{myDetailList()}</PivotItem>
//       </Pivot>

//       <Panel
//         isOpen={isPanelOpen}
//         onDismiss={() => setIsPanelOpen(false)}
//         type={PanelType.medium}
//         headerText={isAddUpdate ? "Update Employee" : "Add Employee"}
//         // closeButtonAriaLabel="Close"
//       >
//         {/* <TextField
//           className="input"
//           placeholder="Enter Title here"
//           label="Title"
//           required
//           value={inputData.Title}
//           onChange={(_ev, newVal) => setInputData((prev) => ({ ...prev, Title: newVal || "" }))}
//           styles={{ root: { marginBottom: 10 } }}
//         /> */}
//         <Select
//           className="input"
//           placeholder="Enter Title here"
//           isClearable
//           value={getSelectedOption(inputData.Title || '')}
//           onChange={handleSelectChange}
//           options={myTitleOptions}
//           // styles={{ container: (base) => ({ ...base, marginBottom: 10 }) }}
//           styles={customStyles}
//           components={{
//         Menu: (props) => (
//           <components.Menu {...props} />
//         ),
//       }}
//           />
//         <TextField
//           className="input"
//           placeholder="Enter Employee Name here"
//           label="Employee Name"
//           value={inputData.EmployeeName}
//           onChange={(_ev, newVal) => setInputData((prev) => ({ ...prev, EmployeeName: newVal || "" }))}
//           styles={{ root: { marginBottom: 10 } }}
//         />
//         <TextField
//           className="input"
//           placeholder="Enter your Address"
//           label="Address"
//           value={inputData.Address}
//           onChange={(_ev, newVal) => setInputData((prev) => ({ ...prev, Address: newVal || "" }))}
//           styles={{ root: { marginBottom: 10 } }}
//         />
//         <Dropdown
//           className="input"
//           placeholder="Select a status"
//           label="Role"
//           required
//           options={statusOptions}
//           selectedKey={inputData.Role}
//           onChange={(_ev, option) => setInputData((prev) => ({ ...prev, Role: option?.key as string }))}
//         />
//         <Label> People Picker</Label>
//         <NormalPeoplePicker
//           onResolveSuggestions={getUsers}
//           className={"ms-PeoplePicker"}
//           key={"normal"}
//           componentRef={picker}
//           resolveDelay={300}
//           onChange={(item) => setInputData((c: IItem) => ({ ...c, Manager: item && item[0] }))}
//           styles={{ root: { marginBottom: 20 } }}
//           defaultSelectedItems={
//             inputData.Manager ? [inputData.Manager] : []
//           }
//         />
//         <PrimaryButton
//           className="btn"
//           onClick={isAddUpdate ? () => updateDataItem(isMyItemId) : () => insertDataIntoList()}
//           >
//           {isAddUpdate ? "Update" : "Add"}
//         </PrimaryButton>
//       </Panel>
//     </>
//   );
// };

// export default CubicLogic;




// import * as React from "react";
// import { sp, Web } from "@pnp/sp/presets/all";
// import "./Project.module.scss";
// import {
//   DetailsList,
//   DetailsListLayoutMode,
//   Panel,
//   PanelType,
//   PrimaryButton,
//   ComboBox,
//   NormalPeoplePicker,
//   IconButton,
//   SelectionMode,
//   Stack,
//   IStackTokens,
//   Persona,
//   PersonaSize,
//   SearchBox,
//   TextField,
//   ActionButton
// } from "@fluentui/react";
// import { WebPartContext } from "@microsoft/sp-webpart-base";
// import swal from 'sweetalert';

// interface IItem {
//   ID: number;
//   Title: string;
//   Status: string;
//   ManagerId: number;
//   Manager: {
//     Title: string;
//     Email: string;
//     ID: number;
//   } | null;
// }

// interface IMyAppProps {
//   webUrl: string;
//   context: WebPartContext;
// }

// const ProjectManagement: React.FC<IMyAppProps> = ({ webUrl }) => {
//   const Web1 = Web(webUrl);

//   const [listData, setListData] = React.useState<IItem[]>([]);
//   const [filteredData, setFilteredData] = React.useState<IItem[]>([]);
//   const [isPanelOpen, setIsPanelOpen] = React.useState<boolean>(false);
//   const [inputData, setInputData] = React.useState<IItem>({
//     ID: 0,
//     Title: "",
//     Status: "",
//     ManagerId: 0,
//     Manager: null,
//   });
//   const [searchQuery, setSearchQuery] = React.useState<string>("");

//   const [errors, setErrors] = React.useState<{ title: string}>({
//     title: "",
//   });

//   const getUsers = async () => {
//     try {
//       const res = await sp.web.siteUsers.get();
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
//         .getByTitle("Projects")
//         .items.select("ID,Title,Status,Manager/Title,Manager/EMail,Manager/ID")
//         .expand("Manager")
//         .get<IItem[]>();
//       setListData(res);
//       setFilteredData(res);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       alert("Error fetching data");
//     }
//   };

//   const insertDataIntoList = async () => {
//     try {
//       if (!inputData.Title) {
//         setErrors((prev) => ({ ...prev, title: "Title is required" }));
//         return;
//       }

//       const managerId = inputData.Manager
//         ? inputData.Manager.ID
//         : 0;

//       const res = await Web1.lists.getByTitle("Projects").items.add({
//         Title: inputData.Title,
//         Status: inputData.Status,
//         ManagerId: managerId,
//       });
//       if (res.data) {
//         setInputData({
//           ID: 0,
//           Title: "",
//           Status: "",
//           ManagerId: 0,
//           Manager: null,
//         });
//         setErrors({ title: ""});
//         setIsPanelOpen(false);
//         swal({
//           icon: "success",
//           title: "Data inserted successfully",
//           buttons: undefined,
//           timer: 800,
//         })!;
//         await getDataFromList();
//       }
//     } catch (error) {
//       console.error("Error inserting data:", error);
//       const errorMessage = error instanceof Error ? error.message : String(error);
//       swal({
//         icon: "error",
//         title: "Error inserting data",
//         text: errorMessage,
//       })!;
//     }
//   };

//   const updateItemInList = async (itemId: number) => {
//     try {
//       if (!inputData.Title) {
//         setErrors((prev) => ({ ...prev, title: "Title is required" }));
//         return;
//       }

//       const managerId = inputData.Manager
//         ? inputData.Manager.ID
//         : 0;

//       const res = await Web1.lists
//         .getByTitle("Projects")
//         .items.getById(itemId)
//         .update({
//           Title: inputData.Title,
//           Status: inputData.Status,
//           ManagerId: managerId,
//         });

//       if (res.data) {
//         setInputData({
//           ID: 0,
//           Title: "",
//           Status: "",
//           ManagerId: 0,
//           Manager: null,
//         });
//         setErrors({ title: ""});
//         setIsPanelOpen(false);
//         swal({
//           icon: "success",
//           title: "Data updated successfully",
//           buttons: undefined,
//           timer: 800,
//         })!;
//         await getDataFromList();
//       }
//     } catch (error) {
//       console.error("Error updating data:", error);
//       const errorMessage = error instanceof Error ? error.message : String(error);
//       swal({
//         icon: "error",
//         title: "Error updating data",
//         text: errorMessage,
//       })!;
//     }
//   };

//   const openAddPanel = () => {
//     setInputData({ ID: 0, Title: "", Status: "", ManagerId: 0, Manager: null });
//     setErrors({ title: ""});
//     setIsPanelOpen(true);
//   };

//   const openEditPanel = (item: IItem) => {
//     setInputData({ ...item });
//     setErrors({ title: ""});
//     setIsPanelOpen(true);
//   };

//   const deleteItem = async (itemId: number) => {
//     try {
//       await Web1.lists.getByTitle("Projects").items.getById(itemId).delete();
//       swal({
//         icon: "success",
//         title: "Data deleted successfully",
//         buttons: undefined,
//         timer: 800,
//       })!;
//       await getDataFromList();
//     } catch (error) {
//       console.error("Error deleting data:", error);
//       const errorMessage = error instanceof Error ? error.message : String(error);
//       swal({
//         icon: "error",
//         title: "Error deleting data",
//         text: errorMessage,
//       })!;
//     }
//   };

//   React.useEffect(() => {
//     void getDataFromList();
//   }, []);

//   const onSearch = (newValue: string | undefined) => {
//     const query = newValue ?? "";
//     setSearchQuery(query);
//     setFilteredData(
//       listData.filter((item) =>
//         item.Title.toLowerCase().includes(query.toLowerCase())||
//       item.Manager?.Title.toLowerCase().includes(query)
//       )
//     );
//   };

//   const columns = [
//     {
//       key: "Title",
//       name: "Title",
//       fieldName: "Title",
//       minWidth: 160,
//     },
//     {
//       key: "Status",
//       name: "Status",
//       fieldName: "Status",
//       minWidth: 160,
//     },
//     {
//       key: "Manager",
//       name: "Manager",
//       fieldName: "Manager",
//       minWidth: 50,
//       maxWidth: 200,
//       onRender: (item: any) => (
//         <div>
//           {item.Manager && item.Manager.Title ? (
//             <Persona text={item.Manager.Title} size={PersonaSize.size40} />
//           ) : (
//             "No Manager selected"
//           )}
//         </div>
//       ),
//     },
//     {
//       key: "actions",
//       name: "Actions",
//       fieldName: "actions",
//       minWidth: 50,
//       maxWidth: 180,
//       onRender: (item: IItem) => (
//         <div>
//           <IconButton
//             iconProps={{ iconName: "Edit" }}
//             onClick={() => openEditPanel(item)}
//           />
//           <IconButton
//             iconProps={{ iconName: "Delete" }}
//             onClick={() => void deleteItem(item.ID)}
//           />
//         </div>
//       ),
//     },
//   ];

//   const statusOptions = [
//     { key: "Inprogress", text: "In Progress" },
//     { key: "OnHold", text: "On Hold" },
//     { key: "Completed", text: "Completed" },
//   ];

//   const stackTokens: IStackTokens = { childrenGap: 10 };

//   return (
//     <>
//       <h2>Project List</h2>
//       <Stack
//         horizontal
//         tokens={stackTokens}
//         horizontalAlign="space-between"
//         verticalAlign="center"
//       >
//         <ActionButton iconProps={{ iconName: "Add" }} onClick={openAddPanel}>Add Project</ActionButton>
//         <Stack horizontal tokens={stackTokens} verticalAlign="center">
//          {/ <Label>Search: </Label> /}
//           <SearchBox
//             placeholder="Search projects..."
//             value={searchQuery}
//             onChange={(ev, newValue) => onSearch(newValue)}
//             styles={{ root: { width: 250 } }}
//             underlined
//           />
//         </Stack>
//       </Stack>
//       <DetailsList
//         items={filteredData}
//         columns={columns}
//         setKey="set"
//         layoutMode={DetailsListLayoutMode.fixedColumns}
//         selectionMode={SelectionMode.none}
//       />
//       <Panel
//         isOpen={isPanelOpen}
//         onDismiss={() => setIsPanelOpen(false)}
//         type={PanelType.medium}
//         headerText={inputData.ID === 0 ? "Add Project" : "Edit Project"}
//         closeButtonAriaLabel="Close"
//       >
//         <div style={{ padding: "20px" }}>
//           <TextField
//             className="input"
//             placeholder="Enter Title here"
//             label="Title"
//             required
//             value={inputData.Title}
//             onChange={(_ev, newVal) =>
//               setInputData((prev) => ({ ...prev, Title: newVal || "" }))
//             }
//             errorMessage={errors.title}
//           />
//           <ComboBox
//             label="Status"
//             selectedKey={inputData.Status}
//             onChange={(_ev, option) =>
//               setInputData((prev) => ({
//                 ...prev,
//                 Status: option ? (option.key as string) : "",
//               }))
//             }
//             options={statusOptions}
//             required
//           />
//           <div style={{ marginBottom: "8px" }}>Manager</div>
//           <NormalPeoplePicker
//             onResolveSuggestions={getUsers}
//             className={"ms-PeoplePicker"}
//             key={"normal"}
//             resolveDelay={300}
//             onChange={(items) => {
//               const selectedPerson = items && items[0] ? items[0] : null;
//               setInputData((c) => ({
//                 ...c,
//                 Manager: selectedPerson
//                   ? {
//                       Title: selectedPerson.text || "",
//                       Email: selectedPerson.secondaryText || "",
//                       ID: parseInt(selectedPerson.tertiaryText || "0", 10),
//                     }
//                   : null,
//                 ManagerId: selectedPerson
//                   ? parseInt(selectedPerson.tertiaryText || "0", 10)
//                   : 0,
//               }));
//             }}
//             defaultSelectedItems={inputData.Manager ? [{
//               text: inputData.Manager.Title,
//               secondaryText: inputData.Manager.Email,
//               tertiaryText: inputData.Manager.ID.toString(),
//             }] : []}
//           />
//           <PrimaryButton
//             className="btn"
//             text="Update"
//             onClick={() => {
//               if (inputData.ID === 0) {
//                 void insertDataIntoList();
//               } else {
//                 void updateItemInList(inputData.ID);
//               }
//             }}
//             style={{ marginTop: "20px" }}
//           />
//         </div>
//       </Panel>
//     </>
//   );
// };

// export default ProjectManagement;






// import * as React from "react";
// import { sp, Web } from "@pnp/sp/presets/all";
// import {
//   DetailsList,
//   DetailsListLayoutMode,
//   Dropdown,
//   IDropdownOption,
//   IIconProps,
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
// import Swal from "sweetalert2";
// import makeAnimated from "react-select/animated";

// import { Stack } from "office-ui-fabric-react/lib/Stack";
// import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
// import { TextField } from "office-ui-fabric-react/lib/TextField";
// import { IconButton } from "office-ui-fabric-react/lib/Button";
// import { SelectionMode } from "office-ui-fabric-react";
// import Select from "react-select";

// interface IPeoplePickerImage {
//   Title: string;
//   EMail: string;
//   ID: number;
// }

// interface IItem {
//   ID: number;
//   Title: string;
//   PeopleList?: string;
//   selectedPerson?: IPersonaProps | null;
//   Address: string;
//   Position: string;
//   PeoplePickerImage?: IPeoplePickerImage;
//   Hobby: string;
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

// // interface IMySelectOption {
// //   value: string;
// //   label: string;
// // }

// const hobbyoption = [
//   { value: "Cricket", label: "Cricket" },
//   { value: "FootBall", label: "FootBall" },
//   { value: "Badminton", label: "Badminton" },
// ]

// const MyApp: React.FC<IMyAppProps> = ({ context, webUrl }) => {
//   const Web1 = Web(webUrl);

//   const [listData, setListData] = React.useState<any[]>([]);
//   const [filteredData, setFilteredData] = React.useState<any[]>([]);
//   const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
//   const [isAddUpdate, setIsAddUpdate] = React.useState<boolean>(false);
//   const [isMyItemId, setIsMyItemId] = React.useState<number>(0);
//   const [inputData, setInputData] = React.useState<Partial<IItem>>({
//     Title: "",
//     PeopleList: "",
//     selectedPerson: null,
//     Address: "",
//     Position: "",
//     PeoplePickerImage: undefined,
//     Hobby:"",
//   });

//   const animatedCompo = makeAnimated();

//   // const mySelectOnChange = (selectedOption: IMySelectOption | null) => {
//   //   setInputData((prev) => ({
//   //     ...prev,
//   //     Position: selectedOption ? selectedOption.value : "",
//   //   }));
//   // };

//   // const mySelectionValue = (value:string):IMySelectOption | null =>{
//   //   for(let i=0; i<statusOptions.length; i++){
//   //     if(statusOptions[i].value === value) return statusOptions[i];
//   //   }
//   //   return null;
//   // }

  


//   const getUsers = async () => {
//     try {
//       const res = await sp.web.siteUsers.get();
//       const res222 = await Web1.siteUsers.get();

//       console.log("res---->", res);

//       const suggestions = res.map((user) => ({
//         text: user.Title,
//         secondaryText: user.Email,
//         tertiaryText: user.Id.toString(),
//         imageUrl:`/_layouts/15/userphoto.aspx?size=S&accountname=${user.Email}`
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
//         .getByTitle("PracticeList")
//         .items.select(
//           "*,PeoplePickerImage/Title,PeoplePickerImage/EMail,PeoplePickerImage/ID"
//         )
//         .expand("PeoplePickerImage/ID")
//         .get();

//       console.log("Fetched Items:", res);
//       setListData(res);
//       setFilteredData(res);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       void Swal.fire("Error", "Error fetching data", "error");
//     }
//   };

//   const validateForm = () => {
//     if (
//       !inputData.Title ||
//       !inputData.PeopleList ||
//       !inputData.selectedPerson ||
//       !inputData.Position ||
//       !inputData.Address ||
//       !inputData.Hobby 
//     ) {
//       void Swal.fire("Error", "Please fill all the fields", "error");
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
//       // console.log("mynew insert data",Web1.lists.getByTitle("PracticeList").items)
//       const res = await Web1.lists.getByTitle("PracticeList").items.add({
//         Title: inputData.Title,
//         PeopleList: inputData.PeopleList,
//         PeoplePickerImageStringId:
//           inputData?.selectedPerson?.tertiaryText?.toString(),
//         Address: inputData.Address,
//         Position: inputData.Position,
//         Hobby:inputData.Hobby,
//       });
//       // console.log("insert data clg--->", res);
//       if (res.data) {
//         setInputData({
//           Title: "",
//           PeopleList: "",
//           selectedPerson: null,
//           Address: "",
//           Position: "",
//           PeoplePickerImage: undefined,
//           Hobby:"",
//         });
//         setIsModalOpen(false);
//         await getDataFromList();
//         void Swal.fire("Success", "Data inserted successfully", "success");
//       }
//     } catch (error) {
//       setIsModalOpen(false);
//       console.error("Error inserting data:", error);
//       void Swal.fire("Error", "Error inserting data", "error");
//     }
//   };

//   const openAddModal = () => {
//     setInputData({
//       Title: "",
//       PeopleList: "",
//       selectedPerson: null,
//       Address: "",
//       Position: "",
//       Hobby: "",
//     });
//     setIsModalOpen(true);
//     setIsAddUpdate(false);
//   };

//   const filterDataByPosition = (props: string) => {
//     let temp;
//     switch (props) {
//       case "All Employee":
//         setFilteredData(listData);
//         break;
//       case "Developer Team":
//         temp = listData.filter((item) => item.Position === "Developer");
//         setFilteredData(temp);
//         break;
//       case "Testing Team":
//         temp = listData.filter((item) => item.Position === "Testing");
//         setFilteredData(temp);
//         break;
//       case "Intern":
//         temp = listData.filter((item) => item.Position === "Intern");
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
//     setIsModalOpen(true);
//     setIsAddUpdate(true);
//     setInputData({
//       ...item,
//       selectedPerson: item.PeoplePickerImage
//         ? {
//             text: item.PeoplePickerImage.Title,
//             secondaryText: item.PeoplePickerImage.EMail,
//             tertiaryText: item.PeoplePickerImage.ID.toString(),
//           }
//         : null,
//     });
//     // setInputData(item);
//     setIsMyItemId(item.ID);
//   };

//   const UpdateDataItem = async (id: number) => {
//     if (!validateForm()) {
//       return;
//     }
//     try {
//       const myres = await sp.web.lists
//         .getByTitle("PracticeList")
//         .items.getById(id)
//         .update({
//           Title: inputData.Title,
//           PeopleList: inputData.PeopleList,
//           PeoplePickerImageStringId:
//             inputData?.selectedPerson?.tertiaryText?.toString(),
//           Address: inputData.Address,
//           Position: inputData.Position,
//           Hobby:inputData.Hobby,
//         });
//       console.log("myresult---->", myres);

//       setInputData({
//         Title: "",
//         PeopleList: "",
//         selectedPerson: null,
//         Address: "",
//         Position: "",
//         Hobby:"",
//       });
//       setIsModalOpen(false);
//       setIsAddUpdate(false);
//       void Swal.fire("Hurray!!", "Updated Successfully");
//       await getDataFromList();
//     } catch (error) {
//       setIsModalOpen(false);
//       console.log("Error updating Data");
//       void Swal.fire("Error", "Error updating Data", "error");
//     }
//   };

//   const handleDelete = async (myid: number) => {
//     try {
//       await sp.web.lists
//         .getByTitle("PracticeList")
//         .items.getById(myid)
//         .delete();
//       void Swal.fire("Deleted Successfully");
//       getDataFromList()!;
//     } catch (error) {
//       console.log("Error in Deleting");
//       void Swal.fire("Error", "Error in Deleting");
//     }
//   };

//   const columns = [
//     {
//       key: "Title",
//       name: "Title",
//       fieldName: "Title",
//       minWidth: 50,
//       maxWidth: 100,
//     },
//     {
//       key: "People",
//       name: "Name",
//       fieldName: "PeopleList",
//       minWidth: 50,
//       maxWidth: 150,
//     },
//     {
//       key: "selectedPerson",
//       name: "selectedPerson",
//       fieldName: "selectedPerson",
//       minWidth: 50,
//       maxWidth: 200,
//       onRender: (item: any) => (
//         <div>
//           {item.PeoplePickerImage && item.PeoplePickerImage.Title ? (
//             <Persona
//               text={item.PeoplePickerImage.Title}
//               size={PersonaSize.size48}
//               secondaryText={item.Title}
//               imageUrl={`/_layouts/15/userphoto.aspx?size=S&accountname=${item.ID}`}
//             />
//           ) : (
//             "No person selected"
//           )}
//         </div>
//       ),
//     },
//     {
//       key: "Position",
//       name: "Position",
//       fieldName: "Position",
//       minWidth: 100,
//       maxWidth: 150,
//     },
//     {
//       key: "Address",
//       name: "Address",
//       fieldName: "Address",
//       minWidth: 50,
//       maxWidth: 150,
//     },
//     {
//       key : "Hobby",
//       name: "Hobby",
//       fieldName : "Hobby",
//       minWidth:50,
//       maxWidth:150,
//     },
//     {
//       key: "action",
//       name: "Actions",
//       fieldName: "action",
//       minWidth: 100,
//       maxWidth: 150,
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
//       <h1 style={{ textAlign: "center" }}>HR365</h1>

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
//             filterDataByPosition(item.props.headerText || "");
//           }
//         }}
//       >
//         <PivotItem headerText="All Employee">{myDetailList()}</PivotItem>
//         <PivotItem headerText="Developer Team">{myDetailList()}</PivotItem>
//         <PivotItem headerText="Testing Team">{myDetailList()}</PivotItem>
//         <PivotItem headerText="Intern">{myDetailList()}</PivotItem>
//       </Pivot>

//       <Modal
//         isOpen={isModalOpen}
//         onDismiss={
//           (() => setIsAddUpdate(false)) && (() => setIsModalOpen(false))
//         }
//       >
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
//             placeholder="Enter PeopleList here"
//             label="PeopleList"
//             value={inputData.PeopleList}
//             onChange={(_ev, newVal) =>
//               setInputData((prev) => ({ ...prev, PeopleList: newVal || "" }))
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
//             label="Position"
//             required
//             options={statusOptions}
//             selectedKey={inputData.Position}
//             onChange={(_ev, option) =>
//               setInputData((prev) => ({
//                 ...prev,
//                 Position: option?.key as string,
//               }))
//             }
//           />
//           {/* <Label> Position </Label>
//           <Select
//             closeMenuOnSelect={true}
//             // isMulti
//             components={makeAnimated()}
//             options={statusOptions}
//             value={mySelectionValue}
//             onChange={mySelectOnChange}
//             isClearable
//           /> */}
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
//             defaultSelectedItems={
//               inputData.selectedPerson ? [inputData.selectedPerson] : []
//             }
//           />
//           <Label>Hobby</Label>
//           <Select
//             options={hobbyoption}
//             placeholder={"choose hobby"}
//             isMulti
//             // value={hobbyoption.filter(item => inputData.Hobby?.includes(item.value))}
//             value = {hobbyoption.filter(option => inputData.Hobby?.includes(option.value))}
//             onChange={(item) => {
//               const myvalues = item ? item.map(el => el.value) : [];
//               setInputData((prev)=>({...prev,Hobby:myvalues.join(',')||""}));
//             }}
//           />
//           <PrimaryButton
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

// export default MyApp;

