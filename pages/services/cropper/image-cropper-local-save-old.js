import { useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import setCanvasPreview from "./setCanvasPreview";

const ASPECT_RATIO = 4 / 3;
const MIN_DIMENSION = 300;

const ImageCropper = ({ clickBtn, btnCropId, imgId, pathToSave, closeModal, text, canvasId }) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [error, setError] = useState("");

  const onSelectFile = (e) => {
     const file = e.target.files?.[0];
     if (!file) return;
     const reader = new FileReader();
     reader.addEventListener("load", () => {
     const imageElement = new Image();
     const imageUrl = reader.result?.toString() || "";
     imageElement.src = imageUrl;
     imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Рисунок не должен быть менее 300 pixels по ширине.");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

 const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };  

  return (
    <>
    <div className='pd-b-20'>
        <label className="block mb-3 w-fit">
            <div className='pd-b-10'>{text}</div>
            <input
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
            />
        </label>
      </div>
      {error && <div className="error">{error}</div>}
      {imgSrc && (
        <div>
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}            
            
            //свойство для круглой формы выделания на canvas
            //circularCrop
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{ maxHeight: "70vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <div className="modal-footer-crop">
            <button 
                className="buttonWhiteSm"
                id={btnCropId}
                onClick={() => {
                    setCanvasPreview(
                        canvasId,
                        imgRef.current, 
                        convertToPixelCrop(
                        crop,
                        imgRef.current.width,
                        imgRef.current.height
                    )                    
                );
                clickBtn();
                const dataUrl = previewCanvasRef.current.toDataURL();
                const img = document.getElementById(imgId);
                // создание jpg из base64 для отправки фото в папки на сервере
                function dataURLtoFile(dataurl, filename) {
                    let arr = dataurl.split(','),
                       mime = arr[0].match(/:(.*?);/)[1],
                       bstr = atob(arr[1]),
                       n = bstr.length,
                       u8arr = new Uint8Array(n);
                    while (n--) {
                       u8arr[n] = bstr.charCodeAt(n);
                    }
                    return new File([u8arr], filename, { type: mime });
                  }
                 const formData = new FormData(); 
                 formData.append('file', dataURLtoFile(dataUrl, "image.jpg"));
                 async function loading() {
                    await fetch(`/api/upload?folder=${pathToSave}`, {
                        method: 'POST',
                        body: formData
                    }) 
                    .then (response => {               
                        response.json().then((data) => {
                            img.src=`/upload/${pathToSave}/${data[0]}`;
                            })             
                        })            
                        .catch((err) => {        
                            return (err);
                        });
                    }
                    loading(); 
                closeModal();
                }}
            >
                Обрезать фото
            </button>
          </div>
        </div>
      )}
      {crop && (
        <>
        <canvas
            id={canvasId}
            ref={previewCanvasRef}
            className="mt-4"
            style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
        </>
      )}
    </>
  );
};
export default ImageCropper;