import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IAnkitFinalProjectProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context : WebPartContext;
  webUrl : string;
}
