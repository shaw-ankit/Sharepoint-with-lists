import * as React from 'react';
// import styles from './AnkitFinalProject.module.scss';
import type { IAnkitFinalProjectProps } from './IAnkitFinalProjectProps';
import { sp } from '@pnp/sp';
// import TestingInReactSelect from './WorkingInReactSelect';
import CubicLogic from './CubicLogics';
// import WorkingInPivot from './WorkingInPivot';
// import TestingInPeoplePicker from './Testing';
// import ToggleBtn from './ToggleBtn';
// import Project from './Project';
// import TestingInPeoplePicker from './WorkInPeoplePicker';

export default class AnkitFinalProject extends React.Component<IAnkitFinalProjectProps, {}> {
  componentDidMount(): void {

    sp.setup({
      sp: {
        baseUrl: "https://cubicdirect.sharepoint.com/sites/Ankit-demo-site"
      },
    });
  }
  public render(): React.ReactElement<IAnkitFinalProjectProps> {
    const {
      context, // Destructure context from props,
      webUrl
    } = this.props;

    return (
      <>
      {/* <TestingInPeoplePicker/> */}
      {/* <Project/> */}
      {/* <ToggleBtn/> */}
      {/* <TestingInPeoplePicker  context={context}  webUrl={webUrl}/> */}
      {/* <WorkingInPivot/> */}  
      <CubicLogic context={context}  webUrl={webUrl} />
      {/* <TestingInReactSelect/> */}

      </>
    );
  }
}
