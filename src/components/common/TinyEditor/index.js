// Import React dependencies.
import React, { useCallback, memo, useState } from "react";
import { Editor } from '@tinymce/tinymce-react';
import {uploadImageToServer} from '~src/api/optionAPI'
const TinyEditor = ({ options, onChange }) => {
    return (
        <Editor
            init={options}
            onEditorChange={onChange}
            apiKey='5g5faf78gvk6yfq9bd3bbfjo858kjx1q8o0nbiwtygo2e4er'
       />
    )
}


export const imageUploadHandle = async (blobInfo, success, failure, progress) => {
    const blob = await blobInfo.blob();
    try {
       const res = await uploadImageToServer([blob]);
       res.Code === 1 && res.Data.length > 0 && success(`${res.Data[0].UrlIMG}`);
       //success('https://vcdn-ngoisao.vnecdn.net/2020/07/08/MRAT6138-JPG-2263-1594179677_r_460x0.jpg');
    } catch (error) {
        console.log(error?.message ?? error);
    }
   
}

export default memo(TinyEditor);