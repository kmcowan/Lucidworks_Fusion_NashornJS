/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var tikaRowsToDocs = function (doc) {

    if (doc !== null && doc.getId() !== null) {
        var File = java.io.File;
        var FileInputStream = java.io.FileInputStream;
        var ArrayList = java.util.ArrayList;
        var HashMap = java.util.HashMap;
        var Iterator = java.util.Iterator;
        var Sheet = org.apache.poi.ss.usermodel.Sheet;
        var Cell = org.apache.poi.ss.usermodel.Cell;
        var Row = org.apache.poi.ss.usermodel.Row;
        var Workbook = org.apache.poi.ss.usermodel.Workbook;
        var XSSFWorkbook = org.apache.poi.xssf.usermodel.XSSFWorkbook;

        var e = java.lang.Exception;
        var docs = new ArrayList();

        try {

            var excelFilePath = doc.getId();//"/projects/lucidworks_support/sharepoint_data-sample.xlsx";
            var inputStream = new FileInputStream(new File(excelFilePath));
            var workbook = new XSSFWorkbook(inputStream);
            var firstSheet = workbook.getSheetAt(0);
            var iterator = firstSheet.iterator();
            var headers = new ArrayList();
            var map = new HashMap();
            var count = 0;
            var column = 0;
            var value = "";
            var header = "";
            while (iterator.hasNext()) {
                var nextRow = iterator.next();
                var cellIterator = nextRow.cellIterator();
                column = 0;
                while (cellIterator.hasNext()) {
                    var cell = cellIterator.next();
                    if (count > 0) {
                        header = headers.get(column);
                    }

                    switch (cell.getCellType()) {
                        case Cell.CELL_TYPE_STRING:

                            value = cell.getStringCellValue();
                            break;
                        case Cell.CELL_TYPE_BOOLEAN:

                            value = "" + cell.getBooleanCellValue();
                            break;
                        case Cell.CELL_TYPE_NUMERIC:

                            value = "" + cell.getNumericCellValue();
                            break;
                    }
                    //  System.out.print(" - ");
                    column++;
                    if (count == 0) {
                        headers.add(value);
                    }

                    if (count > 0) {
                        logger.debug("Header: " + header + " :: " + value);
                    }

                }
                //  System.out.println();

                count++;
            }

            workbook.close();
            inputStream.close();
        } catch (e) {
            logger.error(e);
        }
        return docs;

    } else {
        return doc;
    }

}
