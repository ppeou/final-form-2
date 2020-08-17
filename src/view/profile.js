import React, {useMemo, useState} from 'react';
import {Form,FormSpy} from 'react-final-form';
import SectionWithHook from '../component/section';
import Section from '../component/section';
import TextInput from '../component/text-input';
import Dropdown from '../component/dropdown';
import Button from '../component/button';

const data = {
  name: 'Musa Lada',
  email: 'musalad@email.com',
  state: 'TX',
  header: '8-*'
};

const section1MetaData = {dataField: 'header'};
const usernameMetaData = {label: 'Username', dataField: 'name'};
const emailMetaData = {label: 'Email', dataField: 'email'};
const mirrorStateMetaData = {label: 'Mirror State', dataField: 'state'};
const stateMetaData = {label: 'State', dataField: 'state', dataSource: 'states', fieldId: 'abbr', fieldName: 'name'};
const editButtonMetaData = {label: 'Edit', dataField: 'editable'};

const Profile = () => {
  const [isEditable, setIsEditable] = useState(false);
  const formOptions = {
    initialValues: {...data, editable: isEditable},
    subscription: {},
    onSubmit: () => {}
  };

  return (<section style={{padding: 10, margin: 10, border: 'solid 1px #333'}}>
    <h1>Profile</h1>
    <button onClick={() => setIsEditable(!isEditable)}>Toggle Edit Mode</button>
    <Form {...formOptions}>
      {
        (props) => {
          return (
            <form onSubmit={props.handleSubmit} autoComplete="off">
              <input type="hidden" autoComplete="false" />
              <Section index={'section1'} metaData={section1MetaData}>
                <TextInput index={'input-username'} metaData={usernameMetaData}/>
                <TextInput index={'input-email'} metaData={emailMetaData}/>
                <TextInput index={'input-mirror-state'} metaData={mirrorStateMetaData}/>
                <Dropdown index={'input-state'} metaData={stateMetaData}/>
                <Button index={'input-editbutton'} metaData={editButtonMetaData}/>
              </Section>
              <FormSpy subscription={{ values: true }}>
                {
                  ({values}) => {
                    return (<pre>{JSON.stringify(values)}</pre>);
                  }
                }
              </FormSpy>
            </form>
          );
        }
      }

    </Form>
  </section>);
};

Profile.whyDidYouRender = true;

export default Profile;