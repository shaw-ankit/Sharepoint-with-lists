// import * as React from "react";
// import { sp, Web } from "@pnp/sp/presets/all";
// import {
//   DetailsList,
//   DetailsListLayoutMode,
//   IIconProps,
//   IconButton,
//   Modal,
//   NormalPeoplePicker,
//   PrimaryButton,
//   TextField,
//   getTheme,
// } from "@fluentui/react";
// import { WebPartContext } from "@microsoft/sp-webpart-base";
// import { IPersonaProps, Persona, PersonaSize } from "@fluentui/react/lib/Persona";

// interface IItem {
//   Title: string;
//   PeopleList?: string;
//   selectedPerson?: IPersonaProps | null;
// }

// interface IMyAppProps {
//   webUrl: string;
//   context: WebPartContext;
// }

// const TestingInPeoplePicker: React.FC<IMyAppProps> = ({context, webUrl }) => {
//   const Web1 = Web(webUrl);

//   const [listData, setListData] = React.useState<any[]>([]);
//   const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
//   const [inputData, setInputData] = React.useState<IItem>({
//     Title: "",
//     PeopleList: "",
//     selectedPerson: null,
//   });

//   const getUsers = async () => {
//     try {
//       const res = await sp.web.siteUsers.get();
//       const res222 = await Web1.siteUsers.get();

//       console.log("res---->", res);
//       console.log("res222---->", res222);

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
//       const res = await sp.web.lists.getByTitle("TestingPeoplePicker").items
//         .select('*,PeoplePickerImage/Title,PeoplePickerImage/EMail,PeoplePickerImage/ID').expand("PeoplePickerImage/ID")
//         .get();

//       console.log('Fetched Items:', res);
//       setListData([...res])
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       alert("Error fetching data");
//     }
//   };

//   const insertDataIntoList = async () => {
//     try {
//       const res = await Web1.lists.getByTitle("TestingPeoplePicker").items.add({
//         Title: inputData.Title,
//         PeopleList: inputData.PeopleList,
//         PeoplePickerImageStringId: inputData?.selectedPerson?.tertiaryText?.toString(),
//       });
//       if (res.data) {
//         setInputData({ Title: "", PeopleList: "", selectedPerson: null });
//         setIsModalOpen(false);
//         alert("Data inserted successfully");
//         await getDataFromList();
//       }
//     } catch (error) {
//       console.error("Error inserting data:", error);
//       alert("Error inserting data");
//     }
//   };

//   const openAddModal = () => {
//     setInputData({ Title: "", PeopleList: "", selectedPerson: null });
//     setIsModalOpen(true);
//   };

//   const theme = getTheme();
//   const cancelIcon: IIconProps = { iconName: "Cancel" };

//   React.useEffect(() => {
//     getDataFromList()!;
//   }, []);

//   // const picker = React.useRef(null);

//   const columns = [
//     {
//       key: "Id",
//       name: "Sl.No",
//       fieldName: "ID",
//       minWidth: 50,
//       maxWidth: 50,
//     },
//     {
//       key: "Title",
//       name: "Title",
//       fieldName: "PeopleList",
//       minWidth: 50,
//       maxWidth: 100,
//     },
//     {
//       key: "People",
//       name: "PeopleList",
//       fieldName: "PeopleList",
//       minWidth: 50,
//       maxWidth: 150,
//     },
//     {
//       key: "selectedPerson",
//       name: "selectedPerson",
//       fieldName: "selectedPerson",
//       minWidth: 50,
//       maxWidth: 150,
//       onRender: (item: any) => (
//         <div>
//           {console.log("Item", item)}
//           {item.PeoplePickerImage && item.PeoplePickerImage.Title ? (
//             <Persona
//               text={item.PeoplePickerImage.Title}
//               size={PersonaSize.size32}
//             />
//           ) : (
//             "No person selected"
//           )}
//         </div>
//       ),
//     },
//   ];

//   return (
//     <>
//       <h1>PeoplePicker Testing</h1>
//       <PrimaryButton text="Add Data" onClick={openAddModal} />
//       <DetailsList
//         items={listData}
//         columns={columns}
//         setKey="set"
//         layoutMode={DetailsListLayoutMode.fixedColumns}
//       />
//       <Modal isOpen={isModalOpen} onDismiss={() => setIsModalOpen(false)}>
//         <div style={{ padding: "20px" }}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <span>Add Employee</span>
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
//           />
//           <TextField
//             className="input"
//             placeholder="Enter PeopleList here"
//             label="PeopleList"
//             value={inputData.PeopleList}
//             onChange={(_ev, newVal) =>
//               setInputData((prev) => ({ ...prev, PeopleList: newVal || "" }))
//             }
//           />
//           <NormalPeoplePicker
//             onResolveSuggestions={getUsers}
//             className={'ms-PeoplePicker'}
//             key={'normal'}
//             // componentRef={picker}
//             resolveDelay={300}
//             onChange={(item) => {
//               console.log("selected", item);
//               setInputData((c: IItem) => ({
//                 ...c,
//                 selectedPerson: item && item[0],
//               }));
//             }}
//           />
//           <PrimaryButton
//             className="btn"
//             text="Save"
//             onClick={() => { insertDataIntoList()! }}
//             style={{ marginTop: "20px" }}
//           />
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default TestingInPeoplePicker;

// import * as React from "react";
// import { sp, Web } from "@pnp/sp/presets/all";
// import {
//   DetailsListLayoutMode,
//   // IIconProps,
//   // IconButton,
//   Panel,
//   PanelType,
//   NormalPeoplePicker,
//   PrimaryButton,
//   TextField,
//   // getTheme,
// } from "@fluentui/react";
// import { WebPartContext } from "@microsoft/sp-webpart-base";
// import { IPersonaProps, Persona, PersonaSize } from "@fluentui/react/lib/Persona";
// import { DetailsList, IColumn } from "office-ui-fabric-react/lib/DetailsList";

// interface IItem {
//   Title: string;
//   PeopleList?: string;
//   selectedPerson?: IPersonaProps | null;
// }

// interface IMyAppProps {
//   webUrl: string;
//   context: WebPartContext;
// }

// const TestingInPeoplePicker: React.FC<IMyAppProps> = ({context, webUrl }) => {
//   const Web1 = Web(webUrl);

//   const [listData, setListData] = React.useState<any[]>([]);
//   const [isPanelOpen, setIsPanelOpen] = React.useState<boolean>(false);
//   const [inputData, setInputData] = React.useState<IItem>({
//     Title: "",
//     PeopleList: "",
//     selectedPerson: null,
//   });

//   const getUsers = async () => {
//     try {
//       const res = await sp.web.siteUsers.get();
//       const res222 = await Web1.siteUsers.get();

//       console.log("res---->", res);
//       console.log("res222---->", res222);

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
//       const res = await sp.web.lists.getByTitle("TestingPeoplePicker").items
//         .select('*,PeoplePickerImage/Title,PeoplePickerImage/EMail,PeoplePickerImage/ID').expand("PeoplePickerImage/ID")
//         .get();

//       console.log('Fetched Items:', res);
//       setListData([...res])
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       alert("Error fetching data");
//     }
//   };

//   const insertDataIntoList = async () => {
//     try {
//       const res = await Web1.lists.getByTitle("TestingPeoplePicker").items.add({
//         Title: inputData.Title,
//         PeopleList: inputData.PeopleList,
//         PeoplePickerImageStringId: inputData?.selectedPerson?.tertiaryText?.toString(),
//       });
//       if (res.data) {
//         setInputData({ Title: "", PeopleList: "", selectedPerson: null });
//         setIsPanelOpen(false);
//         alert("Data inserted successfully");
//         await getDataFromList();
//       }
//     } catch (error) {
//       console.error("Error inserting data:", error);
//       alert("Error inserting data");
//     }
//   };

//   const openAddPanel = () => {
//     setInputData({ Title: "", PeopleList: "", selectedPerson: null });
//     setIsPanelOpen(true);
//   };

//   // const theme = getTheme();
//   // const cancelIcon: IIconProps = { iconName: "Cancel" };

//   React.useEffect(() => {
//     getDataFromList()!;
//   }, []);

//   const columns: IColumn[]= React.useMemo (
//     () => [
//       {
//         key: "Id",
//         name: "Sl.No",
//         fieldName: "ID",
//         minWidth: 50,
//         maxWidth: 50,
//       },
//       {
//         key: "Title",
//         name: "Title",
//         fieldName: "PeopleList",
//         minWidth: 50,
//         maxWidth: 100,
//       },
//       {
//         key: "People",
//         name: "PeopleList",
//         fieldName: "PeopleList",
//         minWidth: 50,
//         maxWidth: 150,
//       },
//       {
//         key: "selectedPerson",
//         name: "selectedPerson",
//         fieldName: "selectedPerson",
//         minWidth: 50,
//         maxWidth: 150,
//         onRender: (item: any) => (
//           <div>
//             {console.log("Item", item)}
//             {item.PeoplePickerImage && item.PeoplePickerImage.Title ? (
//               <Persona
//                 text={item.PeoplePickerImage.Title}
//                 size={PersonaSize.size32}
//               />
//             ) : (
//               "No person selected"
//             )}
//           </div>
//         ),
//       },
//     ],[]);

//   return (
//     <>
//       <h1>PeoplePicker Testing</h1>
//       <PrimaryButton text="Add Data" onClick={openAddPanel} />
//       <DetailsList
//         items={listData}
//         columns={columns}
//         setKey="set"
//         layoutMode={DetailsListLayoutMode.fixedColumns}
//       />
//       <Panel
//         isOpen={isPanelOpen}
//         onDismiss={() => setIsPanelOpen(false)}
//         type={PanelType.medium}
//         headerText="Add Employee"
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
//           />
//           <TextField
//             className="input"
//             placeholder="Enter PeopleList here"
//             label="PeopleList"
//             value={inputData.PeopleList}
//             onChange={(_ev, newVal) =>
//               setInputData((prev) => ({ ...prev, PeopleList: newVal || "" }))
//             }
//           />
//           <NormalPeoplePicker
//             onResolveSuggestions={getUsers}
//             className={'ms-PeoplePicker'}
//             key={'normal'}
//             resolveDelay={300}
//             onChange={(item) => {
//               console.log("selected", item);
//               setInputData((c: IItem) => ({
//                 ...c,
//                 selectedPerson: item && item[0],
//               }));
//             }}
//           />
//           <PrimaryButton
//             className="btn"
//             text="Save"
//             onClick={() => { insertDataIntoList()! }}
//             style={{ marginTop: "20px" }}
//           />
//         </div>
//       </Panel>
//     </>
//   );
// };

// export default TestingInPeoplePicker;

// import * as React from "react";
// import { sp, Web } from "@pnp/sp/presets/all";
// import {
//   DetailsListLayoutMode,
//   IconButton,
//   Panel,
//   PanelType,
//   NormalPeoplePicker,
//   PrimaryButton,
//   TextField,
// } from "@fluentui/react";
// import { WebPartContext } from "@microsoft/sp-webpart-base";
// import {
//   IPersonaProps,
//   Persona,
//   PersonaSize,
// } from "@fluentui/react/lib/Persona";
// import { DetailsList, IColumn } from "office-ui-fabric-react/lib/DetailsList";
// import swal from "sweetalert";
// import { Label } from "office-ui-fabric-react";


// interface IItem {
//   Title: string;
//   PeopleList?: string;
//   selectedPerson?: IPersonaProps | null;
//   ID?: number; // Add ID to IItem interface
// }

// interface IMyAppProps {
//   webUrl: string;
//   context: WebPartContext;
// }

// const TestingInPeoplePicker: React.FC<IMyAppProps> = ({ context, webUrl }) => {
//   const Web1 = Web(webUrl);

//   const [listData, setListData] = React.useState<IItem[]>([]);
//   const [isPanelOpen, setIsPanelOpen] = React.useState<boolean>(false);
//   const [inputData, setInputData] = React.useState<IItem>({
//     Title: "",
//     PeopleList: "",
//     selectedPerson: null,
//   });

//   const getUsers = async () => {
//     try {
//       // const res = await sp.web.siteUsers.get();
//       // const res222 = await Web1.siteUsers.get();
//       const res = await sp.web.siteUsers.get();
//       const res222 = await Web1.siteUsers.get();
//       console.log("res---->", res);
//       console.log("res222---->", res222);

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
//         .getByTitle("TestingPeoplePicker")
//         .items.select(
//           "*,PeoplePickerImage/Title,PeoplePickerImage/EMail,PeoplePickerImage/ID"
//         )
//         .expand("PeoplePickerImage/ID")
//         .get();

//       setListData([...res]);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       await swal("Error Fetching Data", "Check Into the console", "error");
//     }
//   };

//   const insertDataIntoList = async () => {
//     try {
//       const res = await Web1.lists.getByTitle("TestingPeoplePicker").items.add({
//         Title: inputData.Title,
//         PeopleList: inputData.PeopleList,
//         PeoplePickerImageStringId:
//           inputData?.selectedPerson?.tertiaryText?.toString(),
//       });
//       if (res.data) {
//         setInputData({ Title: "", PeopleList: "", selectedPerson: null });
//         setIsPanelOpen(false);
//         await swal({
//           title: "Data Inserted!",
//           text: "Successfully Inserted Data!",
//           icon: "success",
//         });
//         await getDataFromList();
//       }
//     } catch (error) {
//       console.error("Error inserting data:", error);
//       alert("Error inserting data");
//     }
//   };

//   const deleteDataFromList = async (id: number) => {
//     try {
//       await sp.web.lists
//         .getByTitle("TestingPeoplePicker")
//         .items.getById(id)
//         .delete();
//       setListData(listData.filter((item) => item.ID !== id));
//       await swal({
//         title: "Data!",
//         text: "Successfully Deleted Data!",
//         icon: "success",
//       });
//       // alert("Item deleted successfully");
//     } catch (error) {
//       console.error("Error deleting item", error);
//       await swal("SomeThing Went Wrong", "Check Into the console", "error");
//     }
//   };

//   const updateDataInList = async (id: number) => {
//     try {
//       const res = await sp.web.lists
//         .getByTitle("TestingPeoplePicker")
//         .items.getById(id)
//         .update({
//           Title: inputData.Title,
//           PeopleList: inputData.PeopleList,
//           PeoplePickerImageStringId:
//             inputData?.selectedPerson?.tertiaryText?.toString(),
//         });
//       if (res.data) {
//         setInputData({ Title: "", PeopleList: "", selectedPerson: null });
//         setIsPanelOpen(false);
//         await swal({
//           title: "Updated Data!",
//           text: "Successfully Updated Data!",
//           icon: "success",
//         });
//         await getDataFromList();
//       }
//     } catch (error) {
//       console.error("Error updating data:", error);
//       alert("Error updating data");
//     }
//   };

//   const openAddPanel = () => {
//     setInputData({ Title: "", PeopleList: "", selectedPerson: null });
//     setIsPanelOpen(true);
//   };

//   const openEditPanel = (item: IItem) => {
//     setInputData(item);
//     setIsPanelOpen(true);
//   };

//   React.useEffect(() => {
//     void getDataFromList();
//   }, []);

//   const columns: IColumn[] = React.useMemo(
//     () => [
//       {
//         key: "Id",
//         name: "Sl.No",
//         fieldName: "ID",
//         minWidth: 50,
//         maxWidth: 50,
//       },
//       {
//         key: "Title",
//         name: "Title",
//         fieldName: "Title",
//         minWidth: 50,
//         maxWidth: 100,
//       },
//       {
//         key: "People",
//         name: "PeopleList",
//         fieldName: "PeopleList",
//         minWidth: 50,
//         maxWidth: 150,
//       },
//       {
//         key: "selectedPerson",
//         name: "selectedPerson",
//         fieldName: "selectedPerson",
//         minWidth: 50,
//         maxWidth: 150,
//         onRender: (item: any) => (
//           <div>
//             {item.PeoplePickerImage && item.PeoplePickerImage.Title ? (
//               <Persona
//                 text={item.PeoplePickerImage.Title}
//                 size={PersonaSize.size32}
//               />
//             ) : (
//               "No person selected"
//             )}
//           </div>
//         ),
//       },
//       {
//         key: "actions",
//         name: "Actions",
//         fieldName: "actions",
//         minWidth: 100,
//         onRender: (item: IItem) => (
//           <div>
//             <IconButton
//               iconProps={{ iconName: "Edit" }}
//               onClick={() => openEditPanel(item)}
//             />
//             <IconButton
//               iconProps={{ iconName: "Delete" }}
//               onClick={() => deleteDataFromList(item.ID!)}
//             />
//           </div>
//         ),
//       },
//     ],
//     [updateDataInList, deleteDataFromList]
//   );

//   return (
//     <>
//       <h1>PeoplePicker Testing</h1>
//       <PrimaryButton text="Add Data" onClick={openAddPanel} />
//       <DetailsList
//         items={listData}
//         columns={columns}
//         setKey="set"
//         layoutMode={DetailsListLayoutMode.fixedColumns}
//       />
//       <Panel
//         isOpen={isPanelOpen}
//         onDismiss={() => setIsPanelOpen(false)}
//         type={PanelType.medium}
//         headerText="Add Employee"
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
//           />
//           <TextField
//             className="input"
//             placeholder="Enter PeopleList here"
//             label="PeopleList"
//             value={inputData.PeopleList}
//             onChange={(_ev, newVal) =>
//               setInputData((prev) => ({ ...prev, PeopleList: newVal || "" }))
//             }
//           />
//           <Label>People Picker</Label>
//           <NormalPeoplePicker
//             onResolveSuggestions={getUsers}
//             className={"ms-PeoplePicker"}
//             key={"normal"}
//             resolveDelay={300}
//             onChange={(item) => {
//               setInputData((c: IItem) => ({
//                 ...c,
//                 selectedPerson: item && item[0],
//               }));
//             }}
//           />
//           {/* <PrimaryButton
//             className="btn"
//             text={inputData.ID ? "Update" : "Save"}
//             onClick={ async() =>{ inputData.ID ? updateDataInList(inputData.ID) : insertDataIntoList() }}
//             style={{ marginTop: "20px" }}
//           /> */}
//           <PrimaryButton
//             className="btn"
//             text={inputData.ID ? "Update" : "Save"}
//             onClick={async () => {
//               if (inputData.ID !== undefined) {
//                 await updateDataInList(inputData.ID);
//               } else {
//                 await insertDataIntoList();
//               }
//             }}
//             style={{ marginTop: "20px" }}
//           />
//         </div>
//       </Panel>
//     </>
//   );
// };

// export default TestingInPeoplePicker;


import * as React from "react";
import { sp, Web } from "@pnp/sp/presets/all";
import {
  DetailsListLayoutMode,
  IconButton,
  Panel,
  PanelType,
  NormalPeoplePicker,
  PrimaryButton,
  TextField,
} from "@fluentui/react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import {
  IPersonaProps,
  Persona,
  PersonaSize,
} from "@fluentui/react/lib/Persona";
import { DetailsList, IColumn } from "office-ui-fabric-react/lib/DetailsList";
import swal from "sweetalert";
import { Label } from "office-ui-fabric-react";

interface IItem {
  Title: string;
  PeopleList?: string;
  selectedPerson?: IPersonaProps | null;
  ID?: number; // Add ID to IItem interface
}

interface IMyWebprops {
  webUrl: string;
  context: WebPartContext;
}

const TestingInPeoplePicker: React.FC<IMyWebprops> = ({ context, webUrl }) => {
  const Web1 = Web(webUrl);

  const [listData, setListData] = React.useState<IItem[]>([]);
  const [isPanelOpen, setIsPanelOpen] = React.useState<boolean>(false);
  const [inputData, setInputData] = React.useState<IItem>({
    Title: "",
    PeopleList: "",
    selectedPerson: null,
  });

  const getUsers = async () => {
    try {
      const res = await sp.web.siteUsers.get();
      const res222 = await Web1.siteUsers.get();
      console.log("res---->", res);
      console.log("res222---->", res222);

      const suggestions = res.map((user) => ({
        text: user.Title,
        secondaryText: user.Email,
        tertiaryText: user.Id.toString(),
      }));
      return suggestions;
    } catch (error) {
      console.log("error---->", error);
      return [];
    }
  };

  const getDataFromList = async () => {
    try {
      const res = await sp.web.lists
        .getByTitle("TestingPeoplePicker")
        .items.select(
          "*,PeoplePickerImage/Title,PeoplePickerImage/EMail,PeoplePickerImage/ID"
        )
        .expand("PeoplePickerImage/ID")
        .get();

      setListData([...res]);
    } catch (error) {
      console.error("Error fetching data:", error);
      await swal("Error Fetching Data", "Check Into the console", "error");
    }
  };

  const insertDataIntoList = async () => {
    try {
      const res = await Web1.lists.getByTitle("TestingPeoplePicker").items.add({
        Title: inputData.Title,
        PeopleList: inputData.PeopleList,
        PeoplePickerImageStringId:
          inputData?.selectedPerson?.tertiaryText?.toString(),
      });
      if (res.data) {
        setInputData({ Title: "", PeopleList: "", selectedPerson: null });
        setIsPanelOpen(false);
        await swal({
          title: "Data Inserted!",
          text: "Successfully Inserted Data!",
          icon: "success",
        });
        await getDataFromList();
      }
    } catch (error) {
      console.error("Error inserting data:", error);
      alert("Error inserting data");
    }
  };

  const deleteDataFromList = async (id: number) => {
    try {
      await sp.web.lists
        .getByTitle("TestingPeoplePicker")
        .items.getById(id)
        .delete();
      setListData(listData.filter((item) => item.ID !== id));
      await swal({
        title: "Data!",
        text: "Successfully Deleted Data!",
        icon: "success",
      });
    } catch (error) {
      console.error("Error deleting item", error);
      await swal("Something Went Wrong", "Check Into the console", "error");
    }
  };

  const updateDataInList = async (id: number) => {
    try {
      const res = await sp.web.lists
        .getByTitle("TestingPeoplePicker")
        .items.getById(id)
        .update({
          Title: inputData.Title,
          PeopleList: inputData.PeopleList,
          PeoplePickerImageStringId:
          inputData?.selectedPerson?.tertiaryText?.toString(),
        });
      if (res.data) {
        setInputData({ Title: "", PeopleList: "", selectedPerson: null });
        setIsPanelOpen(false);
        await swal({
          title: "Updated Data!",
          text: "Successfully Updated Data!",
          icon: "success",
        });
        await getDataFromList();
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Error updating data");
    }
  };

  const openAddPanel = () => {
    setInputData({ Title: "", PeopleList: "", selectedPerson: null });
    setIsPanelOpen(true);
  };

  const openEditPanel = (item: IItem) => {
    setInputData(item);
    setIsPanelOpen(true);
  };

  React.useEffect(() => {
    void getDataFromList();
  }, []);

  const columns: IColumn[] = React.useMemo(
    () => [
      // {
      //   key: "Id",
      //   name: "Sl.No",
      //   fieldName: "ID",
      //   minWidth: 50,
      //   maxWidth: 50,
      // },
      {
        key: "Title",
        name: "Title",
        fieldName: "Title",
        minWidth: 50,
        maxWidth: 100,
      },
      {
        key: "People",
        name: "PeopleList",
        fieldName: "PeopleList",
        minWidth: 50,
        maxWidth: 150,
      },
      {
        key: "selectedPerson",
        name: "selectedPerson",
        fieldName: "selectedPerson",
        minWidth: 50,
        maxWidth: 150,
        onRender: (item: any) => (
          <div>
            {item.PeoplePickerImage && item.PeoplePickerImage.Title ? (
              <Persona
                text={item.PeoplePickerImage.Title}
                size={PersonaSize.size32}
              />
            ) : (
              "No person selected"
            )}
          </div>
        ),
      },
      {
        key: "actions",
        name: "Actions",
        fieldName: "actions",
        minWidth: 100,
        onRender: (item: IItem) => (
          <div>
            <IconButton
              iconProps={{ iconName: "Edit" }}
              onClick={() => openEditPanel(item)}
            />
            <IconButton
              iconProps={{ iconName: "Delete" }}
              onClick={() => deleteDataFromList(item.ID!)}
            />
          </div>
        ),
      },
    ],
    [updateDataInList, deleteDataFromList]
  );

  const handleSave = async () => {
    const { Title, PeopleList, selectedPerson } = inputData;

    if (!Title || !PeopleList || !selectedPerson) {
      setIsPanelOpen(false);
      await swal("Validation Error", "All fields are required", "error");
      return;
    }

    if (inputData.ID !== undefined) {
      await updateDataInList(inputData.ID);
    } else {
      await insertDataIntoList();
    }
  };

  return (
    <>
      <h1>PeoplePicker Testing</h1>
      <PrimaryButton text="Add Data" onClick={openAddPanel} />
      <DetailsList
        items={listData}
        columns={columns}
        setKey="set"
        layoutMode={DetailsListLayoutMode.fixedColumns}
      />
      <Panel
        isOpen={isPanelOpen}
        onDismiss={() => setIsPanelOpen(false)}
        type={PanelType.medium}
        headerText="Add Employee"
        closeButtonAriaLabel="Close"
      >
        <div style={{ padding: "20px" }}>
          <TextField
            className="input"
            placeholder="Enter Title here"
            label="Title"
            required
            value={inputData.Title}
            onChange={(_ev, newVal) =>
              setInputData((prev) => ({ ...prev, Title: newVal || "" }))
            }
          />
          <TextField
            className="input"
            placeholder="Enter PeopleList here"
            label="PeopleList"
            value={inputData.PeopleList}
            onChange={(_ev, newVal) =>
              setInputData((prev) => ({ ...prev, PeopleList: newVal || "" }))
            }
          />
          <Label>People Picker</Label>
          <NormalPeoplePicker
            onResolveSuggestions={getUsers}
            className={"ms-PeoplePicker"}
            key={"normal"}
            resolveDelay={300}
            onChange={(items) => {
              setInputData((prev) => ({
                ...prev,
                selectedPerson: items && items[0] ? items[0] : null,
              }));
            }}
          />
          <PrimaryButton
            className="btn"
            text={inputData.ID ? "Update" : "Save"}
            onClick={handleSave}
            style={{ marginTop: "20px" }}
          />
        </div>
      </Panel>
    </>
  );
};

export default TestingInPeoplePicker;
