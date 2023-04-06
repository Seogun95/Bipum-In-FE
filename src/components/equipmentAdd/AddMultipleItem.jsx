import ARRAY from 'constants/array';
import React, { useState } from 'react';
import styled from 'styled-components';
import * as XLSX from 'xlsx';

import MultipleHeader from './multiple/MultipleHeader';
import MultipleList from './multiple/MultipleList';
import Valid from 'validation/validation';

export default function AddMultipleItem() {
  const [excel, setExcel] = useState({
    data: null,
    sheetList: null,
    sheetItem: 0,
  });

  const handleChangeSheet = e => {
    const { value } = e.target;
    const sheetList = editSheetList(excel, value);
    setExcel({ ...excel, sheetList, sheetItem: Number(value) });
  };

  const handleReadExcel = e => {
    const { files } = e.target;
    const reader = new FileReader();
    reader.onload = () => {
      const workBook = XLSX.read(reader.result, { type: 'binary' });
      const sheetName = workBook.SheetNames;

      const excels = setExcels(workBook);
      const sheetList = setSheetList(workBook);
      const jsonToExcelArray = jsonToExcel(workBook);

      if (!Valid.excelSheetCheck(sheetName, jsonToExcelArray)) return;

      setExcel({ data: excels, sheetList, sheetItem: 0 });
    };
    reader.readAsBinaryString(files[0]);
    e.target.value = '';
  };

  const handleDownLoadToExcel = async () => {
    const response = await fetch('data/bipumin.xlsx');
    const blob = await response.blob();

    const nowDate = new Date().toISOString().slice(0, 10);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `bipumin-${nowDate}.xlsx`;
    link.click();
  };

  const setSheetList = workBook => {
    return workBook.SheetNames.map((sheetName, index) =>
      index
        ? {
            status: false,
            sheetName,
          }
        : {
            status: true,
            sheetName,
          }
    );
  };

  const editSheetList = (excel, value) => {
    return excel.sheetList.map((sheetItem, index) =>
      index === Number(value)
        ? {
            status: true,
            sheetName: sheetItem.sheetName,
          }
        : {
            status: false,
            sheetName: sheetItem.sheetName,
          }
    );
  };

  const setExcels = workBook => {
    return workBook.SheetNames.map(sheetName =>
      XLSX.utils.sheet_to_json(workBook.Sheets[sheetName], {
        range: 8,
        blankrows: false,
      })
    );
  };

  const jsonToExcel = workBook => {
    return Object.values(workBook.Sheets).map(sheet =>
      XLSX.utils.sheet_to_json(sheet, {
        range: 8,
        header: 1,
        defval: '',
      })
    );
  };

  return (
    <MultipleWrapper>
      <MultipleHeader
        sheetList={excel.sheetList}
        readExcel={handleReadExcel}
        downLoadToExcel={handleDownLoadToExcel}
        onChangeSheet={handleChangeSheet}
      />
      <MultipleList excel={excel} />
    </MultipleWrapper>
  );
}

const MultipleWrapper = styled.section`
  width: 100%;
`;
