import axiosInstance from "../../axios";

class CustomUploadAdapter{
    constructor(loader){
        this.loader = loader;
    }

    upload(){
        return this.loader.file.then(
            file => 
              new Promise((resolve, reject) => {
                const data = new FormData();
                data.append("upload", file);
                
                axiosInstance.post('/upload')
              })
        )
    }
}