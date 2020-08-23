import React, {memo, useCallback, useMemo} from 'react';
import {useForm} from 'react-final-form';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {AllModules} from '@ag-grid-enterprise/all-modules';
import {createIsPropEqual} from './util';
import TextEmail from './text-email';

const cellEditorSelector = (params) => {
  const {rowIndex, colDef: {editors}} = params;
  if (editors[rowIndex] === 'input:email') {
    return {component: editors[rowIndex]};
  }
  return null;
};

const convertLayoutToColumn = (layout, data) => {
  const {editors, fields} = layout.reduce(({fields, editors}, item, index) => {
    const {items} = item;
    items.forEach((comp, i) => {
      const {component, metaData} = comp;
      const {label, dataField} = metaData;
      fields.push({dataField, label});
      editors[i] = component;
    });
    return {fields, editors};
  }, {fields: [], editors: {}});
  console.log(editors);

  const columns = [{headerName: '', field: '0', pinned: 'left',}];
  data.forEach((c, index) => {
    const prefix = `${index + 1}`;
    columns.push({headerName: `Car ${prefix}`, field: prefix, editable: true, editors, cellEditorSelector});
  });

  return {columns, fields};
};

const convertRowToColumnData = (rowData, fields) => {
  const [labels, dataFields] = fields.reduce(([labels, dataFields], {label, dataField}) => {
    labels.push(label);
    dataFields.push(dataField);
    return [labels, dataFields];
  }, [[], []]);

  const root = labels.map(label => ({'0': label}));

  const newData = rowData.reduce((p, data, index) => {
    dataFields.forEach((field, i) => {
      p[i][`${index + 1}`] = data[field];
    });
    return p;
  }, root);

  console.log(newData);
  return newData;
};

const agEditorEvents = {
  onRowEditingStarted: function (event) {
    console.log('never called - not doing row editing');
  },
  onRowEditingStopped: function (event) {
    console.log('never called - not doing row editing');
  },
  onCellEditingStarted: function (event) {
    console.log('cellEditingStarted');
  },
  onCellEditingStopped: function (event) {
    console.log('cellEditingStopped');
  }
};

const useFinalFormChange = (data, fields) => {
  const {batch, change} = useForm();
  window.abc = change;
  const handleCellChange = useCallback(e => {
    const {rowIndex, colDef: {field}} = e;
    const {dataField} = fields[rowIndex];
    const dataIndex = Number(field) - 1;

    batch(() =>  {
      change(`cars.${dataIndex}.${dataField}`, e.value);
    });


  }, [batch, change]);
  return {handleCellChange};
};

const GridForm = ({layout, data:formData}) => {
  const {cars:data} = formData;
  const {columns, fields} = convertLayoutToColumn(layout, data);
  const colData = convertRowToColumnData(data, fields);
  const {handleCellChange} = useFinalFormChange(data, fields);
  const frameworkComponents = {'input:email': TextEmail};
  return (
    <div className="ag-theme-alpine" style={{width: '90vw', height: '50vh'}}>
      <AgGridReact
        frameworkComponents={frameworkComponents}
        onCellValueChanged={handleCellChange}
        modules={AllModules}
        columnDefs={columns}
        singleClickEdit={true}
        rowData={colData}

      >
      </AgGridReact>
    </div>
  );
};

GridForm.whyDidYouRender = true;

const MemoGridForm = memo(GridForm, createIsPropEqual(['layout', 'data']));

export default MemoGridForm;