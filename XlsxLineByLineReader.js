/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var xlsxLineByLineReader = function(doc){
    
    var File = java.io.File;
var FileInputStream = java.io.FileInputStream;
var Iterator = java.util.Iterator;
var ZipSecureFile = org.apache.poi.openxml4j.util.ZipSecureFile;
var Cell = org.apache.poi.ss.usermodel.Cell;
var Row = org.apache.poi.ss.usermodel.Row;
var XSSFSheet = org.apache.poi.xssf.usermodel.XSSFSheet;
var XSSFWorkbook = org.apache.poi.xssf.usermodel.XSSFWorkbook;
var e = java.lang.Exception;


      try{
            ZipSecureFile.setMinInflateRatio(-1.0);
            var file = new FileInputStream(new File("/Users/kevin/Dropbox/IBM_Timecard_CAR_Kevin Cowan SVS_weekending 9-26-15.xlsx"));
 
            //Create Workbook instance holding reference to .xlsx file
            var workbook = new XSSFWorkbook(file);
 
            //Get first/desired sheet from the workbook
            var sheet = workbook.getSheetAt(0);
 
            //Iterate through each rows one by one
            var rowIterator = sheet.iterator();
            while (rowIterator.hasNext()) 
            {
                var row = rowIterator.next();
                //For each row, iterate through all the columns
                var cellIterator = row.cellIterator();
                 
                while (cellIterator.hasNext()) 
                {
                    var cell = cellIterator.next();
                    //Check the cell type and format accordingly
                    switch (cell.getCellType()) 
                    {
                        case Cell.CELL_TYPE_NUMERIC:
                           logger.info("INT: "+cell.getNumericCellValue()  );
                            break;
                        case Cell.CELL_TYPE_STRING:
                            logger.info("STR: "+cell.getStringCellValue()  );
                            break;
                       
                    }
                }
                 
            }
            file.close();
        }catch( e){
            logger.error(e);
        }

    return doc;
};