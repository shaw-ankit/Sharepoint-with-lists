import { Pivot, PivotItem } from "@fluentui/react";
import * as React from "react";
import styles from './AnkitFinalProject.module.scss'

const WorkingInPivot = () => {
  return (
    <>
      <h1>This is for pivot testing</h1>
      <div className={styles.pivotContainer}>
        <Pivot>
          <PivotItem headerText="Test 1">
            <label>I Am Testing 1</label>
          </PivotItem>
          <PivotItem headerText="Test 2">
            <label>I Am Testing 2</label>
          </PivotItem>
          <PivotItem headerText="Test 3">
            <label>I Am Testing 3</label>
          </PivotItem>
        </Pivot>
      </div>
      <div>
        <Pivot>
          <PivotItem headerText="Tab 1">
            <div>
              <h3>Content for Tab 1</h3>
              <p>This is the content for the first tab.</p>
            </div>
          </PivotItem>
          <PivotItem headerText="Tab 2">
            <div>
              <h3>Content for Tab 2</h3>
              <p>This is the content for the second tab.</p>
            </div>
          </PivotItem>
          <PivotItem headerText="Tab 3">
            <div>
              <h3>Content for Tab 3</h3>
              <p>This is the content for the third tab.</p>
            </div>
          </PivotItem>
        </Pivot>
      </div>

      <div>
        <Pivot>
          <PivotItem headerText="Home" itemIcon="Home" itemKey="home">
            <div>
              <h3>Home</h3>
              <p>Welcome to the home tab.</p>
            </div>
          </PivotItem>
          <PivotItem
            headerText="Settings"
            itemIcon="Settings"
            itemKey="settings"
          >
            <div>
              <h3>Settings</h3>
              <p>Here you can adjust your settings.</p>
            </div>
          </PivotItem>
          <PivotItem headerText="Profile" itemIcon="Contact" itemKey="profile">
            <div>
              <h3>Profile</h3>
              <p>Manage your profile here.</p>
            </div>
          </PivotItem>
        </Pivot>
      </div>

      <div>
        <Pivot>
          <PivotItem headerText="Main Tab 1">
            <div>
              <h3>Main Tab 1 Content</h3>
              <p>This is the content for the first main tab.</p>
            </div>
          </PivotItem>
          <PivotItem headerText="Main Tab 2">
            <div>
              <h3>Main Tab 2 Content</h3>
              <p>This is the content for the second main tab.</p>
              <Pivot>
                <PivotItem headerText="Nested Tab 1">
                  <div>
                    <h4>Nested Tab 1 Content</h4>
                    <p>This is the content for the first nested tab.</p>
                  </div>
                </PivotItem>
                <PivotItem headerText="Nested Tab 2">
                  <div>
                    <h4>Nested Tab 2 Content</h4>
                    <p>This is the content for the second nested tab.</p>
                  </div>
                </PivotItem>
              </Pivot>
            </div>
          </PivotItem>
          <PivotItem headerText="Main Tab 3">
            <div>
              <h3>Main Tab 3 Content</h3>
              <p>This is the content for the third main tab.</p>
            </div>
          </PivotItem>
        </Pivot>
      </div>
    </>
  );
};

export default WorkingInPivot;
