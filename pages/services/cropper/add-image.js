import { useRef, useState } from "react";
import Modal from './modalCropper';

const AddImage = ({clickBtn, btnClass, btnCropId, pathToSave, imgId, canvasId, defaultImage, imgClass, btnId}) => {
  const avatarUrl = useRef(defaultImage);
  const [modal, setModal] = useState(false);

  return (
    <div>
      <div className="width-main-img-recipe">
        <form>
            <img
            id= {imgId}
            src={avatarUrl.current}
            alt="Avatar"
            className={`width-main-img-recipe ${imgClass}`}
            />
        </form>
        <div>
            <button id={btnId} className={btnClass} title="Change photo" onClick={() =>{setModal(true)}}>
                <span>ВЫБРАТЬ ФОТО</span>
            </button>
        </div>
        
      </div>
      {modal && (
        <Modal
          imgId= {imgId}
          canvasId = {canvasId}
          isVisible={modal}
          title="Добавить фото"
          onClose={() => setModal(false)}    
          closeModal={() => setModal(false)}
          pathToSave = {pathToSave}
          btnCropId = {btnCropId}
          clickBtn = {clickBtn}
        />
      )}
    </div>
  );
};

export default AddImage;