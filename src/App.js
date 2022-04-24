import './App.css';

import FileBase from 'react-file-base64';

import { useState } from 'react';
import axios from "axios";

function App() {
  const [listingData, setListingData] = useState("");

  let data64 //init variable

  //console.log(listingData)

  /* Put this Conditional for starting web app o refreshing
   * to avoid errors because initial value is ""
   * initial value:
   * listingData = "" and listingData.selectedFile = undefined
  */

  if (listingData !== "") {
    data64 = listingData.selectedFile.split(',')
    //console.log(data64); //data64 = image converted to base64
  }
  

  //Send image to ImgBB with AXIOS
  const handleClick = () => {
    var data = new FormData();
    data.append('image', data64[1])
    //data.append('name', 'prueba01')
    
    //imgbb's personal Token
    //https://es.imgbb.com/
    let imgbbToken = '165bc83a2b0f87e5ddc8af943b7fcba4'
    let APIurl = 'https://api.imgbb.com/1/upload?key='
    
    var config = {
      method: 'post',
      url: APIurl + imgbbToken,
      headers: { "Content-Type": "multipart/form-data" },
      data : data
    };

    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        console.log(response);
        console.log(response.data.data.image.url);
      })
      .catch(function (error) {
        console.log(error);
      });
    
  }

  return (
    <div className="App">
      <h1 className='title'>React File to Base64 Converter</h1>

      {/* Input file to select an image.
      The selected image will save on imgbb web storage 
      imgbb creates an url for every image that you upload
      the main porpuse is fill all url_image field on database's API
      */}
      <div>
        <FileBase type="file" multiple={false} onDone={({ base64 }) => setListingData({ ...listingData, selectedFile: base64 })} />
        
      </div>
      
      <div>
        <h2>Image Preview</h2>
      </div>
      {/* show selected image */}
      <img className='img' src={data64} alt="" style={{ width: 350 }} />
      
      <div>
        <h2>Send this image to "imgbb" storage for free</h2>
        <button type='button' onClick={() => handleClick()}>Send</button>
      </div>


    </div>
  );
}

export default App;
