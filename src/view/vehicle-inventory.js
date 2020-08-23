import React, {useMemo, useState} from 'react';
import {Form,FormSpy} from 'react-final-form';
import GridForm from '../component/grid-form';
import profileLayout from '../layout/vehicle-inventory.json';
import data from '../layout/vehicle-inventory-data.json';

const VehicleInventory = () => {
  const formOptions = {
    initialValues: {cars:data},
    subscription: {},
    onSubmit: () => {}
  };

  return (<section style={{padding: 10, margin: 10, border: 'solid 1px #333'}}>
    <h1>Vehicle Inventory Management</h1>

    <Form {...formOptions}>
      {
        (props) => {
          return (
            <form onSubmit={props.handleSubmit} autoComplete="off">
              <GridForm layout={profileLayout} data={props.form.getState().values}/>

              <div><button>Submit</button></div>
              <FormSpy subscription={{values: true}}>
                {({values}) => {
                  return (<pre>{JSON.stringify(values, undefined, 2)}</pre>)
                }}
              </FormSpy>
            </form>
          );
        }
      }

    </Form>
  </section>);
};

VehicleInventory.whyDidYouRender = true;

export default VehicleInventory;