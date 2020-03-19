import { Injectable } from "@angular/core";

@Injectable()
export class Base64Service {
  constructor() { }
  convertToBase64(e, cb) {
    let file = e.target.files[0];
    let result;
    var reader = new FileReader();
    //console.log(reader.result);
    reader.readAsDataURL(file);
    reader.onload = () => {

      result = {
        base64: reader.result.slice(reader.result['indexOf'](",") + 1),
        filename: file.name,
        filesize: file.size,
        filetype: file.name.slice(file.name.lastIndexOf(".") + 1)
      };

      cb(result);
    };
    reader.onerror = function (error) {
      // console.log("Error: ", error);
      alert("Unknown Error Occured");
    };
    return result;
  }

  convertMultipleFiles(e, cb) {
    if (e.target.files.length == 0) return;
    let file = e.target.files
    let result = []
    var readers = []
    for (let i = 0; i < file.length; i++) {
      var reader = new FileReader();
      readers[i] = reader;
      readers[i].readAsDataURL(file[i]);
      readers[i].onload = () => {
        result.push({
          base64: readers[i].result.slice(readers[i].result.indexOf(",") + 1),
          filename: file[i].name,
          filesize: file[i].size,
          filetype: file[i].name.slice(file[i].name.lastIndexOf(".") + 1)
        });
        if (result.length == file.length) {
          cb(result)
        }
      }
    };
    return reader.result;
  }
}
