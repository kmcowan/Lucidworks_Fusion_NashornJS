/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var fileStreamReader = function (doc) {

    var BufferedReader = java.io.BufferedReader;
    var FileReader = java.io.FileReader;
    var ex = java.io.IOException;
    var e = java.io.IOException;

    var br = null;
    var fr = null;
    var fileContent = "";

    try {

        fr = new FileReader(FILENAME);
        br = new BufferedReader(fr);

        var sCurrentLine;

        br = new BufferedReader(new FileReader(FILENAME));

        while ((sCurrentLine = br.readLine()) !== null) {
            logger.debug(sCurrentLine);
            fileContent += sCurrentLine;
        }

    } catch (e) {

        e.printStackTrace();

    } finally {

        try {

            if (br !== null)
                br.close();

            if (fr !== null)
                fr.close();

        } catch (ex) {

            ex.printStackTrace();

        }

    }

    return doc;
}