import React, {useState} from 'react';
import {Form,FormSpy} from 'react-final-form';
import SectionWithHook from '../component/section';
import Section from '../component/section';
import TextInput from '../component/text-input';
import Dropdown from '../component/dropdown';

const data = {
  name: 'Musa Lada',
  email: 'musalad@email.com',
  state: 'TX',
  header: '8-*'
};

const Profile = () => {
  const [state, setState] = useState(false);
  const formOptions = {
    initialValues: data,
    subscription: {},
    onSubmit: () => {}
  };
  return (<section style={{padding: 10, margin: 10, border: 'solid 1px #333'}}>
    <h1>Profile</h1>
    <button onClick={() => setState(!state)}>Change State</button>
    <Form {...formOptions}>
      {
        (props) => {
          return (
            <form onSubmit={props.handleSubmit} autoComplete="off">
              <input type="hidden" autoComplete="false" />
              <Section index={'section1'} metaData={{dataField: 'header'}}>
                <TextInput index={'input-name'} metaData={
                  {label: 'Username', dataField: 'name'}
                }/>
                <TextInput index={'input-name'} metaData={
                  {label: 'Email', dataField: 'email'}
                }/>
                <Dropdown index={'input-name'} metaData={
                  {label: 'State', dataField: 'state', dataSource: 'states', fieldId: 'abbr', fieldName: 'name'}
                }/>
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