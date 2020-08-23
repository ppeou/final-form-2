import React, {useMemo, useState} from 'react';
import {Form,FormSpy} from 'react-final-form';
import GridForm from '../component/grid-form';
import profileLayout from '../layout/profile.json';

const data = [
  {make: 'Toyota', model: 'Celica', salePersonEmail: 'email-1@sample.com'},
  {make: 'Ford', model: 'Mondeo', salePersonEmail: 'email-2@sample.com'},
  {make: 'Porsche', model: 'Boxter', salePersonEmail: 'email-3@sample.com'}
];

const Profile = () => {
  const formOptions = {
    initialValues: {cars:data},
    subscription: {},
    onSubmit: () => {}
  };

  return (<section style={{padding: 10, margin: 10, border: 'solid 1px #333'}}>
    <h1>Profile</h1>

    <Form {...formOptions}>
      {
        (props) => {
          return (
            <form onSubmit={props.handleSubmit} autoComplete="off">
              <GridForm layout={profileLayout} data={props.form.getState().values}/>

              <div><button>Submit</button></div>
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