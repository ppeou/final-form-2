import React from 'react';
import {Form, FormSpy} from 'react-final-form';
import {Render} from '../component/render';
import profileLayout from '../layout/profile.json';

const Profile = () => {
  const formOptions = {
    initialValues: {},
    subscription: {},
    onSubmit: () => {}
  };

  return (<section style={{padding: 10, margin: 10, border: 'solid 1px #333'}}>
    <Form {...formOptions}>
      {
        (props) => {
          return (
            <form onSubmit={props.handleSubmit} autoComplete="off">
              {Render(profileLayout, 'profile')}
              <FormSpy subscription={{values: true}}>
                {({values}) => {
                  return (<pre>{JSON.stringify(values)}</pre>)
                }}
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