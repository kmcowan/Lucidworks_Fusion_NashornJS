/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var niofile = function(doc){

var imports = new JavaImporter(java.io.IOException, java.nio.file.Files, java.nio.file.Path, java.nio.file.Paths, java.nio.file.attribute.BasicFileAttributes);

with(imports){

           var filepath = "E:\\aetna\\abc.txt";

           var file = Paths.get(filepath);

           var attr = Files.readAttributes(file, BasicFileAttributes.class);

           System.out.println("Creation Time = " + attr.creationTime());

           doc.setField("created_t", attr.creationTime());

}

}