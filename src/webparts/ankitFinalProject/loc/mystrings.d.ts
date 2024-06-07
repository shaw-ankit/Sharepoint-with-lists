declare interface IAnkitFinalProjectWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  UnknownEnvironment: string;
}

declare module 'AnkitFinalProjectWebPartStrings' {
  const strings: IAnkitFinalProjectWebPartStrings;
  export = strings;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}