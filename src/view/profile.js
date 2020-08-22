import React from 'react';
import {Form, FormSpy} from 'react-final-form';
import {Render} from '../component/render';
import {SideEffectProvider} from '../effect/provider';
import profileLayout from '../layout/profile.json';
import {profileDataEffects} from '../effect/data-effect';
import {profileLayoutEffects} from '../effect/layout-effect';

const Profile = () => {
  const formOptions = {
    initialValues: {},
    subscription: {},
    onSubmit: () => {}
  };

  return (<Form {...formOptions}>{() => (
    <SideEffectProvider
      scopeName={'profileData'}
      baseMetaDataBranch={profileLayout}
      dataEffects={profileDataEffects}
      layoutEffects={profileLayoutEffects}>
      {computedLayout => {
        return (<form onSubmit={() => {}} autocomplete="off">
          {Render(computedLayout, 'profile')}
          <FormSpy subscription={{values: true}}>
            {({values}) => {
              return (<pre>{JSON.stringify(values)}</pre>)
            }}
          </FormSpy>
        </form>);
      }}
    </SideEffectProvider>
  )}
  </Form>);


};

Profile.whyDidYouRender = true;

export default Profile;

