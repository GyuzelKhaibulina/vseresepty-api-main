const fs = require('fs');
const directoryPath = './public/upload/recipe_main_img'; // Укажите путь к вашей папке
import path from "path";

export default async function used_photos (req, res) {
    if (req.method === "POST") {           
        const params =  req.body;      
        let difference = [];
        let arrAll = [];
        let arrStr = "";
        arrAll = JSON.parse(params)
        try {   
            fs.readdir(directoryPath, (err, files) => {   
                let arr = [];
                if (err) {
                    console.error('Ошибка чтения директории:', err);
                    return res.status(500).json({message: err }); 
                }
                files.forEach(file => {
                    arr.push (file);   // массив главных фото из recipe_main_img
                });

                arrAll.map ((v, i, arr1) => {
                    arr1[i] = decodeURIComponent(v);
                });
                let arrImgServ = [...arr];
                let arrImg = [...arr];
                arrImg.map ((v, i, arr2) => {
                    arr2[i] = decodeURIComponent(v);
                });
                arrImgServ.map ((v, i, arr3) => {
                    arr3[i] = decodeURIComponent(v);
                });
                let filteredArray = arrImgServ.filter(item => params.includes(item));   // массив общих фото
                //difference = arrImgServ.filter((e) => !arrImg.includes(e));
                arrStr = JSON.stringify(arr);
                //console.log("arrImgServ",arrImgServ);
                // console.log("filteredArray",filteredArray);

                // console.log("arrImgServ",arrImgServ);
                filteredArray.map ((v, i, arr4) => {
                    arr4[i] = decodeURIComponent(v);
                    //console.log("`${directoryPath}/${v}`",`${directoryPath}/${v}`);
                    //  fs.unlink(`${directoryPath}/${v}`, err => {
                    //           if (err) throw err;
                    //           //console.log('Файл успешно удален');
                    //      });

                })
                //console.log("arr",arr);
                return res.status(200).json({arr: arr});   

                // fs.unlink(`${directoryPath}/2022-12-22_17-55-51.jpg`, err => {
                //       if (err) throw err;
                //       //console.log('Файл успешно удален');
                // });
            });  
            
            //return res.status(200).json({message: "OK!", arr: [123, 456] });        
            //arr123 =  [1,2,3];
            
            return res.status(200).json({message: "OK!"});     
        }    
        catch (error) {          
            return res.status(500).json({message: error});
        }          
    };
}


